import React from "react";
import TokenService from "../../services/token-service";
import Context from "../../context";
import { storage } from "../../firebase/firebase";
import PostsApiService from "../../services/posts-api-services";
import ValidationError from "../../ValidationError";
import "./account.css";

export default class Account extends React.Component {
  static contextType = Context;

  state = {
    url: "",
    selectedFile: null,
    full_name: {
      value: "",
      changed: false,
    },
    email: {
      value: "",
      changed: false,
    },
    bio: {
      value: "",
      changed: false,
    },
  };

  upLoadImg = (e, userId) => {
    e.preventDefault();
    const img = this.state.selectedFile;

    if (img.type !== "image/png") {
      this.context.setError("You must upload an image");
    }

    const uploadTask = storage.ref(`/images/${img.name}`).put(img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        this.context.setError(err);
      },
      () => {
        storage
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({
              url,
            });
            const newUser = {
              img: this.state.url,
            };

            PostsApiService.patchUser(newUser, userId)
              .then((res) => {
                this.onSuccessfulUpdate(res)();
              })
              .catch((err) => this.context.setError(err.error));
          });
      }
    );
  };

  updateName = (e) => {
    this.setState({
      full_name: {
        value: e.target.value,
        changed: true,
      },
    });
  };

  updateEmail = (e) => {
    this.setState({
      email: {
        value: e.target.value,
        changed: true,
      },
    });
  };

  updateBio = (e) => {
    this.setState({
      bio: {
        value: e.target.value,
        changed: true,
      },
    });
  };

  validateName() {
    const name = this.state.full_name.value;
    if (name.length < 3) {
      return "Your name must be longer than 3 characters";
    }
  }

  validateEmail() {
    const email = this.state.email.value;
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return "You must enter a valid email";
    }
  }

  handleUpdateName = (e) => {
    e.preventDefault();

    this.setState({
      full_name: {
        value: this.state.full_name,
        changed: false,
      },
    });

    const full_name = this.state.full_name.value;
    const updateUser = {
      full_name,
    };
    PostsApiService.patchUser(updateUser, this.props.match.params.id)
      .then((res) => {
        this.onSuccessfulUpdate(res);
      })
      .catch((err) => this.context.setError(err));
  };

  handleUpdateEmail = (e) => {
    e.preventDefault();

    this.setState({
      email: {
        value: this.state.email.value,
        changed: false,
      },
    });

    const email = this.state.email.value;
    const updateUser = {
      email,
    };

    PostsApiService.patchUser(updateUser, this.context.activeUser.id)
      .then((res) => {
        this.onSuccessfulUpdate(res);
      })
      .catch((e) => this.context.setError(e));
  };

  handleUpdateBio = (e) => {
    e.preventDefault();
    this.setState({
      bio: {
        value: this.state.bio,
        changed: false,
      },
    });
    const bio = this.state.bio.value;
    const updateUser = {
      bio,
    };

    PostsApiService.patchUser(updateUser, this.context.activeUser.id)
      .then((user) => {
        this.onSuccessfulUpdate(user);
      })
      .catch((e) => this.context.setError(e.error));
  };

  onSuccessfulUpdate = (user) => {
    this.context.clearError();
    this.context.setActiveUser(user, () =>
      this.context.setError("Update Successful")
    );
  };

  fileSelectedHandler = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  onSuccessfulDelete = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpirey();
    this.context.clearError();
    this.context.clearActiveUser(() => this.props.history.push("/"));
  };

  handleDelete = (e, userId) => {
    e.preventDefault();
    PostsApiService.deleteUser(userId)
      .then((res) => {
        !res.ok
          ? res.json().then((res) => Promise.reject(res))
          : this.onSuccessfulDelete();
      })
      .catch((err) => this.context.setError(err));
  };

  render() {
    const user = this.context.activeUser;
    return (
      <React.Fragment>
        <form className="account-form" onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="img">
            <img
              src={this.state.url ? this.state.url : user.img}
              alt={`${user.username}'s icon`}
              className="userImg"
            />
          </label>
          <input
            type="file"
            id="img"
            onChange={(e) => this.fileSelectedHandler(e)}
          />
          <button
            className="clickMe"
            onClick={(e) => this.upLoadImg(e, user.id)}
          >
            Upload
          </button>

          <label htmlFor="full_name">Name</label>
          <input
            type="text"
            id="full_name"
            defaultValue={user.full_name}
            onChange={(e) => this.updateName(e)}
          />
          {this.state.full_name.changed && (
            <ValidationError message={this.validateName()} />
          )}
          <button
            className="clickMe"
            onClick={(e) => this.handleUpdateName(e)}
            disabled={
              this.validateName() || this.state.full_name.changed === false
            }
          >
            update name
          </button>

          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            defaultValue={user.email}
            onChange={(e) => this.updateEmail(e)}
          />
          {this.state.email.changed && (
            <ValidationError message={this.validateEmail()} />
          )}
          <button
            className="clickMe"
            onClick={(e) => this.handleUpdateEmail(e)}
            disabled={
              this.validateEmail() || this.state.email.changed === false
            }
          >
            update email
          </button>

          <label htmlFor="bio">Bio</label>
          <textarea
            id={"bio"}
            defaultValue={user.bio}
            onChange={(e) => this.updateBio(e)}
            rows="5"
            cols="33"
          ></textarea>
          <button
            className="clickMe"
            onClick={(e) => this.handleUpdateBio(e)}
            disabled={this.state.bio.changed === false}
          >
            update bio
          </button>

          <button
            className="clickMe delete"
            onClick={(e) => this.handleDelete(e, user.id)}
          >
            delete account
          </button>
        </form>
      </React.Fragment>
    );
  }
}
