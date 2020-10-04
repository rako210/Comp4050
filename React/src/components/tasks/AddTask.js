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
      bannerMessage: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
          />
          <br />
          Title:{" "}
          <input
            type="text"
            name="title"
          />
          <br />
          Location:{" "}
          <input
            type="text"
            name="location"
          />
          <br />
          Description:{" "}
          <input
            type="text"
            name="descrip"
          />
          <br />
          Payment: {" "}
          <select name="cost">
              <option value="1">1 Coin (Low Effort)</option>
              <option value="2">2 Coins (Medium Effort)</option>
              <option value="3">3 Coins (High Effort)</option>
          </select>

          <input type="submit" defaultValue="Update Details" />
        </form>
      </div>
    );
  }
}

export default AddTask;
