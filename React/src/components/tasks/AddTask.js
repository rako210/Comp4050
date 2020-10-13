import React from 'react'
import { Redirect } from 'react-router-dom'
import Base from '../Base'

class AddTask extends React.Component {
  render() {
    return (
      <div>
        <Base {...this.props} ></Base>
        <FormAddTask {...this.props} ></FormAddTask>
      </div>
    )
  }
}

class FormAddTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bannerMessage: '',
      redirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    console.log(event.target)
    const data = new FormData(event.target)

    fetch('/addingtask', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.result === 'True')
          this.setState({redirect: true, bannerMessage: data.bannerMessage})
        else {
          this.setState({bannerMessage: data.bannerMessage})
        }
      })

    // Update react state to display data correctly
    this.props.updateUserData();

  }

  render() {
    let render

    if (this.state.redirect) {
      render = <Redirect to={{
        pathname: "/",
        state: {bannerMessage: this.state.bannerMessage}
      }} />
    } else {
      render = (
        <div>
          
          <h2>Create a Task</h2>
          <h2>{this.state.bannerMessage}</h2>
          <form onSubmit={this.handleSubmit} className="poster1">
            Title: <input className="poster1Input"  type="text" name="title" />
            <br />
            Location: <input className="poster1Input"  type="text" name="location" defaultValue={this.props.userData.suburb}/>
            <br />
            Description: <input className="poster1Input"  type="text" name="descrip" />
            <br />
            Payment:
            <select name="cost">
              <option value="1">1 Coin (Low Effort)</option>
              <option value="2">2 Coins (Medium Effort)</option>
              <option value="3">3 Coins (High Effort)</option>
            </select>
             Category:
<select size={11} name="category">
  <option value="Other Services" selected="selected">Other Services </option>
  <option value="Electrical">Electrical</option>
  <option value="Plumbing">Plumbing </option>
  <option value="Gardening/ Landscaping">Gardening/ Landscaping</option>
  <option value="Paint / Plaster">Paint / Plaster </option>
  <option value="Other Trade">Other Trade</option>
  <option value="General Housework">General Housework </option>
  <option value="Computer/ Tech">Computer/ Tech</option>
  <option value="Sports/ Health">Sports/ Health</option>
  <option value="Automotive">Automotive </option>
  <option value="Veterinary">Veterinary </option>
  <option value="Babysitting">Babysitting</option>
</select>
            <input type="submit" defaultValue="Update Details" />
          </form>
        </div>
      )
    }

    return render
  }
}

export default AddTask
