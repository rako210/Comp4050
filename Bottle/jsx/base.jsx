// These are needed - bottle-react parses this file to build a javascript dependency tree.
// require https://cdnjs.cloudflare.com/ajax/libs/react/16.9.0/umd/react.development.js
// require https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.development.js
class Base extends React.Component {
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
            <input type="submit" defaultValue="logout" />
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

bottlereact._register("Base", Base);
// export default Base;