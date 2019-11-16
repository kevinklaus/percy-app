import React from 'react';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/GroupAdd';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

/**
 * Button Component for group creation
 * @namespace
 * @name CreateGroupFab
 */
function CreateGroupFab(props) {
  const classes = useStyles();
  const { match, location, history } = props;

  return (
    <Zoom
      in={true}
      timeout={1000}
      style={{
        transitionDelay: '1000ms',
      }}
      unmountOnExit
    >
      <Fab
        variant="extended"
        aria-label="Add"
        className={classes.fab}
        color="secondary"
        onClick={() => history.push('/groups/create')}
        elevation={24}
      >
        <AddIcon className={classes.icon} />
        Create Group
      </Fab>
    </Zoom>
  );
}

export default withRouter(CreateGroupFab);
