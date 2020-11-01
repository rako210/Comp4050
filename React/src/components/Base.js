import { Button, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import './Base.css'
import BasicTextFields from './materialUI/TextField'
import MenuListComposition from './MenuItem'

class Base extends Component {
  render() {
    return (
      <div>
        <NavBar {...this.props} />
        <Login {...this.props} />
      </div>
    )
  }
}

class NavBar extends Component {
  render() {
    var retVal = <div></div>

    if (this.props.authenticated !== 'None')
      retVal = (
        <div className="header">
          <div className="nav-bar">
            <div className="nav-left">
              <div className="nav-logo-container">
                <img
                  className="nav-logo"
                  src={require('../images/logo.png')}
                  alt="Website Logo"
                />
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
                {/* <a href="/accountSettings">
                  <li>
                    <Typography variant="button">Account Settings</Typography>
                  </li>
                </a>
                <a href="/accountProfile">
                  <li>
                    <Typography variant="button">Account Profile</Typography>
                  </li>
                </a> */}
              </ul>
            </div>

            <div className="nav-right">
              <ul className="nav-bar-list">
                <a href="#">
                  <li style={{ color: 'orange' }}>
                    {this.props.userData.accountBalance} Coins
                  </li>
                </a>
                <a href="#">
                  <li>
                    <MenuListComposition {...this.props} />
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

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      bannerMessage: '',
    }

    this.updateState = this.updateState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  updateState(object) {
    this.setState(object)
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = new FormData()
    data.append('name', this.state.username)
    data.append('password', this.state.password)

    fetch('/login', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result === 'true') this.props.updateUserData()
        else this.setState({ bannerMessage: res.bannerMessage })
      })

    // this.props.history.push('/accountProfile')
  }

  render() {
    const authenticated = this.props.authenticated
    let retVal

    if (authenticated !== 'None') {
      retVal = <div style={{ marginBottom: '15px' }}></div>
    } else {
      retVal = (
        <div>
          <form
            action="/login"
            method="POST"
            id="loginform"
            className="poster1"
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <BasicTextFields callBack={this.updateState} label="Username" />
            <BasicTextFields
              callBack={this.updateState}
              label="Password"
              type="password"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Login
            </Button>
            <p>{this.state.bannerMessage}</p>
            {/* <input type="submit" value="Login" /> */}
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
            Username: <input
              className="poster1Input"
              type="text"
              name="name"
            />{' '}
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }

    return <div>{retVal}</div>
  }
}

export default Base
