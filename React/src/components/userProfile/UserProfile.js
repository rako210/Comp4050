import React from "react";

class UserProfile extends React.Component {
  render() {
    return (
      <div>
        <Main authenticated={this.props.authenticated}>Hello</Main>
      </div>
    );
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1> user profile </h1>
      </div>
    );
  }
}


export default UserProfile;
