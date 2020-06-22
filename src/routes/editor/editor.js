import React from "react";
import TokenService from "../../services/token-service";
import PostsApiService from "../../services/posts-api-services";
import Context from "../../context";
import EditorToolbar from "../../components/editorToolbar/editorToolbar";
import FloatingMenu from "../../components/floatingMenu/floatingMenu";
import "./editor.css";

export default class Editor extends React.Component {
  static contextType = Context;

  static defaultProps = {
    match: {
      params: {},
    },
  };
  state = {};

  timeoutId;

  componentDidMount() {
    this.context.clearError();
    if (this.props.match.params.id) {
      PostsApiService.getPost(this.props.match.params.id)
        .then((res) => {
          this.setState({
            post: res,
          });
        })
        .then(() => {
          const doc = document.getElementsByClassName("editor");

          doc[0].innerHTML = this.state.post.content;
        })
        .catch((err) => this.context.setError(err));
    } else {
      this.setState({});
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  handleSuccess(publish) {
    const token = TokenService.readJwToken();
    this.context.clearError();
    publish
      ? this.props.history.push(`/user/${token.id}`)
      : this.props.history.push(`/drafts`);
  }

  validateTitle(title) {
    if (title === "") {
      return "Your post must have a title to be published";
    }

    if (title.length < 4) {
      return "Your title must be at least 4 characters long.";
    }

    if (title.length > 80) {
      return "Your title is too long";
    }
  }

  validateContent(content) {
    if (content === "") {
      return "You must have some content in order to publish your post";
    }

    if (content.length < 400) {
      return "Your post needs to have at least 400 characters in order to publish it. Add some more content or save it as a draft to come back later.";
    }
  }

  handleSubmit = (publish) => {
    const content = document.getElementById("sampleeditor").innerHTML;
    const title = document.getElementById("title").textContent;

    const titleErr = this.validateTitle(title);
    const contentErr = this.validateContent(content);

    if (publish && titleErr) {
      this.context.setError(titleErr);
      return;
    }

    if (publish && contentErr) {
      this.context.setError(contentErr);
      return;
    }

    let post;

    publish
      ? (post = {
          title,
          content,
          published: true,
        })
      : (post = {
          title,
          content,
          published: false,
        });

    !this.props.match.params.id
      ? PostsApiService.postPost(post)
          .then((res) =>
            !res.ok
              ? res.json().then((e) => Promise.reject(e))
              : this.handleSuccess(publish)
          )
          .catch((err) => this.context.setError(err.error))
      : PostsApiService.patchPost(post, this.props.match.params.id)
          .then((res) =>
            !res.ok
              ? res.json().then((e) => Promise.reject(e))
              : this.handleSuccess(publish)
          )
          .catch((err) => this.context.setError(err.error));
  };

  handleAutoSave() {
    const content = document.getElementById("sampleeditor").innerHTML;
    const title = document.getElementById("title").textContent;

    const post = {
      title,
      content,
      published: false,
    };

    !this.props.match.params.id
      ? PostsApiService.postPost(post)
          .then((res) =>
            !res.ok
              ? res.json().then((e) => Promise.reject(e))
              : res.json().then((res) => {
                  this.props.history.push(`/editor/${res.id}`);
                  this.setState({ autosave: "Saved" });
                })
          )
          .catch((err) => this.context.setError(err.error))
      : PostsApiService.patchPost(post, this.props.match.params.id)
          .then((res) =>
            !res.ok
              ? res.json().then((e) => Promise.reject(e))
              : this.setState({ autosave: "Saved" })
          )
          .catch((err) => this.context.setError(err.error));
  }

  setAutoSaveTimeout(e) {
    this.setState({ autosave: null });
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.handleAutoSave();
    }, 2000);
  }

  maxLength(e) {
    const max = 100;
    const chars = document.getElementById("title").textContent.length;

    if (chars >= max && e.keyCode !== 8) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <React.Fragment>
        <EditorToolbar handleSubmit={this.handleSubmit} />
        {this.context.error !== null ? (
          <div className="error-container">
            <p className="error">{this.context.error}</p>
          </div>
        ) : null}
        <div
          id="title"
          contentEditable="true"
          spellCheck="true"
          placeholder="Title..."
          data-placeholder="Title..."
          className="title"
          onKeyDown={(e) => this.maxLength(e)}
        >
          {this.state.post ? this.state.post.title : null}
        </div>
        <div
          className="editor"
          id="sampleeditor"
          contentEditable="true"
          placeholder="Body..."
          spellCheck="true"
          data-placeholder="Body..."
          onKeyUp={(e) => this.setAutoSaveTimeout(e)}
          onTar
        >
          {this.state.post ? this.state.post.content : null}
        </div>

        {this.state.autosave ? (
          <div className="autosave">
            <p>{this.state.autosave}</p>
          </div>
        ) : null}

        <FloatingMenu handleSubmit={this.handleSubmit} />
      </React.Fragment>
    );
  }
}
