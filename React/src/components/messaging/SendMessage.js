import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useRef } from 'react'
import Base from '../Base'
import AccountProfile from './AccountProfile'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

export default class SendMessage extends React.Component {
  render() {
    return (
      <div>
        <Base {...this.props} />
        <AccountProfile {...this.props} />
      </div>
    )
  }
}

function MessageTextField(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState('')
  const [data, setData] = React.useState([])
  const [time, setTime] = React.useState(Date.now())

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const messagesEndRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => updateData(), 1000)
    return () => {
      clearInterval(interval)
    }
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
    <div style={{ width: '600px', margin: 'auto' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '800px',
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
