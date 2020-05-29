import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Nav from '../components/nav/nav'
import Register from '../routes/register/register'
import Login from '../routes/login/login'
import './App.css'


class App extends React.Component{
  render() {
      return (
        <div className="App">
          <Nav />
          <main>
            <Switch>
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
        </div>
      )
  }
}

export default App;