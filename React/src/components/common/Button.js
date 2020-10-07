import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import BannerMessageController from '../materialUI/BannerMessageController'

/**
 * Button to apply for tasks
 * @param data Data about the task
 * @param callBack Api method to call when submitting request
 */
export class ApplyButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bannerMessage: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = new FormData(event.target)

    // Mark the selected task as applied for by the user.
    fetch('/apply_for_task', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'true')
          this.setState({ bannerMessage: 'Sucessfully applied for task!' })
        else
          this.setState({ bannerMessage: 'Please sign in to apply for tasks!' })
      })

    this.props.updateRender()
  }

  render() {
    let render

    if (this.props.data.isRegistered)
      render = (
        <div style={{ color: 'green' }}>
          <BannerMessageController bannerMessage={this.state.bannerMessage} />
          You have already applied!
        </div>
      )
    else
      render = (
        <div>
          <form onSubmit={this.handleSubmit} className="button">
            <input type="hidden" value={this.props.data.id} name="id" />
            <input type="submit" value="Apply for Task" />
          </form>
        </div>
      )

    return render
  }
}

export class EditButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    this.setState({ redirect: true })
  }

  render() {
    var render = (
      <form onSubmit={this.handleSubmit} className="button">
        <input type="hidden" value={this.props.data.id} name="id" />
        <input type="submit" value="Edit Task" />
      </form>
    )

    if (this.state.redirect) {
      render = (
        <Redirect
          to={{
            pathname: '/editTask',
            state: { taskData: this.props.data },
          }}
        />
      )
    }
    return render
  }
}

/**
 * @param taskID the id of the task you want to delete
 */
export class DeleteButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bannerMessage: '',
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()

    const data = new FormData(event.target)

    fetch('/deletetask', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'true')
          this.setState({ bannerMessage: data.bannerMessage })
      })

    // Update list of data to be manipulated
    this.props.updateList()

    // Update user data to display correctly
    this.props.updateUserData()

    // Display banner message of successful operation
    this.props.updateBannerMessage(this.state.bannerMessage)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleClick} className="button">
          <input type="hidden" value={this.props.taskID} name="taskid" />
          <input type="submit" value="Delete Task" />
        </form>
      </div>
    )
  }
}

export class MarkCompleteButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()

    const data = new FormData(event.target)

    fetch('/api/task/mark-complete', {
      method: 'POST',
      body: data,
    })

    // this.props.callBack();
    this.setState({ redirect: true })
  }

  render() {
    let render

    if (this.props.data.status === 'Task Complete') {
      render = <div></div>
    } else {
      if (this.state.redirect)
        render = (
          <Redirect
            to={{
              pathname: '/review',
              state: { data: this.props.data },
            }}
          />
        )
      else
        render = (
          <form onSubmit={this.handleClick} className="button">
            <input type="hidden" value={this.props.data.id} name="taskid" />
            <input type="submit" value="Mark Task as Completed" />
          </form>
        )
    }

    return render
  }
}
