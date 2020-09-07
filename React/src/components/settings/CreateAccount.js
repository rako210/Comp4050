import React from "react";

class CreateAccount extends React.Component {
  render() {
    return (
      <div>
        <h1> Create an Account </h1>
        <form
          action="/createAcc"
          method="POST"
          encType="multipart/form-data"
          id
          className="poster1"
        >
          Username: <input type="text" name="username" />
          <br />
          Email Address: <input type="text" name="email" />
          <br />
          Name: <input type="text" name="name" />
          <br />
          Suburb: <input type="text" name="suburb" />
          <br />
          Password: <input type="text" name="password" />
          <br />
          Avatar: <input type="file" name="image" />
          <br />
          <input type="submit" defaultValue="Create Account" />
        </form>
      </div>
    );
  }
}

export default CreateAccount;
