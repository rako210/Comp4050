import React from 'react'
import Base from '../Base'

function AccountSettings(props) {
  return (
    <div>
      <Base {...props} />
      <FormValidatePassword {...props} />
    </div>
  )
}

class FormValidatePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '', validPassword: 'False', bannerMessage: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = new FormData(event.target)

    fetch('/pwordCheck', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'True') this.setState({ validPassword: 'True' })
      })

    this.setState({ bannerMessage: 'Wrong Password' })
  }

  render() {
    let retVal

    if (this.state.validPassword === 'True') {
      retVal = (
        <div>
          <FormUpdateAccount {...this.props} />
        </div>
      )
    } else {
      retVal = (
        <div>
          <h2>Verify password to access settings</h2>
          <h2>{this.state.bannerMessage}</h2>
          <form onSubmit={this.handleSubmit} className="poster1">
            Password:{' '}
            <input
              type="text"
              name="password"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <br />
            <input type="submit" value="Verify" />
          </form>
        </div>
      )
    }

    return <div>{retVal}</div>
  }
}

class FormUpdateAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '', validPassword: 'False', bannerMessage: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    console.log(event.target)
    const data = new FormData(event.target)

    fetch('/updateAccount', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'True')
          this.setState({
            validPassword: 'True',
            bannerMessage: data.bannerMessage
          })
        else
          this.setState({
            bannerMessage: data.bannerMessage
          })
      })
  }

  render() {
    return (
      <div>
        <h2>Update your details</h2>
        <h2>{this.state.bannerMessage}</h2>
        <form onSubmit={this.handleSubmit} className="poster1">
          Email Address:{' '}
          <input
            type="text"
            name="email"
            defaultValue={this.props.userData.email}
          />
          <br />
          Password: <input type="text" name="pword" />
          <br />
          Suburb:{' '}
          <input
            type="text"
            name="suburb"
            defaultValue={this.props.userData.suburb}
          />
          <br />
          Name:{' '}
          <input
            type="text"
            name="name"
            defaultValue={this.props.userData.name}
          />
          <br />
          Avatar:{' '}
          <input
            type="file"
            name="image"
            defaultValue={this.props.userData.avatar}
          />
          <br />
          <input type="submit" value="Update Details" />
        </form>
      </div>
    )
  }
}

export default AccountSettings
