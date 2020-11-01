import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import BasicTextFields from './materialUI/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function FormDialog() {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState('')
  const [validUser, setvalidUser] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', name)
    fetch('/ForgotPassword', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result === 'true') {
          setvalidUser('Password reset email sent to your account!')
        } else setvalidUser('Please enter a valid username')
      })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setvalidUser('')
    setName('')
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Forgot password?
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reset your password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your username and a reset link will be sent to your
            email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Username"
            fullWidth
          />
          <DialogContentText>{validUser}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
