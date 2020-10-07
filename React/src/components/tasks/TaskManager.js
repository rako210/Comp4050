import React from 'react'
import BannerMessageController from '../materialUI/BannerMessageController'
import { AllTaskCard } from './Card.js'
import ShowAllCreatedTasksButton from './ShowAllCreatedTasksButton'
import ShowAllCreatedTasksTable from './ShowAllCreatedTasksTable'
import ShowAllTasksButton from './ShowAllTasksButton'

class TaskManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userID: fetch('/api/getUserID').then((res) => res.json()),
      displayTable: 'False',
      apiURL: null,
      tasks: null,
      registeredTasks: [],
      bannerMessage: ''
    }

    this.displayAllTasks = this.displayAllTasks.bind(this)
    this.displayCreatedTasks = this.displayCreatedTasks.bind(this)
    this.updateTaskList = this.updateTaskList.bind(this)
    this.updateBannerMessage = this.updateBannerMessage.bind(this)
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

  updateBannerMessage(bannerMessage) {
    this.setState({bannerMessage: bannerMessage})
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

        {this.state.bannerMessage}
        <BannerMessageController bannerMessage={this.state.bannerMessage} />

        {this.state.displayTable === 'True' &&
          this.state.tasks != null &&
          ((this.state.apiURL === 'all' && (
            <div>
              <RenderAllCards
                data={this.state.tasks}
                callBack = {this.applyForTask}
                updateRender={this.updateTaskList}
              ></RenderAllCards>
            </div>
          )) ||
            (this.state.apiURL === 'created-by-user' && (
              <div>
                <ShowAllCreatedTasksTable
                  {...this.props}
                  updateList={this.updateTaskList}
                  updateBannerMessage={this.updateBannerMessage}
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
      return <AllTaskCard key={task.id} {...this.props} data={task}></AllTaskCard>
    })

    return <div className="section">{render}</div>
  }

}

export default TaskManager;
