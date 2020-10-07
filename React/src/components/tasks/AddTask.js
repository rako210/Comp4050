import React from 'react'
import Base from '../Base'
import { Redirect } from 'react-router-dom'

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
    this.props.updateData();

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
            Title: <input type="text" name="title" />
            <br />
            Location: <input type="text" name="location" value="Yes"/>
            <br />
            Description: <input type="text" name="descrip" />
            <br />
            Payment:
            <select name="cost">
              <option value="1">1 Coin (Low Effort)</option>
              <option value="2">2 Coins (Medium Effort)</option>
              <option value="3">3 Coins (High Effort)</option>
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
