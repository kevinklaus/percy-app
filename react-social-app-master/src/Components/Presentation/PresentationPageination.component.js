import React from 'react';
import Fab from '@material-ui/core/Fab';
import NextIcon from '@material-ui/icons/NavigateNext';
import PrevIcon from '@material-ui/icons/NavigateBefore';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  next: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  prev: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  iconNext: {
    marginRight: theme.spacing(1),
  },
  iconPrev: {
    marginLeft: theme.spacing(1),
  },
}));

function PresentationPageination(props) {
  const classes = useStyles();
  const { history } = props;

  const nextPath = '/presentation/' + props.next;
  const prevPath = '/presentation/' + props.prev;
  
  return (
    <div>
      {!(props.prev === '') && (
        <Fab variant="extended" 
          id="prev-button"
          aria-label="Previous" 
          className={classes.prev} 
          color="secondary"
          onClick={() => history.push(prevPath)}
          elevation={24}
          > 
          <PrevIcon className={classes.prevIcon} />
          {props.prev}
        </Fab>
      )}
      {!(props.next === '') && (
        <Fab variant="extended" 
          id="next-button"
          aria-label="Next" 
          className={classes.next} 
          color="secondary"
          onClick={() => history.push(nextPath)}
          elevation={24}
          >
          {props.next}
          <NextIcon className={classes.nextIcon} />
        </Fab>
      )}
    </div>
  );
};


export default withRouter(PresentationPageination);
