import React from 'react'
import BannerMessage from '../materialUI/BannerMessage'

/**
 * @param bannerMessage If banner message is not empty it will be displayed
 */
export default class BannerMessageController extends React.Component {
  render() {
    var bannerMessage = ''

    // Check if banner message supplied is coming from React Router Redirect
    if ('location' in this.props) {
      if (
        this.props.location.state != null &&
        'bannerMessage' in this.props.location.state &&
        this.props.location.state.bannerMessage !== bannerMessage
      ) {
        bannerMessage = this.props.location.state.bannerMessage
      }
    }

    // Otherwise check if there is a bannerMessage prop
    else {
      if (
        'bannerMessage' in this.props &&
        this.props.bannerMessage !== bannerMessage
      ) {
        bannerMessage = this.props.bannerMessage
      }
    }

    return <BannerMessage bannerMessage={bannerMessage} />
  }
}
