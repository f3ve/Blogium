import React from "react";
import Context from "../../context";
import PostsApiService from "../../services/posts-api-services";
import "./userPage.css";
import PostListItem from "../../components/postListItem/postListItem";
import { Link } from "react-router-dom";

export default class UserPage extends React.Component {
  static defaultProps = {
    match: {
      params: "",
    },
  };

  static contextType = Context;

  state = {
    user: {},
    posts: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.context.clearError();
    PostsApiService.getUser(id)
      .then((user) => {
        this.setState({
          user,
        });
      })
      .catch((err) => this.context.setError(err));

    PostsApiService.getUsersPosts(id)
      .then((posts) => {
        this.setState({
          posts,
        });
      })
      .catch((err) => this.context.setError(err.error));
  }

  onSuccessfulDelete = () => {
    const { id } = this.props.match.params;
    PostsApiService.getUsersPosts(id)
      .then((posts) => {
        this.setState({
          posts,
        });
      })
      .catch((err) => this.context.setError(err.error));
  };

  renderPage() {
    const { user, posts } = this.state;
    const { activeUser } = this.context;
    return (
      <React.Fragment>
        <section className="profile-header">
          <h2>{user.username}</h2>
          <img
            src={user.img}
            alt="User profile icon"
            className="profile-picture"
          ></img>
          <p>{user.bio}</p>
        </section>
        <section className="user-posts">
          <ul className="post-list">
            {posts.length === 0 ? (
              user.id === activeUser.id ? (
                <p className="noDrafts">
                  You don't have any posts yet.{" "}
                  <Link className="clickMe" to="/editor">
                    Create a new one?
                  </Link>
                </p>
              ) : (
                <p className="noDrafts">
                  This user doesn't have any posts yet.
                </p>
              )
            ) : (
              posts.map((p) =>
                user.id === activeUser.id ? (
                  <PostListItem
                    post={p}
                    buttons={true}
                    onSuccessfulDelete={this.onSuccessfulDelete}
                  />
                ) : (
                  <PostListItem
                    post={p}
                    onSuccessfulDelete={this.onSuccessfulDelete}
                  />
                )
              )
            )}
          </ul>
        </section>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.user ? <h2>Loading</h2> : this.renderPage()}
      </React.Fragment>
    );
  }
}
