/**
 * Action creators and functions handling everything happening to groups.
 * @namespace contactsActions
 */
import db from '../database/localDB';
import axios from 'axios';
import { apiUrl } from '../constants';
import { notifyActions } from './notify.action';
import { contactService } from '../services/contact.service';
import { demoActions } from './demo.actions';
import { groupsActions } from './groups.action';

/**
 * @memberof contactsActions
 * @constant
 * @default
 * @type {string}
 */
export const REQUEST_CONTACTS = 'REQUEST_CONTACTS';
/**
 * Action creator to be started when request contacts started
 * @memberof contactsActions
 * @name contactsActions.requestContacts
 * @returns {object} action object containing type
 */
function requestContacts() {
  return {
    type: REQUEST_CONTACTS,
  };
}

/**
 * @memberof contactsActions
 * @constant
 * @type {string}
 * @default
 */
export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS';
/**
 * Action creator to be started when contacts were received from backend
 * @memberof contactsActions
 * @name contactsActions.receiveContacts
 * @param {array} contacts the contacts received from backend
 * @returns {object} action object containing type, array of contacts and date of receive
 */
function receiveContacts(contacts) {
  return {
    type: RECEIVE_CONTACTS,
    contacts,
    receivedAt: Date.now(),
  };
}

/**
 * @memberof contactsActions
 * @constant
 * @type {string}
 * @default
 */
export const REQUEST_CREATE_CONTACT = 'REQUEST_CREATE_CONTACT';
/**
 * Action creator to be started when create contact request started
 * @memberof contactsActions
 * @name contactsActions.requestCreateContact
 * @returns {object} action object containing type
 */
function requestCreateContact() {
  return {
    type: REQUEST_CREATE_CONTACT,
  };
}

/**
 * @memberof contactsActions
 * @constant
 * @type {string}
 * @default
 */
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
/**
 * Action creator to be started when create contact succeeded
 * @memberof contactsActions
 * @name contactsActions.createContactSuccess
 * @param {object} contact the just created contact returned from backend
 * @returns {object} action object containing type and contact
 */
function createContactSuccess(contact) {
  return {
    type: CREATE_CONTACT_SUCCESS,
    contact,
  };
}

/**
 * @memberof contactsActions
 * @constant
 * @type {string}
 * @default
 */
export const CREATE_CONTACT_FAILURE = 'CREATE_CONTACT_FAILURE';
/**
 * Action creator to be started when create contact failed
 * @memberof contactsActions
 * @name contactsActions.createContactFailure
 * @returns {object} action object containing type
 */
function createContactFailure() {
  return {
    type: CREATE_CONTACT_FAILURE,
  };
}

/**
 * @memberof contactsActions
 * @constant
 * @type {string}
 * @default
 */
export const REQUEST_DELETE_CONTACT = 'REQUEST_DELETE_CONTACT';
/**
 * Action creator to be started when request delete contact started
 * @memberof contactsActions
 * @name contactsActions.requestDeleteContact
 * @returns {object} action object containing type
 */
function requestDeleteContact() {
  return {
    type: REQUEST_DELETE_CONTACT,
  };
}

/**
 * @memberof contactsActions
 * @constant
 * @type {string}
 * @default
 */
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
/**
 * Action creator to be started when delete contact succeded
 * @memberof contactsActions
 * @name contactsActions.deleteContactSuccess
 * @param {string} contactid The id of deleted contact
 * @returns {object} action object containing type and id
 */
function deleteContactSuccess(contactid) {
  return {
    type: DELETE_CONTACT_SUCCESS,
    contactid,
  };
}

/**
 * @memberof contactsActions
 * @constant
 * @type {string}
 * @default
 */
export const EDIT_CONTACT_SUCCESS = 'EDIT_CONTACT_SUCCESS';
/**
 * Action creator to be started when edit contact succeeded
 * @memberof contactsActions
 * @name contactsActions.editContactSuccess
 * @param {object} contact the contact returned from backend
 * @returns {object} action object containing type and contact
 */
function editContactSuccess(contact) {
  return {
    type: EDIT_CONTACT_SUCCESS,
    contact,
  };
}

/**
 * @memberof contactsActions
 * @constant
 * @type {string}
 * @default
 */
export const DELETE_CONTACT_FAILURE = 'DELETE_CONTACT_FAILURE';
/**
 * Action creator to be started when delete contact failed
 * @memberof contactsActions
 * @name contactsActions.deleteContactFailure
 * @returns {object} action object containing type
 */
function deleteContactFailure() {
  return {
    type: DELETE_CONTACT_FAILURE,
  };
}

/**
 * Dispatches action creators for creating contact and calls contactService.createContact
 * @memberof contactsActions
 * @name contactsActions.createContact
 * @param {object} contact an object containing all information for contact to be created
 * @param {string} id the contactID of the google contact, used to obtain photo
 * @param {object}  history the react-router history to navigate after action finished
 * @param {string} gapiToken the authentication token of google api used to obtain contact infos
 * @param {boolean} noPush if true, navigation back to dashboard will not happen
 * @param {function} [callback] optional callback function to be called after contact create succeeded
 * @returns {function} dispatching actions and making calls to backend
 */
export function createContact(
  contact,
  id,
  history,
  gapiToken,
  noPush,
  callback
) {
  return dispatch => {
    dispatch(requestCreateContact());
    contactService.createContact(contact, id, gapiToken, history).then(
      c => {
        dispatch(createContactSuccess(c));
        dispatch(fetchContacts());
        if (!noPush) {
          history.push('/');
        }
        if (callback) {
          callback();
        }
      },
      error => {
        dispatch(createContactFailure(error));
        dispatch(notifyActions.error(error));
      }
    );
  };
}

/**
 * Will produce a request to edit an existing contact
 * @memberof contactsActions
 * @name contactsActions.editContact
 * @param {object} contact an object containing only information to be changed (e.g. {firstName: Newfirst} would be enough)
 * @param {number}  id the id of the contact to be updated
 * @param {function} [callback] optional callback function to be called on success
 * @returns {function} dispatching actions and making calls to backend
 */
export function editContact(contact, id, callback) {
  return (dispatch, getState) => {
    contactService.editContact(contact, id).then(
      c => {
        dispatch(editContactSuccess(c));
        if (callback) {
          callback();
        }
        const groups = getState().groups;
        const contacts = getState().contacts;

        if (groups && contact.karma) {
          const group = contacts.find(con => con.id === id).group;
          dispatch(
            groupsActions.calculateGroupKarma(
              contacts,
              groups.find(g => g.name === group)
            )
          );
        }
      },
      error => {
        dispatch(notifyActions.error(error));
      }
    );
  };
}

/**
 * Will attempt to reset karma of all contacts to given value
 * @memberof contactsActions
 * @name contactsActions.resetKarma
 * @param {object} [group] if present, group karma will only be calculated for specified group after karma reset
 * @param {number}  value float number between 0 and 1 - the new karma value
 * @returns {function} dispatching actions and making calls to backend
 */
export function resetKarma(value, group) {
  return (dispatch, getState) => {
    contactService.resetKarma(value).then(
      message => {
        dispatch(demoActions.resetKarmaSuccess(value));
        if (group) {
          dispatch(
            groupsActions.calculateGroupKarma(getState().contacts, group)
          );
        } else {
          const groups = getState().groups;
          if (groups) {
            groups.forEach(group => {
              dispatch(
                groupsActions.calculateGroupKarma(getState().contacts, group)
              );
            });
          }
        }
      },
      error => {
        dispatch(notifyActions.error(error));
      }
    );
  };
}

/**
 * Will produce a request to delete an existing contact
 * @memberof contactsActions
 * @name contactsActions.deleteContact
 * @param {number}  id the id of the contact to be updated
 * @param {object} history the react-router history to navigate to dashboard after success
 * @returns {function} dispatching actions and making calls to backend
 */
export function deleteContact(id, history) {
  return (dispatch, getState) => {
    dispatch(requestDeleteContact());
    contactService.deleteContact(id).then(
      () => {
        const groups = getState().groups;
        const contacts = getState().contacts;

        if (groups) {
          const group = contacts.find(con => con.id === id).group;
          dispatch(
            groupsActions.calculateGroupKarma(
              contacts,
              groups.find(g => g.name === group)
            )
          );
        }
        dispatch(deleteContactSuccess(id));
        dispatch(fetchContacts());

        history.push('/');
      },
      error => {
        dispatch(deleteContactFailure(error));
        dispatch(notifyActions.error(error));
      }
    );
  };
}

/**
 * Will produce a request to fetch contacts from backend
 * @memberof contactsActions
 * @name contactsActions.fetchContacts
 * @returns {function} dispatching actions and making calls to backend
 */
function fetchContacts() {
  return dispatch => {
    let localContacts;
    dispatch(requestContacts());
    if (navigator.onLine) {
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('user'),
        },
      };

      return axios
        .get(apiUrl + 'contacts/', config)
        .then(response => response.data)
        .then(data => dispatch(receiveContacts(data)))
        .catch(err =>
          db.contacts
            .toArray(value => (localContacts = value))
            .then(() => dispatch(receiveContacts(localContacts)))
        );
    } else {
      return db.contacts
        .toArray(value => (localContacts = value))
        .then(() => dispatch(receiveContacts(localContacts)));
    }
  };
}

/**
 * Will determine if contacts should fetch
 * @memberof contactsActions
 * @name contactsActions.shouldFetchContacts
 * @param {object} state the redux state
 * @returns {boolean} if contacts should be fetched
 */
function shouldFetchContacts(state) {
  const contacts = state.contacts;
  if (contacts.length === 0) {
    return true;
  } else if (contacts.isFetching) {
    return false;
  } else {
    return contacts.didInvalidate;
  }
}

/**
 * Will check if contacts should be fetched and then call fetchContacts
 * @memberof contactsActions
 * @name contactsActions.fetchContactsIfNeeded
 * @returns {function} calling dispatch or resolving promise
 */
export function fetchContactsIfNeeded() {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchContacts(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchContacts());
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}
