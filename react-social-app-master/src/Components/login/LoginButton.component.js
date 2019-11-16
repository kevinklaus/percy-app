import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

/**
 * Login button for the login form
 * of the Login component
 * @namespace
 * @name LoginButton
 */
export const LoginButton = withRouter(({ history, ...props }, route) => (
  <Button
    color="primary"
    variant="contained"
    style={{ width: 150 }}
    onClick={() => {
      // if Login and Password are correct:
      history.push(props.route);
    }}
  >
    {props.text}
  </Button>
));
