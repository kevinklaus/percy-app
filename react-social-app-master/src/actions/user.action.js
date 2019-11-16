import { userService } from '../services/user.service';
import { notifyActions } from './notify.action';
import { fetchGroupsIfNeeded } from './groups.action';
import { fetchContactsIfNeeded } from './contacts.action';

/**
 * Action creators and functions handling everything happening to users.
 * @namespace
 * @name userActions
 */
export const userActions = {
  login,
  logout,
  register,
};

/**
 * @memberof userActions
 * @constant
 * @type {string}
 * @default
 */
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
/**
 * Action creator to be called on login request
 * @memberof userActions
 * @name userActions.requestLogin
 * @param {object} user the user to login
 * @returns {object} action
 * @property {string} action.type
 * @property {object} action.user
 */
function requestLogin(user) {
  return { type: LOGIN_REQUEST, user };
}

/**
 * @memberof userActions
 * @constant
 * @type {string}
 * @default
 */
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
/**
 * Action creator to be called on login success
 * @memberof userActions
 * @name userActions.loginSuccess
 * @param {string} token the token containing user info
 * @returns {object} action
 * @property {string} action.type
 * @property {string} action.token
 */
function loginSuccess(token) {
  return { type: LOGIN_SUCCESS, token: token };
}

/**
 * @memberof userActions
 * @constant
 * @type {string}
 * @default
 */
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
/**
 * Action creator to be called on login failure
 * @memberof userActions
 * @name userActions.loginFailure
 * @param {object} error error object returned from server
 * @returns {object} action
 * @property {string} action.type
 * @property {object} action.error
 */
function loginFailure(error) {
  return { type: LOGIN_FAILURE, error };
}

/**
 * function to handle login process
 * @memberof userActions
 * @name userActions.login
 * @param {string} username
 * @param {string} password
 * @param {object} history object for navigation
 */
function login(username, password, history) {
  return dispatch => {
    dispatch(requestLogin({ username }));

    userService.login(username, password).then(
      token => {
        dispatch(loginSuccess(token));
        dispatch(fetchGroupsIfNeeded());
        dispatch(fetchContactsIfNeeded());
        history.push('/');
      },
      error => {
        dispatch(loginFailure(error));
        dispatch(notifyActions.error(error));
      }
    );
  };
}

/**
 * @memberof userActions
 * @constant
 * @type {string}
 * @default
 */
export const LOGOUT = 'LOGOUT';
/**
 * Action creator to be called on logout
 * @memberof userActions
 * @name userActions.logout
 * @param {object} history object for navigation
 * @returns {object} action
 * @property {string} action.type
 */
function logout(history) {
  userService.logout(history);
  return { type: LOGOUT };
}

/**
 * @memberof userActions
 * @constant
 * @type {string}
 * @default
 */
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
/**
 * Action creator to be called on register request
 * @memberof userActions
 * @name userActions.requestRegister
 * @param {object} user object containing all register information
 * @returns {object} action
 * @property {string} action.type
 * @property {object} action.user
 */
function requestRegister(user) {
  return { type: REGISTER_REQUEST, user };
}

/**
 * @memberof userActions
 * @constant
 * @type {string}
 * @default
 */
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
/**
 * Action creator to be called on register success
 * @memberof userActions
 * @name userActions.registerSuccess
 * @param {string} token the login token received from server
 * @returns {object} action
 * @property {string} action.type
 * @property {string} action.token
 */
function registerSuccess(token) {
  return { type: REGISTER_SUCCESS, token: token };
}

/**
 * @memberof userActions
 * @constant
 * @type {string}
 * @default
 */
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
/**
 * Action creator to be called on register failure
 * @memberof userActions
 * @name userActions.registerFailure
 * @param {object} error object containing error from server
 * @returns {object} action
 * @property {string} action.type
 * @property {object} action.error
 */
function registerFailure(error) {
  return { type: REGISTER_FAILURE, error };
}

/**
 * function to handle register process
 * @memberof userActions
 * @name userActions.register
 * @param {object} user object containing user info for sign up
 * @param {object} history object for navigation
 */
function register(user, history) {
  return dispatch => {
    dispatch(requestRegister(user));

    userService.register(user).then(
      u => {
        dispatch(registerSuccess());
        dispatch(notifyActions.success('Registration successful'));
        userService.login(user.username, user.password).then(token => {
          dispatch(loginSuccess(token));
          history.push('/onboarding');
        });
      },
      error => {
        dispatch(registerFailure(error));
        dispatch(notifyActions.error(error));
      }
    );
  };
}
