import { apiUrl } from '../constants';
import qs from 'qs';
const axios = require('axios');

/**
 * Service component providing services
 * to manage Users.
 * The component uses the axios client to
 * execute API calls and handle responses.
 */
export const userService = {
  login,
  register,
  logout,
  getUserInfo,
  /* 
  getAll,
  getById,
  update,
  delete: _delete, */
};

/**
 * Function to retrieve user information.
 * @returns 
 */
function getUserInfo() {
  const token = localStorage.getItem('user');
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

/**
 * Function to log a user in.
 * @param username {string}
 * @param password {string}
 */
function login(username, password) {
  console.log(username, password);
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  };

  const body = qs.stringify({
    username: username,
    password: password,
  });

  return axios
    .post(apiUrl + 'accounts/login/', body, config)
    .then(response => {
      console.log('r', response);
      if (response.status != 200) {
        const error = response;
        return Promise.reject(error);
      }

      return response.data.token;
    })
    .then(token => {
      console.log(token);
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', token);

      return token;
    });
}

/**
 * Function to register a user.
 * @param user {object}
 */
function register(user) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  };

  const body = qs.stringify(user);

  return axios
    .post(apiUrl + 'accounts/register/', body, config)
    .then(response => {
      console.log('r', response);
      if (response.status != 200) {
        const error = response;
        return Promise.reject(error);
      }

      return login(user.username, user.password);
    })
    .then(token => {
      console.log(token);
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(token));

      return token;
    });
}

/**
 * Function to log a user out.
 * @param history {object}
 */
function logout(history) {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  history.push('/login');
}

/*



function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
 */
