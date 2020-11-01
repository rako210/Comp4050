import { Chip } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Base from '../Base'
import FallbackAvatar from '../materialUI/FallBackAvatar'
import SimpleRating from '../materialUI/Rating'
import { UserTaskCard } from '../tasks/Card'
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
      tasks: [],
      render: false,
    }
  }

  componentDidMount() {
    var getUserTasks = async () => {
      await fetch('/api/list/task/created-by-user')
        .then((res) => res.json())
        .then((data) => {
          this.setState({ tasks: data.result, render: true })
          console.log(data.result)
        })
    }

    getUserTasks()
  }

  render() {
    var avatarUrl = this.props.userData.avatar
    var skills = this.props.userData.skills.split(',')
    var renderSkills = (
      <div>
        {skills.map((skill) => {
          return <Chip label={skill} style={{ margin: '2px' }} />
        })}
      </div>
    )
    console.log(this.state.tasks)
    var userRating = <SimpleRating rating={this.props.userData.userRating} />
    console.log(this.props)
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
                      {this.props.userData.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {this.props.userData.suburb}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {this.props.userData.email}
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
