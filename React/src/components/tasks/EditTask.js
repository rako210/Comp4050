import React from 'react'
import Base from '../Base'
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom'

class EditTask extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Base authenticated={this.props.authenticated}> </Base>
        <FromEditTask> </FromEditTask>
      </div>
    )
  }
}

class FromEditTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bannerMessage: '',
      registeredUsers: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    var url = window.location.href
    var parameterRegex = /id=[0-9]*/g
    var numberRegex = /[0-9]+/i
    var jobID = url.match(parameterRegex)[0].match(numberRegex)[0]

    var data = { jobID: jobID }

    fetch('/api/list/task/registed-for-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result.length > 0)
          this.setState({ registeredUsers: data.result })
      })
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = new FormData(event.target)

    var url = window.location.href
    var parameterRegex = /id=[0-9]*/g
    var numberRegex = /[0-9]+/i

    var jobID = url.match(parameterRegex)[0].match(numberRegex)[0]
    data.append('jobID', jobID)

    fetch('/api/task/edit', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'True')
          this.setState({
            bannerMessage: 'Task details Updated!',
          })
        else this.setState({ bannerMessage: 'Penis!' })
      })
  }

  render() {
    return (
      <div>
        <h2> Update Task Details </h2>
        <h2> {this.state.bannerMessage} </h2>
        <form onSubmit={this.handleSubmit} className="poster1">
          <input type="hidden" name="id" value={1} />
          Owner:
          <input type="text" name="owner" />
          <br />
          Title:
          <input type="text" name="title" />
          <br />
          Location:
          <input type="text" name="location" />
          <br />
          Description:
          <input type="text" name="descrip" onChange={this.handleChange} />
          <br />
          Select user to perform task:
          {(this.state.registeredUsers == null && (
            <div>No user has applied for this job yet.</div>
          )) ||
            (this.state.registeredUsers != null && (
              <select>
                {this.state.registeredUsers.map((user) => (
                  <option value={user.userID}>{user.userID}</option>
                ))}
              </select>
            ))}
          <input type="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default EditTask
