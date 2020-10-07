import React from 'react'
import BannerMessageController from './materialUI/BannerMessageController'

/**
 * Button to apply for tasks
 * @param data Data about the task
 * @param callBack Api method to call when submitting request
 */
export class ApplyButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bannerMessage: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    const data = new FormData(event.target)

    // Mark the selected task as applied for by the user.
    fetch('/apply_for_task', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === 'true')
          this.setState({ bannerMessage: 'Sucessfully applied for task!' })
        else
          this.setState({ bannerMessage: 'Please sign in to apply for tasks!' })
      })

    this.props.updateRender()
  }

  render() {
    let render

    if (this.props.data.isRegistered)
      render = (
        <div style={{ color: 'green' }}>
          <BannerMessageController bannerMessage={this.state.bannerMessage} />
          You have already applied!
        </div>
      )
    else
      render = (
        <div>
          <form onSubmit={this.handleSubmit} className="button">
            <input type="hidden" value={this.props.data.id} name="id" />
            <input type="submit" value="Apply for Task" />
          </form>
        </div>
      )

    return render
  }
}
