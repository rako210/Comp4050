import React from 'react'
import { Redirect } from 'react-router-dom'

class ShowAllCreatedTasksTable extends React.Component {
  render() {
    return (
      <div>
        <table style={{ width: '100%' }}>
          <tr>
            <th>ID</th>
            <th>Time Created</th>
            <th>owner</th>
            <th>Title</th>
            <th>Location</th>
            <th>Description</th>
            <th>Chosen Helper</th>
            <th>Task Status</th>
          </tr>
          {this.props.data.map((task) => {
            return (
              <tr>
                <td>{task.id}</td>
                <td>{task.time}</td>
                <td>{task.owner}</td>
                <td>{task.title}</td>
                <td>{task.location}</td>
                <td>{task.description}</td>
                {task.selectedUserID != null ? (
                  <p>{task.selectedUsername}</p>
                ) : (
                  <p>No User has been selected</p>
                )}
                <td>{task.status}</td>
                <td>
                  {(task.isRegistered && (
                    <div>You have already applied!</div>
                  )) ||
                    (!task.isRegistered && (
                      <form action="/editTask" className="button">
                        <input type="hidden" value={task.id} name="id" />
                        <input type="submit" value="Edit Task" />
                      </form>
                    ))}
                </td>
                <td>
                  <DeleteButton
                    callBack={this.props.forceUpdate}
                    taskID={task.id}
                  ></DeleteButton>
                </td>
                <td>
                  <MarkCompleteButton
                    callBack={this.props.forceUpdate}
                    data={task}
                  ></MarkCompleteButton>
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }
}

class DeleteButton extends React.Component {
  constructor(props) {
    super(props)
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
      .then((data) => {})

    this.props.callBack()
  }

  render() {
    return (
      <form onSubmit={this.handleClick} className="button">
        <input type="hidden" value={this.props.taskID} name="taskid" />
        <input type="submit" value="Delete Task" />
      </form>
    )
  }
}

class MarkCompleteButton extends React.Component {
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
      .then((res) => res.json())
      .then((data) => {})

    // this.props.callBack();
    this.setState({ redirect: true })
  }

  render() {
    let render

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
          <input type="hidden" value={this.props.taskID} name="taskid" />
          <input type="submit" value="Mark Task as Completed" />
        </form>
      )

    return render
  }
}

export default ShowAllCreatedTasksTable
