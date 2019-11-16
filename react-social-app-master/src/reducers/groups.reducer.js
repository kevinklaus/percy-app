import {
  RECEIVE_GROUPS,
  REQUEST_EDIT_GROUP,
  EDIT_GROUP_SUCCESS,
  CREATE_GROUP_SUCCESS,
  DELETE_GROUP_SUCCESS,
} from '../actions/groups.action';
import db from '../database/localDB';
import { LOGIN_SUCCESS } from '../actions/user.action';

/**
 * This function takes a groups array, clears the Data Base (DB) and
 * saves the received groups array to the DB
 * @memberof groupsReducer
 * @name groupsReducer.replaceGroups
 * @param {array} groups an array of groups
 */
async function replaceGroups(groups) {
  await db.group.clear();
  db.group.bulkPut(groups);
  return;
}

/**
 * This reducer function takes the current application state and
 * handles the actions related to groups
 * then returns the next application state
 * @namespace
 * @name groupsReducer
 * @param {Object} state current application state
 * @param {Object} action what happened? - handeled action types:
 * RECEIVE_GROUPS, EDIT_GROUP_SUCCESS, CREATE_GROUP_SUCCESS,
 * DELETE_GROUP_SUCCESS, LOGIN_SUCCESS
 * @returns {Object} new application state
 */
export default function(state, action) {
  if (action.type === RECEIVE_GROUPS) {
    replaceGroups(action.groups);
    state.didInvalidate = false;
    return action.groups;
  } else if (action.type === EDIT_GROUP_SUCCESS) {
    let groups = state.map(group => {
      if (group.name.toLowerCase() === action.oldName.toLowerCase()) {
        group = action.group;
      }
      return group;
    });
    replaceGroups(groups);
    groups.didInvalidate = true;
    return groups;
  } else if (action.type === CREATE_GROUP_SUCCESS) {
    state.push(action.group);
    replaceGroups(state);
    state.didInvalidate = true;
    return state;
  } else if (action.type === DELETE_GROUP_SUCCESS) {
    const groupIndex = state.findIndex(group => group.name === action.group);
    state.splice(groupIndex, 1);
    replaceGroups(state);
    state.didInvalidate = true;
    return state;
  } else if (action.type === LOGIN_SUCCESS) {
    state.didInvalidate = true;
    return state;
  }
  return state || [];
}
