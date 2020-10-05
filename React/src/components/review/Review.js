import React from 'react'
import Base from '../Base'
import { Redirect } from 'react-router-dom'

// function Review(props) {
//     return (
//         <div>
//             <Base authenticated={props.authenticated}> </Base>
//         <Main></Main>
//         {this.props.location}
//         </div>
//     )
// }

class Review extends React.Component {
  render() {
    console.log(this.props.location.state.data)
    return (
      <div>
        <Base authenticated={this.props.authenticated}> </Base>
        <Main data={this.props.location.state.data}></Main>
      </div>
    )
  }
}

class Main extends React.Component {
  render() {
    return (
      <div>
        <ReviewForm data={this.props.data}></ReviewForm>
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
    data.append('userID', this.props.data.selectedUserID)

    fetch('/rateUser', {
      method: 'POST',
      body: data,
    })

    this.setState({ redirect: true })
  }

  render() {
    let render

    if (this.state.redirect) render = <Redirect to="/" />
    else
      render = (
        <div>
          <h2>Please rate {this.props.data.selectedUsername}</h2>
          <form onSubmit={this.handleClick} method="POST" class="rate">
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="5"></label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="4"></label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="3"></label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="2"></label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="1"></label>
            <input
              type="radio"
              id="star0"
              name="rate"
              value="0"
              checked="checked"
            />
            <input type="submit" id="sub" value="Submit" />
          </form>
        </div>
      )

    return render
  }
}

export default Review
