import React from 'react'
import Base from '../Base'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})
class About extends React.Component {
  render() {
    return (
      <div>
        <Base {...this.props}></Base>
        <Main></Main>
      </div>
    )
  }
}

class Main extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div className="about-section">
              <h1>About Us Page</h1>
              <p>Some text about who we are and what we do.</p>
              <p>
                Resize the browser window to see that this page is responsive by
                the way.
              </p>
            </div>
            <h2 style={{ textAlign: 'center' }}>Our Team</h2>
          </Grid>
        </Grid>
        <Grid item lg={10}>
          <div className="column">
            <div className="card">
              <img
                src="/static/images/Ashpic.jpg"
                alt="Ashrey"
                style={{ width: '100%' }}
              />
              <div className="container" style={{ width: '100%' }}>
                <h2>Ashrey Ranjit</h2>
                <p className="title">Staff</p>
                <p>Hi I am ASHREY RANJIT</p>
                <p>ashrey.ranjit@students.mq.edu.au</p>
                <p>
                  <button className="about_button" style={{ width: '90%' }}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={10}>
          <div className="column">
            <div className="card">
              <img
                src="/static/images/Ahmadpic.jpg"
                alt="Ahmad"
                style={{ width: '100%' }}
              />
              <div className="container" style={{ width: '100%' }}>
                <h2>Ahmad Sikder</h2>
                <p className="title">staff</p>
                <p>I am Ahmad</p>
                <p>Ahmad.sikder@students.mq.edu.au</p>
                <p>
                  <button className="about_button" style={{ width: '90%' }}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={10}>
          <div className="column">
            <div className="card">
              <img
                src="/static/images/connorpic.jpg"
                alt="Conor"
                style={{ width: '100%' }}
              />
              <div className="container" style={{ width: '100%' }}>
                <h2>Connor Wilson</h2>
                <p className="title">Staff</p>
                <p>I am connor</p>
                <p>conor.wilson@students.mq.edu.au</p>

                <p>
                  <button className="about_button" style={{ width: '90%' }}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={10}>
          <div className="column">
            <div className="card">
              <img
                src="/static/images/burakpic.jpg"
                alt="Burak"
                style={{ width: '100%' }}
              />
              <div className="container" style={{ width: '100%' }}>
                <h2>Burak Ozturker</h2>
                <p className="title">Staff</p>
                <p>Hi I AM BURAK</p>
                <p>burak.Ozturker@students.mq.edu.au</p>
                <p>
                  <button className="about_button" style={{ width: '90%' }}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item lg={10}>
          <div className="column">
            <div className="card">
              <img
                src="/static/images/Mohamedpic.jpg"
                alt="Mohamed"
                style={{ width: '100%' }}
              />{' '}
              <div className="container" style={{ width: '100%' }}>
                <h2>Mohamed Maatouk</h2>
                <p className="title">Staff</p>
                <p>Hi I AM MOHAMED</p>
                <p>Mohamed.Maatouk@students.mq.edu.au</p>
                <p>
                  <button className="about_button" style={{ width: '90%' }}>
                    Contact
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    )
  }
}
Main.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(About)
