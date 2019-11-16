import React from 'react';
import { history, withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
/**
 * This function returns a Button to submit the registration form on the register component
 * @namespace
 * @name RegisterButton
 * @property history: if email is valid email and passwords match
 */
export const RegisterButton = withRouter(({ history, ...props }, route) => (
  <Button
    color="primary"
    variant="contained"
    style={{ width: 200 }}
    onClick={() => {
      history.push(props.route);
    }}
  >
    Register
  </Button>
));
