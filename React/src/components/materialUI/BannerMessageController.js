import { ConsoleSqlOutlined } from '@ant-design/icons'
import React from 'react'
import Base from '../Base'
import BannerMessage from '../materialUI/BannerMessage'
import TaskManager from '../tasks/TaskManager'

/**
 * @param bannerMessage If banner message is not empty it will be displayed
 */
export default class BannerMessageController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bannerMessage: '',
    }
    this.updateBannerMessage = this.updateBannerMessage.bind(this)
  }

  updateBannerMessage(textToDisplay) {
    this.setState({ bannerMessage: textToDisplay })
  }

  render() {

    // Check if banner message supplied is coming from React Router Redirect
    if ('location' in this.props) {
      if (
        this.props.location.state != null &&
        'bannerMessage' in this.props.location.state &&
        this.props.location.state.bannerMessage !== this.state.bannerMessage
      ) {
        this.updateBannerMessage(this.props.location.state.bannerMessage)
      }
    }

    // Otherwise check if there is a bannerMessage prop
    else {
      if ('bannerMessage' in this.props && this.props.bannerMessage !== this.state.bannerMessage) {
        this.updateBannerMessage(this.props.bannerMessage)
      }
    }

    return <BannerMessage bannerMessage={this.state.bannerMessage} />
  }
}
