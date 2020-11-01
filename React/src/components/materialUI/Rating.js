import Box from '@material-ui/core/Box'
import Rating from '@material-ui/lab/Rating'
import React from 'react'

export default function SimpleRating(props) {
  const [value, setValue] = React.useState(props.rating)

  return (
    <div>
      <Box borderColor="transparent">
        <Rating name="read-only" value={value} precision={0.5} readOnly />
      </Box>
    </div>
  )
}
