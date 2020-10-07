import React from 'react'
import './Base.css'
import SimpleMenu from './DropDown'
import MenuListComposition from './MenuItem'
import Typography from '@material-ui/core/Typography'
import { orange } from '@material-ui/core/colors'

class Base extends React.Component {
  render() {
    return (
      <div>
        <Main authenticated={this.props.authenticated} userData={this.props.userData}></Main>
      </div>
    )
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <div>
          <NavBar authenticated={this.props.authenticated} userData={this.props.userData}></NavBar>
          <Login authenticated={this.props.authenticated}></Login>
        </div>
      </div>
    )
  }
}

class NavBar extends React.Component {
  render() {
    var retVal = <div></div>

    

    if (this.props.authenticated !== 'None')
    // console.log(this.props.userData.id)
      retVal = (
        <div className="header">
          <div className="nav-bar">
            <div className="nav-left">
              <div className="nav-logo-container">
                <img className="nav-logo" src={require('../images/logo.png')} />
              </div>
              <ul className="nav-bar-list">
                <a href="/">
                  <li>
                    <Typography variant="button">Home</Typography>
                  </li>
                </a>
                <a href="/about">
                  <li>
                    <Typography variant="button">About Us</Typography>
                  </li>
                </a>
                <a href="/accountSettings">
                  <li>
                    <Typography variant="button">Account Settings</Typography>
                  </li>
                </a>
                <a href="/accountProfile">
                  <li>
                    <Typography variant="button">Account Profile</Typography>
                  </li>
                </a>
              </ul>
            </div>

            <div className="nav-right">
              <ul className="nav-bar-list">
              <a href="#">
                  <li style={{color: 'orange'}}>
                  {this.props.userData.accountBalance} Coins
                  </li>
                </a>
                <a href="#">
                  <li>
                    <MenuListComposition
                      authenticated={this.props.authenticated}
                    ></MenuListComposition>
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      )

    return retVal
  }
}

class Login extends React.Component {
  render() {
    const authenticated = this.props.authenticated
    let retVal

    if (authenticated !== 'None') {
      retVal = (
        <div>
          <h2>Logged in as {authenticated}</h2>
          <form
            action="/logout"
            method="POST"
            id="logoutform"
            className="button"
          >
            <input type="submit" value="Logout" />
          </form>
        </div>
      )
    } else {
      retVal = (
        <div>
          <form
            action="/login"
            method="POST"
            id="loginform"
            className="poster1"
          >
            <h3>Sign In</h3>
            Username: <input type="text" name="name" /> <br />
            Password: <input type="text" name="password" /> <br />
            <input type="submit" value="Login" />
          </form>

          <form
            action="/createAccount"
            method="get"
            target="_blank"
            className="button"
          >
            <h3>Dont have an Account?</h3>
            <input type="submit" value="Create Account" />
          </form>

          <form action="/ForgotPassword" method="POST" className="poster1">
            <h3>Forgot Password?</h3>
            Username: <input type="text" name="name" /> <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }

    return <div>{retVal}</div>
  }
}

export default Base
