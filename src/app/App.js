import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Nav from '../components/nav/nav'
import Register from '../routes/register/register'
import Login from '../routes/login/login'
import Main from '../routes/main/main'
import PostPage from '../routes/postPage/postPage'
import dummyStore from '../dummy-store'
import Context from '../context'
import Editor from '../routes/editor/editor'
import UserPage from '../routes/userPage/userPage'
import './App.css'


class App extends React.Component{
  state = {
    posts: dummyStore.posts,
    users: dummyStore.users,
    comments: dummyStore.comments,
    error: null
  }

  setPosts = (posts) => {
    this.setState({
      posts: posts
    })
  }

  setError = (err) => {
    this.setState({
      error: err
    })
  }

  clearError = () => {
    this.setState({error: null})
  }

  render() {
    const contextValue = {
      posts: this.state.posts,
      users: this.state.users,
      comments: this.state.comments,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setPosts: this.setPosts
    }
      return (
        <div className="App">
          <Nav />
          <Context.Provider value={contextValue}>
            <main>
              <Switch>
                <Route 
                  exact path = {'/'}
                  component = {Main}
                  />
                <Route 
                  path={'/register'}
                  component={Register}
                  />
                <Route
                  path={'/login'}
                  component={Login}
                />
                <Route
                  path={'/post/:id'}
                  component={PostPage}
                />
                <Route
                  path={'/editor'}
                  component={Editor}
                />
                <Route
                  path={'/user/:id'}
                  component={UserPage}
                />
              </Switch>
            </main>
          </Context.Provider>
        </div>
      )
  }
}

export default App;