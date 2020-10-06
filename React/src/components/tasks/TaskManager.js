import React from 'react'
import ShowAllTasksButton from './ShowAllTasksButton'
import ShowAllTasksTable from './ShowAllTasksTable'
import ShowAllCreatedTasksButton from './ShowAllCreatedTasksButton'
import ShowAllCreatedTasksTable from './ShowAllCreatedTasksTable'
import {AllTaskCard} from './Card.js'

class TaskManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userID: fetch('/api/getUserID').then((res) => res.json()),
      displayTable: 'False',
      apiURL: null,
      tasks: null,
      registeredTasks: [],
      bannerMessage: '',
    }

    this.displayAllTasks = this.displayAllTasks.bind(this)
    this.displayCreatedTasks = this.displayCreatedTasks.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.applyForTask = this.applyForTask.bind(this)
    this.updateTaskList = this.updateTaskList.bind(this)
  }

  displayAllTasks(data) {
    this.setState({
      displayTable: 'True',
      tasks: data.result,
      apiURL: 'all',
    })
  }

  displayCreatedTasks(data) {
    this.setState({
      displayTable: 'True',
      tasks: data.result,
      apiURL: 'created-by-user',
    })
  }

  updateTaskList() {
    const fetchData = () =>
      Promise.all([
        fetch('/api/list/task/' + this.state.apiURL).then((res) => res.json()),
      ])

    fetchData().then(([data]) => {
      this.setState({
        tasks: data.result,
      })
    })
  }

  deleteTask(event) {
    event.preventDefault()

    const data = new FormData(event.target)

    // Delete the selected task
    fetch('/deletetask', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tasks: data.result })
      })
  }

  applyForTask(event) {
    event.preventDefault()

    const data = new FormData(event.target)

    // Mark the selected task as applied for by the user.
    fetch('/apply_for_task', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'True')
          this.setState({ bannerMessage: 'Sucessfully applied for task!' })
        else
          this.setState({ bannerMessage: 'Please sign in to apply for tasks!' })
      })

    // Update table data
    this.updateTaskList()
  }

  render() {
    return (
      <div>
        <form action="/addtask" method="get" id="addtask" className="button">
          <input type="submit" value="Create a new Task" />
        </form>

        <ShowAllCreatedTasksButton
          callBack={this.displayCreatedTasks}
        ></ShowAllCreatedTasksButton>

        <ShowAllTasksButton
          callBack={this.displayAllTasks}
        ></ShowAllTasksButton>

        <form onSubmit={this.deleteTask} className="button">
          <input type="number" name="taskid" />
          <input type="submit" value="Delete a Task" />
        </form>

        {this.state.bannerMessage}
        {this.state.displayTable === 'True' &&
          this.state.tasks != null &&
          ((this.state.apiURL === 'all' && (
            <div>
              <RenderAllCards
                forceUpdate={this.updateTaskList}
                data={this.state.tasks}
                callBack = {this.applyForTask}
              ></RenderAllCards>
            </div>
          )) ||
            (this.state.apiURL === 'created-by-user' && (
              <div>
                <ShowAllCreatedTasksTable
                  forceUpdate={this.updateTaskList}
                  data={this.state.tasks}
                ></ShowAllCreatedTasksTable>
              </div>
            )))}
      </div>
    )
  }
}

class RenderAllCards extends React.Component {

  render() {
    let render = this.props.data.map((task) => {
      return <AllTaskCard data={task} callBack={this.props.callBack}></AllTaskCard>
    })

    return <div className="section">{render}</div>
  }

}

export default TaskManager;
