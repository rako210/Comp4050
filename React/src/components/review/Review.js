import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Base from '../Base';
import './Review.css';

class Review extends React.Component {
  render() {
    return (
      <div>
        <Base {...this.props} />
        <ReviewForm {...this.props} />
      </div>
    )
  }
}

class ReviewForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()

    const data = new FormData(event.target)
    data.append('userID', this.props.location.state.data.selectedUserID)

    fetch('/rateUser', {
      method: 'POST',
      body: data,
    })

    this.setState({ redirect: true })
  }

  render() {
    let render

    if ('state' in this.props.location && this.props.location.state != null) {
      if (this.state.redirect) {
        render = <Redirect to="/" />
      } else
        render = (
          <div>
            <Container maxWidth="lg" style={{display: 'flex'}}>
              <Box style={{margin: 'auto', display: 'flex', flexDirection: 'column'}}>
                <h2>
                  Please rate {this.props.location.state.data.selectedUsername}
                </h2>
                <form
                  onSubmit={this.handleClick}
                  method="POST"
                  className="rate"
                >
                  <input type="radio" id="star5" name="rate" value="5" />
                  <label htmlFor="star5" title="5"></label>
                  <input type="radio" id="star4" name="rate" value="4" />
                  <label htmlFor="star4" title="4"></label>
                  <input type="radio" id="star3" name="rate" value="3" />
                  <label htmlFor="star3" title="3"></label>
                  <input type="radio" id="star2" name="rate" value="2" />
                  <label htmlFor="star2" title="2"></label>
                  <input type="radio" id="star1" name="rate" value="1" />
                  <label htmlFor="star1" title="1"></label>
                  <input
                    type="radio"
                    id="star0"
                    name="rate"
                    value="0"
                    defaultChecked="checked"
                  />
                  <input style={{display: 'block'}} type="submit" id="sub" value="Submit" />
                </form>
              </Box>
            </Container>
          </div>
        )
    } else {
      render = <div>No User Selected to Review!</div>
    }

    return render
  }
}

export default Review
