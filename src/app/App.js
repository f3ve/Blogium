import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Nav from '../components/nav/nav'
import Register from '../routes/register/register'
import Login from '../routes/login/login'
import Main from '../routes/main/main'
import dummyStore from '../dummy-store'
import Context from '../context'
import './App.css'


class App extends React.Component{
  state = {
    posts: [],
    users: [],
    comments: [],
    error: null
  }

  componentDidMount() {
    //to simulate api call
    setTimeout(
      this.setState({
        posts: dummyStore.posts,
        users: dummyStore.users,
        comments: dummyStore.comments,
      }),
      3000
    )
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
              </Switch>
            </main>
          </Context.Provider>
        </div>
      )
  }
}

export default App;