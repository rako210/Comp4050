import React from "react";
import Base from "../Base";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Base authenticated={this.props.authenticated}></Base>
        <FormAddTask></FormAddTask>
      </div>
    );
  }
}

class FormAddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      title: "",
      location: "",
      description: "",
      bannerMessage: "",
    };
    this.handleChangeOwner = this.handleChangeOwner.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeOwner(event) {
    this.setState({ owner: event.target.value });
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }
  handleChangeLocation(event) {
    this.setState({ location: event.target.value });
  }
  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log(event.target);
    const data = new FormData(event.target);

    fetch("/addingtask", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          validPassword: "True",
          bannerMessage: "Task Added",
        });
      });
  }

  render() {
    return (
      <div>
        <h2>Update your details</h2>
        <h2>{this.state.bannerMessage}</h2>
        <form onSubmit={this.handleSubmit} className="poster1">
          Owner:{" "}
          <input
            type="text"
            name="owner"
            value={this.state.owner}
            onChange={this.handleChangeEmail}
          />
          <br />
          Title:{" "}
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChangePassword}
          />
          <br />
          Location:{" "}
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChangeSuburb}
          />
          <br />
          Description:{" "}
          <input
            type="text"
            name="descrip"
            value={this.state.description}
            onChange={this.handleChangeName}
          />
          <br />
          <input type="submit" defaultValue="Update Details" />
        </form>
      </div>
    );
  }
}

export default AddTask;
