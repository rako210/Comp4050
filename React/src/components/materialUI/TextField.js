import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { Component } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      backgroundColor: 'white',
    },
  },
}))

export default function BasicTextFields(props) {
  const classes = useStyles()

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Field {...props} />
    </form>
  )
}

class Field extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }
  render() {

    var properties = {type: 'text'};
    if('type' in this.props)
        properties = {...properties, type: this.props.type}

    return (
      <TextField
        type="text"
        fullWidth
        name={this.props.label.toString().toLowerCase()}
        label={this.props.label}
        variant="outlined"
        value={this.state.value}
        onChange={(event) => {
          this.setState({ value: event.target.value })
          this.props.callBack({ [event.target.name]: event.target.value })
        }}
        {...properties}
      />
    )
  }
}
