import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from '../components/nav/nav';
import Register from '../routes/register/register';
import Login from '../routes/login/login';
import Main from '../routes/main/main';
import PostPage from '../routes/postPage/postPage';
import Context from '../context';
import Editor from '../routes/editor/editor';
import UserPage from '../routes/userPage/userPage';
import PrivateRoute from '../components/utils/PrivateRoute';
import PublicOnlyRoute from '../components/utils/PublicOnlyRoute';
import './App.css';
import IdleService from '../services/idle-services';
import TokenService from '../services/token-service';
import AuthApiService from '../services/auth-api-service';
import PostsApiService from '../services/posts-api-services';
import Account from '../routes/account/account';
import Drafts from '../routes/drafts/drafts';
import NotFound from '../notFound';
import Landing from '../routes/landing/landing';

class App extends React.Component {
  state = {
    posts: [],
    users: [],
    comments: [],
    activeUser: {},
    error: null,
  };

  componentDidMount() {
    // function to reset auth token before it expires if user is no idle
    IdleService.setIdleCallback(this.logOutFromIdle);

    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimeResets();
      TokenService.queCallbackBeforeExpirey(() => {
        AuthApiService.postRefreshToken();
      });
      const token = TokenService.readJwToken();
      PostsApiService.getUser(token.id).then((u) =>
        this.setState({
          activeUser: u,
        })
      );
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpirey();
  }

  logOutFromIdle = () => {
    // if user is idle clears timeout function so auth token won't refresh
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpirey();
    IdleService.unRegisterIdleResets();
    this.forceUpdate();
  };

  setPosts = (posts) => {
    this.setState({
      posts: posts,
    });
  };

  setError = (err) => {
    this.setState({
      error: err,
    });
  };

  setActiveUser = (user, callBack) => {
    this.setState(
      {
        activeUser: user,
      },
      callBack()
    );
  };

  clearActiveUser = (callBack) => {
    this.setState(
      {
        activeUser: {},
      },
      callBack()
    );
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setEditPost = (post) => {
    this.setState({ editPost: post });
  };

  clearEditPost = (post) => {
    this.setState({ editPost: {} });
  };

  render() {
    const contextValue = {
      posts: this.state.posts,
      users: this.state.users,
      comments: this.state.comments,
      activeUser: this.state.activeUser,
      error: this.state.error,
      editPost: this.state.editPost,
      setEditPost: this.setEditPost,
      clearEditPost: this.clearEditPost,
      setActiveUser: this.setActiveUser,
      clearActiveUser: this.clearActiveUser,
      setError: this.setError,
      clearError: this.clearError,
      setPosts: this.setPosts,
    };

    return (
      <div className='App'>
        <Nav user={this.state.activeUser} />
        <Context.Provider value={contextValue}>
          <main>
            <Switch>
              <Route exact path={'/'} component={Landing} />
              <Route path={'/main'} component={Main} />
              <PublicOnlyRoute path={'/register'} component={Register} />
              <PublicOnlyRoute path={'/login'} component={Login} />
              <Route path={'/post/:id'} component={PostPage} />
              <PrivateRoute exact path={'/editor'} component={Editor} />
              <PrivateRoute path={'/editor/:id'} component={Editor} />
              <Route exact path={'/user/:id'} component={UserPage} />
              <PrivateRoute path={'/drafts'} component={Drafts} />
              <PrivateRoute path={'/user/:id/account'} component={Account} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </Context.Provider>
      </div>
    );
  }
}

export default App;
