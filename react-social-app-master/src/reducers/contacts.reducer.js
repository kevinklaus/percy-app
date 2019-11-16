import {
  RECEIVE_CONTACTS,
  DELETE_CONTACT_SUCCESS,
  CREATE_CONTACT_SUCCESS,
  EDIT_CONTACT_SUCCESS,
} from '../actions/contacts.action';
import db from '../database/localDB';
import { LOGIN_SUCCESS } from '../actions/user.action';
import {
  RESET_KARMA_SUCCESS,
} from '../actions/demo.actions';
import { DELETE_GROUP_SUCCESS } from '../actions/groups.action';

/**
 * This function takes a contacts array, clears the Data Base (DB) and
 * saves the received contacts array to the DB
 * @memberof contactsReducer
 * @name contactsReducer.replaceContacts
 * @param {array} contacts a contact array
 */
async function replaceContacts(contacts) {
  await db.contacts.clear();
  db.contacts.bulkPut(contacts);
  return;
}

/**
 * This reducer function takes the current application state and
 * handles the actions related to contacts
 * then returns the next application state
 * @namespace
 * @name contactsReducer
 * @param {Object} state current application state
 * @param {Object} action what happened? - handeled action types:
 * RECEIVE_CONTACTS, CREATE_CONTACT_SUCCESS, DELETE_GROUP_SUCCESS,
 * DELETE_CONTACT_SUCCESS, LOGIN_SUCCESS, EDIT_CONTACT_SUCCESS,
 * RESET_KARMA_SUCCESS
 * @returns {Object} new application state
 */
export default function(state, action) {
  if (action.type === RECEIVE_CONTACTS) {
    replaceContacts(action.contacts);
    state.didInvalidate = false;
    return action.contacts;
  } else if (action.type === CREATE_CONTACT_SUCCESS) {
    state.push(action.contact);
    replaceContacts(state);
    state.didInvalidate = true;
    return state;
  } else if (action.type === DELETE_GROUP_SUCCESS) {
    state.didInvalidate = true;
    return state;
  } else if (action.type === DELETE_CONTACT_SUCCESS) {
    const contactIndex = state.findIndex(
      contact => contact.id === action.contactid
    );
    state.splice(contactIndex, 1);
    replaceContacts(state);
    state.didInvalidate = true;
    return state;
  } else if (action.type === LOGIN_SUCCESS) {
    state.didInvalidate = true;
    return state;
  } else if (action.type === EDIT_CONTACT_SUCCESS) {
    let c;
    if (action.contact) {
      c = state.map(contact => {
        if (contact.id === action.contact.id) {
          console.log(action.contact);
          contact = action.contact;
        }
        return contact;
      });
      replaceContacts(c);
    }
    return c || state;
  } else if (action.type === RESET_KARMA_SUCCESS) {
    const c = state.map(contact => {
      contact.karma = action.value;
      return contact;
    });
    replaceContacts(c);
    return c || state;
  }
  return state || [];
}
