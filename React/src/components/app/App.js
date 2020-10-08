import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from '../about/About'
import Home from '../home/Home'
import AccountProfile from '../profile/AccountProfile'
import Review from '../review/Review'
import AccountSettings from '../settings/AccountSettings'
import CreateAccount from '../settings/CreateAccount'
import AddTask from '../tasks/AddTask'
import EditTask from '../tasks/EditTask'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'null',
      userData: null,
      render: false,
    }

    this.updateUserData = this.updateUserData.bind(this)
  }

  componentDidMount() {
    this.updateUserData()
  }

  updateUserData() {
    var getUserData = async () => {
      this.setState({render: false})
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
      updateUserData: this.updateUserData,
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
