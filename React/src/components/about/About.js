import { Typography } from '@material-ui/core'
import React from 'react'
import Base from '../Base'

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
    var data = [
      {
        name: 'Ashrey Ranjit',
        avatar: '/static/images/Ashpic.jpg',
      },
      {
        name: 'Ahmad Sikder',
        avatar: '/static/images/Ahmadpic.jpg',
      },
      {
        name: 'Connor Wilson',
        avatar: '/static/images/connorpic.jpg',
      },
      {
        name: 'Burak Ozturker',
        avatar: '/static/images/burakpic.jpg',
      },
      {
        name: 'Mohamed Maatouk',
        avatar: '/static/images/Mohamedpic.jpg',
      },
    ]

    var renderCards = (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {data.map((person) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '8px',
              }}
            >
              <img src={person.avatar} width="250px" height="250px" />
              <Typography variant="h6">{person.name}</Typography>
            </div>
          )
        })}
      </div>
    )

    return (
      <div
        style={{
          margin: 'auto',
          maxWidth: '1280px',
          display: 'flex',
          height: '800px',
        }}
      >
        <div style={{ margin: 'auto' }}>
          <h2 style={{ textAlign: 'center' }}>Our Team</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {renderCards}
          </div>
        </div>
      </div>
    )
  }
}

export default About
