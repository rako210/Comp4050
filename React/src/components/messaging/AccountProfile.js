import { Chip } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useRef } from 'react'
import FallbackAvatar from '../materialUI/FallBackAvatar'
import SimpleRating from '../materialUI/Rating'
import './AccountProfile.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

class AccountProfile extends React.Component {
  render() {
    return (
      <div>
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
      render: false,
    }
  }

  componentDidMount() {
    var getUserTasks = async () => {
      await fetch('/api/data/user/' + this.props.location.search)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ recipientData: data.result, render: true })
        })
    }

    getUserTasks()
  }

  render() {
    var avatarUrl = this.state.recipientData.avatar
    var skills = this.state.recipientData.skills
    var renderSkills = <div>This user hasn't set their skills yet</div>
    console.log(avatarUrl)
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

    console.log(this.state.recipientData)
    var userRating = (
      <SimpleRating rating={this.state.recipientData.userRating} />
    )
    console.log(this.props)
    if (this.state.render) {
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
                  Messages
                </Typography>
              </div>
              <MessageTextField {...this.props} />
            </div>
          </div>
        </div>
      )
    } else {
      return <div>Getting the required data!</div>
    }
  }
}

function MessageTextField(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState('')
  const [data, setData] = React.useState([])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const messagesEndRef = useRef(null)

  useEffect(() => {
    updateData()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const updateData = async () => {
    await fetch('/api/get-message' + props.location.search)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data)
      })

    scrollToBottom()
  }

  var signedInUserStyle = {
    justifyContent: 'flex-end',
    display: 'flex',
    marginBottom: '15px',
  }

  var otherUserStyle = {
    justifyContent: 'flex-start',
    display: 'flex',
    marginBottom: '15px',
  }

  var prevSender = ''

  var renderData = (
    <div>
      {data.map((message) => {
        var signedInUserID = props.userData.userID

        var senderID = message.senderID
        var styleToUse = {}

        console.log(senderID)

        if (senderID == signedInUserID) {
          styleToUse = signedInUserStyle
        } else {
          styleToUse = otherUserStyle
        }

        var renderName = (
          <div style={styleToUse}>
            <div
              style={{
                boxSizing: 'border-box',
                color: '#2c2c2c',
                width: 'auto',
              }}
            >
              <div>
                <Typography variant="h6">{message.senderName}</Typography>
              </div>
            </div>
          </div>
        )

        if (prevSender === message.senderName) renderName = <div></div>
        else {
          prevSender = message.senderName
        }
        //backgroundColor: "white"
        return (
          <div>
            {renderName}
            <div style={styleToUse}>
              <div
                style={{
                  boxSizing: 'border-box',
                  color: 'black',
                  backgroundColor: 'white',
                  width: 'auto',
                  padding: '10px',
                  borderRadius: '50px',
                }}
              >
                <Typography variant="subtitle1">{message.body}</Typography>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    var pathname = props.location.pathname
    var recipient = pathname.replace('/send-message/', '')

    const body = new FormData()
    body.append('message', value)
    body.append('recipient', recipient)

    console.log(data)

    fetch('/api/send-message' + props.location.search, {
      method: 'POST',
      body: body,
    }).then(updateData())

    setValue('')
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '600px',
          overflow: 'auto',
          marginBottom: '15px',
        }}
      >
        {renderData}
        <div ref={messagesEndRef} />
      </div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        style={{
          margin: '0px',
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-full-width"
          placeholder="Your message..."
          style={{ width: '100%', margin: '0px', backgroundColor: 'white' }}
          variant="outlined"
          value={value}
          margin="normal"
          onChange={handleChange}
        />
      </form>
    </div>
  )
}

export default AccountProfile
