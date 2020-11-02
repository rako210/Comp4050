import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import BannerMessageController from '../materialUI/BannerMessageController'
import { AllTaskCard } from './Card.js'
import ShowAllCreatedTasksTable from './ShowAllCreatedTasksTable'
import ShowAllTasksButton from './ShowAllTasksButton'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})
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
    this.setState({ bannerMessage: bannerMessage })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <div className={classes.root}>
          <Grid
            container
            container
            spacing={0}
            direction="row"
            justify="center"
          >
            <Grid item xs={12} sm={3}>
              <form
                action="/addtask"
                method="get"
                id="addtask"
                className="button"
              >
                <input type="submit" value="Create a new Task" />
              </form>
            </Grid>
            <Grid item xs={12} sm={3}>
              {/* <ShowAllCreatedTasksButton
                callBack={this.displayCreatedTasks}
              ></ShowAllCreatedTasksButton> */}
            </Grid>
            <Grid item xs={12} sm={3}>
              <ShowAllTasksButton
                callBack={this.displayAllTasks}
              ></ShowAllTasksButton>
            </Grid>
          </Grid>
        </div>

        {this.state.bannerMessage}
        <BannerMessageController bannerMessage={this.state.bannerMessage} />

        {this.state.displayTable === 'True' &&
          this.state.tasks != null &&
          ((this.state.apiURL === 'all' && (
            <div>
              <RenderAllCards
                data={this.state.tasks}
                callBack={this.applyForTask}
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
TaskManager.propTypes = {
  classes: PropTypes.object.isRequired,
}
class RenderAllCards extends React.Component {
  render() {
    let render = this.props.data.map((task) => {
      return (
        <AllTaskCard key={task.id} {...this.props} data={task}></AllTaskCard>
      )
    })

    return <div className="section">{render}</div>
  }
}

export default withStyles(styles)(TaskManager)
