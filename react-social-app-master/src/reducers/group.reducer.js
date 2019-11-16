/**
 * This reducer function takes the current application state and
 * handles the actions related to a group
 * then returns the next application state
 * @name groupReducer
 * @param {Object} state current application state
 * @param {Object} action what happened? - handeled action type:
 * GROUP_SETTINGS_OPENED, GROUP_REASSIGN
 * @returns {Object} new application state
 */
export default function(state, action) {
  if (action.type === 'GROUP_SETTINGS_OPENED') {
    console.log('reducer group');
    return action.group;
  } else if (action.type === 'GROUP_REASSIGN') {
    return action.group || state;
  }
  return state || null;
}
