import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
  Link,
  Redirect,
} from "react-router-dom";

class Base extends React.Component {
  componentDidMount() {
    console.log(this.props.authenticated);
  }

  render() {
    return (
      <div>
        <Main authenticated={this.props.authenticated}></Main>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <h1>COMMUNITY BARTER SITE</h1>
          <img src="/static/images/cblogo.JPG" className="logo" />
          <div className="styled">
            <ul>
              <NavBar authenticated={this.props.authenticated}></NavBar>
            </ul>
          </div>
          <Login authenticated={this.props.authenticated}></Login>
        </div>
      </div>
    );
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const authenticated = this.props.authenticated;
    let retVal;

    if (authenticated !== "None") {
      retVal = (
        <div>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About this site</a>
          </li>
          <li>
            <a href="/accountSettings">Account Settings</a>
          </li>
        </div>
      );
    } else {
      retVal = <div></div>;
    }

    return <div>{retVal}</div>;
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const authenticated = this.props.authenticated;
    let retVal;

    if (authenticated !== "None") {
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
      );
    } else {
      retVal = (
        <div>
          <form
            action="/login"
            method="POST"
            id="loginform"
            className="poster1"
          >
            Username: <input type="text" name="name" />
            <br />
            Password: <input type="text" name="password" />
            <br />
            <input type="submit" value="Login" />
          </form>
          <form
            action="/createAccount"
            method="get"
            target="_blank"
            className="button"
          >
            <input type="submit" value="Create Account" />
          </form>
        </div>
      );
    }

    return <div>{retVal}</div>;
  }
}

export default Base;
