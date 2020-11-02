import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}))

export default function MenuListComposition(props) {
  let history = useHistory()
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  var avatarUrl = props.userData.avatar

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  const handleLogout = () => {
    fetch('/logout', { method: 'POST' }).then(handleRedirect)
  }

  const handleRedirect = (e) => {
    if (e.status == 200) window.location.href = '/'
    else console.log(e)
  }

  const redirectToProfile = () => {
    history.push('/accountProfile')
  }

  const redirectToAccount = () => {
    history.push('/accountSettings')
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: 'bold' }}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {props.authenticated} &nbsp;
          {/* <AccountCircleIcon /> */}
          <Avatar alt="Remy Sharp" src={avatarUrl} className={classes.small} />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={redirectToProfile}>My Profile</MenuItem>
                    <MenuItem onClick={redirectToAccount}>My Account</MenuItem>
                    <MenuItem
                      onClick={() => {
                        history.push('/messages')
                      }}
                    >
                      My Messages
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  )
}
