import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

export default function FallbackAvatar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar src={props.url} className={classes.large} />
    </div>
  );
}