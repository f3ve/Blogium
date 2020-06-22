import React from "react";
import AuthApiService from "../../services/auth-api-service";
import Context from "../../context";
import TokenService from "../../services/token-service";
import PostsApiService from "../../services/posts-api-services";
import { withRouter } from "react-router-dom";
import "./login.css";

class Login extends React.Component {
  static contextType = Context;

  clickCancel(e) {
    e.preventDefault();
    this.props.history.push("/main");
  }

  handleSuccess() {
    const destination = (this.props.location.state || {}).from || "/main";
    const token = TokenService.readJwToken();
    this.context.clearError();

    PostsApiService.getUser(token.id)
      .then((u) => {
        this.context.setActiveUser(u, () =>
          this.props.history.push(destination)
        );
      })
      .catch((err) => this.context.setError(err.error));
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, password } = e.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(() => {
        username.value = "";
        password.value = "";
        this.handleSuccess();
      })
      .catch((res) => this.context.setError(res.error));
  }

  render() {
    return (
      <React.Fragment>
        <section className="login-container">
          <h2>Login</h2>
          <form id="login-form" onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />

            <div className="button-container">
              <button className="clickMe" type="submit">
                Login
              </button>
              <button className="clickMe" onClick={(e) => this.clickCancel(e)}>
                Cancel
              </button>
            </div>
            {this.context.error !== null ? (
              <p className="error">{this.context.error}</p>
            ) : null}
          </form>
        </section>

        <section className="login-container">
          <h2>Demo Credentials</h2>
          <p>Username: DemoUser</p>
          <p>Password: Password1!</p>
        </section>
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
