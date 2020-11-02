import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Base from '../Base'
import FallbackAvatar from '../materialUI/FallBackAvatar'
import './ViewMessage.css'

export default class ViewMessage extends React.Component {
  render() {
    return (
      <div>
        <Base {...this.props} />
        <div style={{ width: '500px', margin: 'auto' }}>
          <MessageBox />
        </div>
      </div>
    )
  }
}

class MessageBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      seconds: 0,
    }
  }

  tick() {
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }))
  }

  componentDidMount() {
    var updateMessageList = async () => {
      await fetch('/api/messages')
        .then((res) => res.json())
        .then((res) => this.setState({ data: res.data }))
    }

    this.interval = setInterval(() => updateMessageList(), 1000)
  }

  render() {
    var renderMessages = (
      <div>
        {this.state.data.map((message) => {
          return <MessageCard data={message} />
        })}
      </div>
    )

    return renderMessages
  }
}

function MessageCard(props) {
  const history = useHistory()

  var handleClick = (event) => {
    event.preventDefault()

    console.log(props.data)

    history.push({
      pathname: '/send-message/',
      search: '?username=' + props.data.username,
    })
  }

  return (
    <div className="messageContainer" onClick={handleClick}>
      <div className="messageAvatar">
        <FallbackAvatar url={props.data.avatar} />
      </div>
      <div className="messageContent">
        <div className="centered">
          <Typography variant="h6" gutterBottom>
            {props.data.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {props.data.body} ‧ {props.data.mostRecentMessageTime}
          </Typography>
        </div>
      </div>
    </div>
  )
}
