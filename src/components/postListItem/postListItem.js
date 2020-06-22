import React from "react";
import { Link, withRouter } from "react-router-dom";
import Context from "../../context";
import { translateDate } from "../utils/utils";
import "./postListItem.css";
import PostsApiService from "../../services/posts-api-services";

class PostListItem extends React.Component {
  static contextType = Context;

  handleDelete(e) {
    e.preventDefault();
    PostsApiService.deletePost(this.props.post.id)
      .then((res) => {
        !res.ok
          ? res.json().then((res) => Promise.reject(res))
          : this.props.onSuccessfulDelete();
      })
      .catch((err) => this.context.setError(err.error));
  }

  handleEdit = (e) => {
    const { post } = this.props;
    e.preventDefault();
    this.props.history.push(`/editor/${post.id}`);
  };

  RenderButtons() {
    return (
      <div className="clickMe-container">
        <button className="clickMe" onClick={(e) => this.handleEdit(e)}>
          Edit
        </button>
        <button className="clickMe" onClick={(e) => this.handleDelete(e)}>
          Delete
        </button>
      </div>
    );
  }
  render() {
    const { post, buttons } = this.props;
    const date = translateDate(new Date(post.date_created));

    return (
      <li key={post.id}>
        <Link
          className="post-container"
          to={
            post.published === false ? `/editor/${post.id}` : `/post/${post.id}`
          }
        >
          <img
            src={post.user.img}
            alt={`${post.user.username}'s profile icon`}
            className="postImg"
          ></img>
          <section className="content-container">
            <h2 className="postTitle">
              {post.title === ""
                ? "Untitled"
                : post.title.length >= 60
                ? post.title.slice(0, 60) + "..."
                : post.title}
            </h2>
            <p className="date-p">{date}</p>
          </section>
          {buttons ? this.RenderButtons() : null}
        </Link>
      </li>
    );
  }
}

PostListItem.defaultProps = {
  post: {
    id: 1,
    date_created: new Date(),
    title: "",
    img: "",
    user: {
      username: "",
    },
  },
};

export default withRouter(PostListItem);
