import { Chip } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Base from '../Base'
import FallbackAvatar from '../materialUI/FallBackAvatar'
import SimpleRating from '../materialUI/Rating'
import { AllTaskCard, OtherUserTaskCard, UserTaskCard } from '../tasks/Card'
import './AccountProfile.css'

class AccountProfile extends React.Component {
  render() {
    return (
      <div>
        <Base {...this.props}></Base>
        <Main {...this.props}></Main>
      </div>
    )
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipientData: [],
      tasks: [],
      render: false,
      renderMessage: false,
    }
  }

  componentDidMount() {
    var search = this.props.location.search
    var fetchUrl = '/api/list/task/created-by-user'

    if (search) {
      fetchUrl = '/api/list/task/createdByUser' + this.props.location.search
      var getUserData = async () => {
        await fetch('/api/data/user/' + this.props.location.search)
          .then((res) => res.json())
          .then((data) => {
            this.setState({ recipientData: data.result, render: true })
          })
      }
      var check = search.replace('?username=', '')
      if (check !== this.props.userData.username) {
        this.setState({ renderMessage: true })
      }

      getUserData()
    } else {
      this.setState({ recipientData: this.props.userData, render: true })
    }

    var getUserTasks = async () => {
      await fetch(fetchUrl)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ tasks: data.result, render: true })
          console.log(data.result)
        })
    }
    getUserTasks()
  }

  render() {
    var avatarUrl = this.state.recipientData.avatar
    var skills = this.state.recipientData.skills
    var renderSkills = <div>This user hasn't set their skills yet</div>
    if (skills) {
      skills = skills.split(',')
      renderSkills = (
        <div>
          {skills.map((skill) => {
            return <Chip label={skill} style={{ margin: '2px' }} />
          })}
        </div>
      )
    }
    var userRating = (
      <SimpleRating rating={this.state.recipientData.userRating} />
    )

    var renderMessage = <div></div>

    if (this.state.renderMessage)
      renderMessage = (
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            event.preventDefault()

            this.props.history.push({
              pathname: '/send-message/',
              search: '?username=' + this.state.recipientData.username,
            })
          }}
        >
          Send {this.state.recipientData.name} a message
        </Button>
      )

    if (this.state.render) {
      var renderTasks = (
        <div>
          {this.state.tasks.map((task) => {
            return (
              <div>
                <UserTaskCard {...this.props} data={task} />
              </div>
            )
          })}
        </div>
      )
      if (this.state.renderMessage) {
        renderTasks = (
          <div>
            {this.state.tasks.map((task) => {
              return (
                <div>
                  <OtherUserTaskCard {...this.props} data={task} />
                </div>
              )
            })}
          </div>
        )
      }
      return (
        <div>
          <div className="profileContainer">
            <div className="profileLeft">
              <div className="profileDetails">
                <div className="avatarContainer">
                  <div className="avatarImage">
                    <FallbackAvatar url={avatarUrl} />
                  </div>
                  <div className="profileContent">
                    <Typography variant="h6" gutterBottom>
                      {this.state.recipientData.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {this.state.recipientData.suburb}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {this.state.recipientData.email}
                    </Typography>
                  </div>
                </div>
                <Divider style={{ marginBottom: '5px' }} />
                <div className="userDetails">
                  <Typography variant="subtitle1" gutterBottom>
                    Skills: {renderSkills}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    User Rating: {userRating}
                  </Typography>
                  {renderMessage}
                </div>
              </div>
            </div>

            <div className="profileRight">
              <div
                style={{
                  width: 'auto',
                  marginBottom: '15px',
                  backgroundColor: 'white',
                  padding: '5px',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  User Created Tasks
                </Typography>
              </div>
              {renderTasks}
            </div>
          </div>
        </div>
      )
    } else {
      return <div>Getting the required data!</div>
    }
  }
}

export default AccountProfile
