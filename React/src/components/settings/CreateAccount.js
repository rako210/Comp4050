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
          Username: <input className="poster1Input"  type="text" name="username" />
          <br />
          Email Address: <input className="poster1Input"  type="text" name="email" />
          <br />
          Name: <input className="poster1Input"  type="text" name="name" />
          <br />
          Suburb: <input className="poster1Input"  type="text" name="suburb" />
          <br />
          Password: <input className="poster1Input"  type="text" name="password" />
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
