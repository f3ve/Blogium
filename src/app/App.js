import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Nav from '../components/nav/nav'
import Register from '../routes/register/register'


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
            </Switch>
          </main>
        </div>
      )
  }
}

export default App;