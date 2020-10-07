import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

/**
 * Banner Message
 * @param props.message message to be displayed in banner
 */
export default function BannerMessage(props) {
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  var bannerMessage = 'Please provide a bannerMessage prop!'
  var render = <div></div>

  if ('bannerMessage' in props && props.bannerMessage !== '') {
    bannerMessage = props.bannerMessage
    render = (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={bannerMessage}
          action={
            <React.Fragment>
              {/* <Button color="secondary" size="small" onClick={handleClose}>
            UNDO
          </Button> */}
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    )
  }

  return render
}
