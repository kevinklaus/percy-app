import React from 'react';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { SnackbarContent } from '@material-ui/core';
import { connect } from 'react-redux';
import { notifyActions } from '../../actions/notify.action';

/**
 * This component is used to render an error message. The message to be displayed
 * is taken from redux state. Component is shown when error message exists in state. * 
 */
class ErrorSnackbar extends React.Component {
  open = false;

  render() {
    return (
      <Snackbar
        autoHideDuration={6000}
        open={this.props.error ? true : false}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <SnackbarContent
          aria-describedby="client-snackbar"
          style={{ backgroundColor: '#d32f2f' }}
          message={
            <span id="client-snackbar">
              <ErrorIcon /> {this.props.error}
            </span>
          }
          action={[
            <IconButton
              onClick={() => this.props.dispatch(notifyActions.clear())}
              key="close"
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.error,
  };
}

export default connect(mapStateToProps)(ErrorSnackbar);
