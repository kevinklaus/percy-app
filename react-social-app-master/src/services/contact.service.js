import { apiUrl } from '../constants';
import qs from 'qs';
const axios = require('axios');

/**
 * Service component providing services
 * to manage Contacts and reset their karma.
 * The component uses the axios client to
 * execute API calls and handle responses.
 */
export const contactService = {
  createContact,
  deleteContact,
  editContact,
  resetKarma,
};

/**
 * Function to edit a Contact.
 * Sends a put request including:
 * @param contact {object} - the contact object with modfied properties
 * @param contactid {number} - the id of the contact to edit
 * @returns - response data in case of error
 * @returns - the contact in case of success
 */
function editContact(contact, contactid) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: 'Bearer ' + localStorage.getItem('user'),
    },
  };
  return axios
    .put(apiUrl + 'contacts/' + contactid + '/update', contact, config)
    .then(response => {
      if (response.status !== 200) {
        const error = response;
        return Promise.reject(error);
      }
      return response.data.contact;
    })
    .then(contact => {
      return contact;
    });
}

/**
 * Function to reset the karma of all contacts.
 * Sends a put request containing:
 * @param value {number} - the new karma value for contacts
 * @returns - response data in case of error
 */
function resetKarma(value) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: 'Bearer ' + localStorage.getItem('user'),
    },
  };
  return axios
    .put(apiUrl + 'contacts/karmareset/', { value }, config)
    .then(response => {
      if (response.status !== 200) {
        const error = response;
        return Promise.reject(error);
      }
      return response.data.message;
    });
}

/**
 * Function to create a contact.
 * @param contact {object} - the contact to be created
 * @param id {number} - the identifier of the contact to be created
 * @param token {string} - access token
 * @param history {objecft} - the history stack for navigation
 * @returns - promise rejection in case of error
 * @returns - response data in case of success
 */
function createContact(contact, id, token, history) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: 'Bearer ' + localStorage.getItem('user'),
    },
  };

  contact.id = id;
  contact.access_token = token;

  return axios
    .post(apiUrl + 'contacts/create/', contact, config)
    .then(response => {
      if (response.status !== 200) {
        const error = response;
        return Promise.reject(error);
      }

      return response.data.contact;
    });
}

/**
 * Function to delete a contact.
 * @param id {number} - identifier of the contact to be deleted
 * @returns - promise rejection in case of error
 * @returns - response data in case of success
 */
function deleteContact(id) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('user'),
    },
  };

  return axios
    .delete(apiUrl + 'contacts/' + id + '/', config)
    .then(response => {
      if (response.status !== 200) {
        const error = response;
        return Promise.reject(error);
      }

      return response.data.message;
    });
}
