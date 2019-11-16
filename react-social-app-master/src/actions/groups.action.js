import db from '../database/localDB';

import axios from 'axios';
import { apiUrl } from '../constants';
import { groupService } from '../services/group.service';
import { notifyActions } from './notify.action';
import { showModal } from './modal.actions';
import { fetchContactsIfNeeded } from './contacts.action';

/**
 * Action creators and functions handling everything happening to groups.
 * @namespace
 * @name groupsActions
 */
export const groupsActions = {
  fetchGroups,
  shouldFetchGroups,
  editGroup,
  deleteGroup,
  calculateGroupKarma,
};

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const REQUEST_GROUPS = 'REQUEST_GROUPS';
/**
 * Action creator called when requesting groups was started
 * @memberof groupsActions
 * @name groupsActions.requestGroups
 * @returns {Object} action
 * @property {string} action.type
 */
function requestGroups() {
  return {
    type: REQUEST_GROUPS,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';
/**
 * Action creator to be called when groups were receive from backend
 * @memberof groupsActions
 * @name groupsActions.receiveGroups
 * @param {array} groups the groups returned from backend
 * @returns {Object} action
 * @property {string} action.type
 */
function receiveGroups(groups) {
  return {
    type: RECEIVE_GROUPS,
    groups,
    receivedAt: Date.now(),
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const INVALIDATE_GROUP = 'INVALIDATE_GROUP';
/**
 * Action creator to be called when groups invalidate and need to be refetched
 * @memberof groupsActions
 * @name groupsActions.invalidateGroup
 * @param {object} group the group which invalidated
 * @returns {Object} action
 * @property {string} action.type
 * @property {object} action.group
 */
export function invalidateGroup(group) {
  return {
    type: INVALIDATE_GROUP,
    group,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const REQUEST_EDIT_GROUP = 'REQUEST_EDIT_GROUP';
/**
 * Action creator to be called when edit group was requested
 * @memberof groupsActions
 * @name groupsActions.requestEditGroup
 * @returns {Object} action
 * @property {string} action.type
 */
function requestEditGroup() {
  return {
    type: REQUEST_EDIT_GROUP,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const EDIT_GROUP_SUCCESS = 'EDIT_GROUP_SUCCESS';
/**
 * Action creator to be called when edit group succeeded
 * @memberof groupsActions
 * @name groupsActions.editGroupSuccess
 * @param {object} group the updated group
 * @param {string} oldName the former name of updated group
 * @returns {Object} action
 * @property {string} action.type
 * @property {object} action.group
 * @property {string} action.oldName
 */
function editGroupSuccess(group, oldName) {
  return {
    type: EDIT_GROUP_SUCCESS,
    group,
    oldName,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const EDIT_GROUP_FAILURE = 'EDIT_GROUP_FAILURE';
/**
 * Action creator to be called when edit group failed
 * @memberof groupsActions
 * @name groupsActions.editGroupFailure
 * @returns {Object} action
 * @property {string} action.type
 */
function editGroupFailure() {
  return {
    type: EDIT_GROUP_FAILURE,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const REQUEST_CREATE_GROUP = 'REQUEST_CREATE_GROUP';
/**
 * Action creator to be called when create group was requested
 * @memberof groupsActions
 * @name groupsActions.requestCreateGroup
 * @returns {Object} action
 * @property {string} action.type
 */
function requestCreateGroup() {
  return {
    type: REQUEST_CREATE_GROUP,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
/**
 * Action creator to be called when create group succeeded
 * @memberof groupsActions
 * @name groupsActions.createGroupSuccess
 * @param {object} group the updated group
 * @param {string} oldName the former name of created group
 * @returns {Object} action
 * @property {string} action.type
 * @property {object} action.group
 * @property {string} action.oldName
 */
function createGroupSuccess(group, oldName) {
  return {
    type: CREATE_GROUP_SUCCESS,
    group,
    oldName,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE';
/**
 * Action creator to be called when create group failed
 * @memberof groupsActions
 * @name groupsActions.createGroupFailure
 * @returns {Object} action
 * @property {string} action.type
 */
function createGroupFailure() {
  return {
    type: CREATE_GROUP_FAILURE,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const REQUEST_DELETE_GROUP = 'REQUEST_DELETE_GROUP';
/**
 * Action creator to be called when delete group was requested
 * @memberof groupsActions
 * @name groupsActions.requestDeleteGroup
 * @returns {Object} action
 * @property {string} action.type
 */
function requestDeleteGroup() {
  return {
    type: REQUEST_DELETE_GROUP,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';
/**
 * Action creator to be called when delete group succeeded
 * @memberof groupsActions
 * @name groupsActions.deleteGroupSuccess
 * @param {object} group the group that was just deleted
 * @returns {Object} action
 * @property {string} action.type
 * @property {object} action.group
 */
function deleteGroupSuccess(group) {
  return {
    type: DELETE_GROUP_SUCCESS,
    group,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const DELETE_GROUP_FAILURE = 'DELETE_GROUP_FAILURE';
/**
 * Action creator to be called when delete group failed
 * @memberof groupsActions
 * @name groupsActions.deleteGroupFailure
 * @returns {Object} action
 * @property {string} action.type
 */
function deleteGroupFailure() {
  return {
    type: DELETE_GROUP_FAILURE,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const REQUEST_GOOGLE_CONTACTS = 'REQUEST_GOOGLE_CONTACTS';
/**
 * Action creator to be called when google contacts were requested from google api
 * @memberof groupsActions
 * @name groupsActions.requestGoogleContacts
 * @returns {Object} action
 * @property {string} action.type
 */
function requestGoogleContacts() {
  return {
    type: REQUEST_GOOGLE_CONTACTS,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const GOOGLE_CONTACTS_SUCCESS = 'GOOGLE_CONTACTS_SUCCESS';
/**
 * Action creator to be called when getting google contacts succeeded
 * @memberof groupsActions
 * @name groupsActions.googleContactsSuccess
 * @param {array} contacts the contacts received from gapi
 * @returns {Object} action
 * @property {string} action.type
 * @property {object} action.contacts
 */
function googleContactsSuccess(contacts) {
  return {
    type: GOOGLE_CONTACTS_SUCCESS,
    contacts,
  };
}

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const GOOGLE_CONTACTS_FAILURE = 'GOOGLE_CONTACTS_FAILURE';
/**
 * Action creator to be called when getting google contacts failed
 * @memberof groupsActions
 * @name groupsActions.googleContactsFailure
 * @returns {Object} action
 * @property {string} action.type
 */
function googleContactsFailure() {
  return {
    type: GOOGLE_CONTACTS_FAILURE,
  };
}

/**
 * Calculates karma for given group taking the values of given contacts
 * @memberof groupsActions
 * @name groupsActions.calculateGroupKarma
 * @param {array} contacts all existing contacts for user
 * @param {object} group the group for which to recalculate karma
 * @returns {function} dispatching action for editing group karma
 */
function calculateGroupKarma(contacts, group) {
  return dispatch => {
    let contactsInGroup = contacts.filter(
      contact => contact.group === group.name.toLowerCase()
    );

    let groupSize = contactsInGroup.length;
    //let groupKarmaGoal = group.frequency * groupSize;
    let groupKarma = 0;

    if (groupSize > 0) {
      contactsInGroup.forEach(contact => {
        groupKarma += contact.karma * (1 / groupSize);
      });

      group.value = groupKarma >= 1 ? 100 : groupKarma * 100;
      if (group.value < 3) {
        group.value = 3;
      }
    } else {
      group.value = 3;
    }
    dispatch(editGroup(group, group.name));
  };
}

/**
 * will make a request to backend to get all groups
 * @memberof groupsActions
 * @name groupsActions.fetchGroups
 * @returns {Promise} promise containing response
 */
function fetchGroups() {
  return dispatch => {
    let localGroups;
    dispatch(requestGroups());
    if (navigator.onLine) {
      console.log(localStorage.getItem('user'));
      const config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('user'),
        },
      };

      return axios
        .get(apiUrl + 'groups/', config)
        .then(response => response.data)
        .then(data => dispatch(receiveGroups(data)))
        .catch(err =>
          db.group
            .toArray(value => (localGroups = value))
            .then(() => dispatch(receiveGroups(localGroups)))
        );
    } else {
      return db.group
        .toArray(value => (localGroups = value))
        .then(() => dispatch(receiveGroups(localGroups)));
    }
  };
}

/**
 * will check if there is need to refetch groups
 * @memberof groupsActions
 * @name groupsActions.fetchGroups
 * @param {object} state the current redux state object
 * @returns {boolean} if groups should fetch
 */
function shouldFetchGroups(state) {
  const groups = state.groups;
  if (groups.length === 0) {
    return true;
  } else if (groups.isFetching) {
    return false;
  } else {
    return groups.didInvalidate;
  }
}

/**
 * will call shouldFetchGroups and then fetch or not
 * @memberof groupsActions
 * @name groupsActions.fetchGroupsIfNeeded
 * @returns {function} will dispatch fetchGroups or resolve promise
 */
export function fetchGroupsIfNeeded() {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchGroups(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchGroups());
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}

/**
 * will attempt to edit a group and run callback if succeeded
 * @memberof groupsActions
 * @name groupsActions.editGroup
 * @returns {function} doing dispatch and requests to backend
 * @param {object} group a group object containing only properties to be updated
 * @param {string} oldName the former name of group to update
 * @param {object} history the react-router-dom history object to navigate
 * @param {function} callback
 */
export function editGroup(group, oldName, history, callback) {
  return dispatch => {
    dispatch(requestEditGroup());
    groupService.editGroup(group, oldName).then(
      group => {
        dispatch(editGroupSuccess(group, oldName));
        dispatch(fetchGroups());
        if (callback) {
          callback(group);
        }
        if (history) {
          history.push('/');
        }
      },
      error => {
        dispatch(editGroupFailure(error));
        dispatch(notifyActions.error(error));
      }
    );
  };
}

/**
 * will attempt to create a group and run callback if succeeded
 * @memberof groupsActions
 * @name groupsActions.createGroup
 * @returns {function} doing dispatch and requests to backend
 * @param {object} group a group object to be created
 * @param {object} history the react-router-dom history object to navigate
 * @param {function} callback
 */
export function createGroup(group, history, callback) {
  return dispatch => {
    dispatch(requestCreateGroup());
    groupService.createGroup(group).then(
      group => {
        dispatch(createGroupSuccess(group));
        dispatch(fetchGroups());
        if (callback) {
          callback();
        }
        history.push('/');
      },
      error => {
        dispatch(createGroupFailure(error));
        dispatch(notifyActions.error(error));
      }
    );
  };
}

/**
 * will attempt to delete a group
 * @memberof groupsActions
 * @name groupsActions.deleteGroup
 * @returns {function} doing dispatch and requests to backend
 * @param {string} name of the group to be deleted
 * @param {object} history the react-router-dom history object to navigate
 */
export function deleteGroup(name, history) {
  return dispatch => {
    dispatch(requestDeleteGroup());
    groupService.deleteGroup(name).then(
      () => {
        dispatch(deleteGroupSuccess(name));
        dispatch(fetchGroups());
        dispatch(fetchContactsIfNeeded());
        history.push('/');
      },
      error => {
        dispatch(deleteGroupFailure(error));
        dispatch(notifyActions.error(error));
      }
    );
  };
}

/**
 * Helper function to chain promises in a while block. If condition turns true, another promise will be chained,
 * if it turns false promise will be resolved.
 * @returns {function} handling data with condition in promises
 * @param {any} data of the group to be deleted
 * @param {function} condition a function taking data as argument to check for a condition
 * @param {function} action a function taking data as argument and returning a promise
 */
const promiseWhile = (data, condition, action) => {
  var whilst = data => {
    console.log(data);
    return condition(data) ? action(data).then(whilst) : Promise.resolve(data);
  };
  return whilst(data);
};

/**
 * @memberof groupsActions
 * @constant
 * @type {string}
 * @default
 */
export const RECEIVE_GAPI_TOKEN = 'RECEIVE_GAPI_TOKEN';
/**
 * @memberof groupsActions
 * @name groupsActions.receiveGapiToken
 * Action creator to be called when gapiToken was received
 * @returns {Object} action
 * @param {string} token the token received from google api
 * @property {string} action.type
 * @property {string} action.token
 */
function receiveGapiToken(token) {
  return {
    type: RECEIVE_GAPI_TOKEN,
    token,
  };
}

/**
 * will attempt get permission from google account
 * @memberof groupsActions
 * @name groupsActions.requestGooglePermission
 * @returns {function} doing dispatch and requests to gapi
 */
export function requestGooglePermission() {
  return dispatch => {
    const client_id = '794800346823-ounoqrpcqmtd4hqm28g473ktidv16tnl.apps.googleusercontent.com'; //process.env.REACT_APP_CLIENT_ID;
    const scopes = 'https://www.googleapis.com/auth/contacts.readonly';

    const contacts = [];
    let startIndex = 1;
    let totalAmount;

    dispatch(requestGoogleContacts());

    // eslint-disable-next-line no-undef
    gapi.client
      .init({
        apiKey: 'AIzaSyCOe2pNwV3V69Z5M1zxckwCZ6DRaVoRzX8', //process.env.REACT_APP_API_KEY,
        clientId: client_id,
        scope: 'https://www.googleapis.com/auth/contacts.readonly',
      })
      .then(r => {
        // eslint-disable-next-line no-undef
        gapi.auth.authorize(
          { client_id: client_id, scope: scopes, immediate: false },
          response => {
            console.log('res', response);
            dispatch(receiveGapiToken(response.access_token));

            // eslint-disable-next-line no-undef
            gapi.client
              .request({
                method: 'GET',
                path: '/m8/feeds/contacts/default/thin?max-results=1000',
                headers: {
                  'Content-Type': 'application/json',
                  'GData-Version': '3.0',
                  'if-match': '*',
                  data: response.access_token,
                },
              })
              .then(function(result) {
                totalAmount = result.result.feed.openSearch$totalResults.$t;
                result.result.feed.entry.forEach(entry => contacts.push(entry));
                promiseWhile(
                  contacts,
                  data => data.length < totalAmount,
                  data => {
                    // eslint-disable-next-line no-undef
                    return gapi.client
                      .request({
                        method: 'GET',
                        path:
                          '/m8/feeds/contacts/default/thin?start-index=' +
                          startIndex,
                        headers: {
                          'Content-Type': 'application/json',
                          'GData-Version': '3.0',
                          'if-match': '*',
                          data: response.access_token,
                        },
                      })
                      .then(subResult => {
                        subResult.result.feed.entry.forEach(entry =>
                          data.push(entry)
                        );
                        startIndex += 1000;
                        return data;
                      });
                  }
                ).then(result => {
                  dispatch(googleContactsSuccess(contacts));
                  dispatch(
                    showModal({
                      modalProps: { googleContacts: { open: true } },
                    })
                  );
                });
              });
          }
        );
      });
  };
}
