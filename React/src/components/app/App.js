import React, { useState, useEffect } from 'react'
import About from '../about/About'
import CreateAccount from '../settings/CreateAccount'
import AccountSettings from '../settings/AccountSettings'
import EditTask from '../tasks/EditTask'
import AddTask from '../tasks/AddTask'
import Review from '../review/Review'
import Home from '../home/Home'
import AccountProfile from '../profile/AccountProfile'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'null',
      userData: null,
      render: null,
    }
  }

  componentDidMount() {
    var getUserData = async () => {
      await fetch('/user_login')
        .then((res) => res.json())
        .then((data) => {
          this.setState({ username: data.data })
        })

      if(this.state.username !== 'None') {
        await fetch('/api/data/current-user')
        .then((res) => res.json())
        .then((data) => {
          this.setState({ userData: data.result })
        })
      }

      this.setState({render: true})

    }

    getUserData()
  }

  render() {
    let render

    if (this.state.render) {
      
      render = (
        <Router>
          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/addtask">
                <AddTask authenticated={this.state.username} userData={this.state.userData}></AddTask>
              </Route>
              <Route path="/editTask">
                <EditTask authenticated={this.state.username} userData={this.state.userData}></EditTask>
              </Route>
              <Route path="/accountProfile">
                <AccountProfile authenticated={this.state.username} userData={this.state.userData}/>
              </Route>
              <Route path="/about">
                <About authenticated={this.state.username} userData={this.state.userData}/>
              </Route>
              <Route path="/accountSettings">
                <AccountSettings authenticated={this.state.username} userData={this.state.userData} />
              </Route>
              <Route path="/createAccount">
                <CreateAccount></CreateAccount>
              </Route>
              <Route
                path="/review"
                render={(props) => (
                  <Review
                    {...props}
                    authenticated={this.state.username}
                    userData={this.state.userData}
                  ></Review>
                )}
              />
              <Route path="/" render={(props) => (<Home
                  {...props}
                  authenticated={this.state.username}
                  userData={this.state.userData}
                ></Home>)}>
                
                
              </Route>
            </Switch>
          </div>
        </Router>
      )
    } else render = <div></div>

    return render
  }
}

// function App() {
//   const [login, setLogin] = useState('User')

//   useEffect(() => {
//     fetch('/user_login')
//       .then((res) => res.json())
//       .then((data) => {
//         setLogin(data.data)
//       })
//   }, [])

//   return (

//   )
// }

export default App
