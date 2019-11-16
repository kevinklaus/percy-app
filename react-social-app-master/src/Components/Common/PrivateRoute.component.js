import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * Component for handling routes This function lists the members of a group and matches the contact image 
 * @namespace 
 * @name PrivateRoute
 */
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('user') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
