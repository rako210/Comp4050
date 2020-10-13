import React from "react";
import { render } from 'react-dom';
import Tags from 'react-tagging-input';
import "react-tagging-input/dist/styles.css";
import {Redirect } from 'react-router-dom'




class CreateAccount extends React.Component {
  state = {
    tags: []
  };

  constructor(props){
    super(props);
    this.state = {tags:[],render:false}
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  onTagAdded(tag) {
    this.setState({
      tags: [...this.state.tags, tag]
    });
  }


  onTagRemoved(tag, index) {
    this.setState({
      tags: this.state.tags.filter((tag, i) => i !== index)
    });
  }

  handleSubmit(event) {
    event.preventDefault()

    console.log(event.target)
    const data = new FormData(event.target)
    data.append('tags', this.state.tags)

    fetch('/createAcc', {
      method: 'POST',
      body: data,
    })

    // Update react state to display data correctly
    this.props.updateUserData();
    this.setState({render:true})
  }
  render() {
    var render =      <div>
        <h1> Create an Account </h1>
        <form
          onSubmit={this.handleSubmit}
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
          <br />

          <div>
          Skills:
           <Tags
          tags={this.state.tags}
          placeholder="Add a Skill and Hit Space"
          onAdded={this.onTagAdded.bind(this)}
          onRemoved={this.onTagRemoved.bind(this)} />
            </div>
          <input type="submit" defaultValue="Create Account" />
        </form>
      </div>

if(this.state.render)
        render = <Redirect to={{
        pathname: "/",
        state: {bannerMessage: 'Account created'}
      }} />
      return render
  }
}

export default CreateAccount;
