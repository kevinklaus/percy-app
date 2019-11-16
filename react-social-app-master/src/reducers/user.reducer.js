import { LOGIN_SUCCESS, REGISTER_SUCCESS } from '../actions/user.action';
import { RECEIVE_GAPI_TOKEN } from '../actions/groups.action';

/**
 * This reducer function takes the current application state and
 * handles the actions related to a user
 * then returns the next application state
 * @name userReducer
 * @param {Object} state current application state
 * @param {Object} action what happened? - handeled action type:
 * LOGIN_SUCCESS, REGISTER_SUCCESS, RECEIVE_GAPI_TOKEN
 * @returns {Object} new application state
 */
export default function(state, action) {
  if (action.type === LOGIN_SUCCESS) {
    return { ...state, token: action.token };
  } else if (action.type === REGISTER_SUCCESS) {
    return { ...state, token: action.token };
  } else if (action.type === RECEIVE_GAPI_TOKEN) {
    return { ...state, gapiToken: action.token };
  } else {
    return { ...state, userLoggedIn: false };
  }
}
