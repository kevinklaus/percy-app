import { apiUrl } from '../constants';
import qs from 'qs';
const axios = require('axios');

/**
 * Service component providing services
 * to manage Groups.
 * The component uses the axios client to
 * execute API calls and handle responses.
 */
export const groupService = {
  editGroup,
  createGroup,
  deleteGroup,
};

/**
 * Function to edit a group.
 * @param group {object} - the group to edit
 * @param oldName {string} - old name of the group
 * @returns - promise rejection in case of error
 * @returns - response data and group in case of success
 */
function editGroup(group, oldName) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: 'Bearer ' + localStorage.getItem('user'),
    },
  };

  return axios
    .put(apiUrl + 'groups/' + oldName + '/update', group, config)
    .then(response => {
      if (response.status !== 200) {
        const error = response;
        return Promise.reject(error);
      }

      return response.data.group;
    })
    .then(group => {
      console.log(group);

      return group;
    });
}

/**
 * Function to create a group.
 * @param group {object} - group object to ceate
 * @returns - promise rejection in case of error
 * @returns - response data and group in case of success
 */
function createGroup(group) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: 'Bearer ' + localStorage.getItem('user'),
    },
  };

  return axios
    .post(apiUrl + 'groups/' + group.name + '/', group, config)
    .then(response => {
      if (response.status !== 200) {
        const error = response;
        return Promise.reject(error);
      }

      return response.data.group;
    })
    .then(group => {
      console.log(group);

      return group;
    });
}

/**
 * Function to delete a group.
 * @param name {string} - name of the group to delete
 * @returns - promise rejection in case of error
 * @returns - response data in case of success
 */
function deleteGroup(name) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('user'),
    },
  };

  return axios
    .delete(apiUrl + 'groups/' + name.toLowerCase() + '/', config)
    .then(response => {
      if (response.status !== 200) {
        const error = response;
        return Promise.reject(error);
      }

      return response.data.message;
    })
    .then(() => {
      return;
    });
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
