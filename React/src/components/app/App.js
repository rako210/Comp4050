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
      render: false,
    }

    this.updateData = this.updateData.bind(this)
  }

  componentDidMount() {
    this.updateData()
  }

  updateData() {
    var getUserData = async () => {
      await fetch('/user_login')
        .then((res) => res.json())
        .then((data) => {
          this.setState({ username: data.data })
        })

      if (this.state.username !== 'None') {
        await fetch('/api/data/current-user')
          .then((res) => res.json())
          .then((data) => {
            this.setState({ userData: data.result })
          })
      }

      this.setState({ render: true })
    }

    getUserData()
  }

  render() {
    var render = <div></div>
    let props = {
      authenticated: this.state.username,
      userData: this.state.userData,
      updateData: this.updateData,
    }

    if (this.state.render) {
      render = (
        <Router>
          <div>
            <Switch>
              <Route
                path="/addtask"
                render={(extraProps) => <AddTask {...props} {...extraProps} />}
              />
              <Route
                path="/editTask"
                render={(extraProps) => <EditTask {...props} {...extraProps} />}
              />
              <Route
                path="/accountProfile"
                render={(extraProps) => (
                  <AccountProfile {...props} {...extraProps} />
                )}
              />
              <Route
                path="/about"
                render={(extraProps) => <About {...props} {...extraProps} />}
              />
              <Route
                path="/accountSettings"
                render={(extraProps) => (
                  <AccountSettings {...props} {...extraProps} />
                )}
              />
              <Route
                path="/createAccount"
                render={(extraProps) => (
                  <CreateAccount {...props} {...extraProps} />
                )}
              />
              <Route
                path="/review"
                render={(extraProps) => <Review {...props} {...extraProps} />}
              />
              <Route
                path="/"
                render={(extraProps) => <Home {...props} {...extraProps} />}
              />
            </Switch>
          </div>
        </Router>
      )
    }

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
