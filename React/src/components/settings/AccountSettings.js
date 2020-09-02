import React, { useState, useEffect } from "react";
import Base from "../Base";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function AccountSettings(props) {
  const [validation, setValidation] = useState(0);

  useEffect(() => {
    fetch("/pwordCheck")
      .then((res) => res.json())
      .then((data) => {
        setValidation(data.result);
      });
  }, []);

  return (
    <div>
      <Base authenticated={props.authenticated}></Base>
      <FormValidatePassword></FormValidatePassword>
    </div>
  );
}

class FormValidatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", validPassword: "False", bannerMessage: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    fetch("/pwordCheck", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result == "True") this.setState({ validPassword: "True" });
      });

    this.setState({ bannerMessage: "Wrong Password" });
  }

  render() {
    let retVal;

    if (this.state.validPassword === "True") {
      retVal = (
        <div>
          <FormUpdateAccount></FormUpdateAccount>
        </div>
      );
    } else {
      retVal = (
        <div>
          <h2>Verify password to access settings</h2>
          <h2>{this.state.bannerMessage}</h2>
          <form onSubmit={this.handleSubmit} className="poster1">
            Password:{" "}
            <input
              type="text"
              name="password"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <br />
            <input type="submit" defaultValue="Verify" />
          </form>
        </div>
      );
    }

    return <div>{retVal}</div>;
  }
}

class FormUpdateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", suburb: "", name:"", image:null, validPassword: "False", bannerMessage: "" };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeSuburb = this.handleChangeSuburb.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleChangeSuburb(event) {
    this.setState({ suburb: event.target.value });
  }
  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeImage(event) {
    this.setState({ image: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log(event.target)
    const data = new FormData(event.target);

    fetch("/updateAccount", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result == "True") 
            this.setState({validPassword: "True", bannerMessage: "Populated fields updated"});
        else
            this.setState({bannerMessage: "Password not updated! Password must contain at least 1 capital letter, 1 number and be atleast 7 characters long"})
      });
  }

  render() {

    return(
        <div>
            <h2>Update your details</h2>
            <h2>{this.state.bannerMessage}</h2>
            <form onSubmit={this.handleSubmit} className="poster1" >
                
              Email Address: <input type="text" name="email" value={this.state.email} onChange={this.handleChangeEmail}/><br />
              Password: <input type="text" name="pword" value={this.state.password} onChange={this.handleChangePassword}/><br />
              Suburb: <input type="text" name="suburb" value={this.state.suburb} onChange={this.handleChangeSuburb}/><br />
              Name: <input type="text" name="name" value={this.state.name} onChange={this.handleChangeName}/><br />
              Avatar: <input type="file" name="image" value={this.state.image} onChange={this.handleChangeImage}/><br />

              <input type="submit" defaultValue="Update Details" />

            </form>
          </div>
    );
    
  }
}

export default AccountSettings;
