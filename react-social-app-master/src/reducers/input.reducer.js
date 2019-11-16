/**
 * This reducer function takes the current application state and
 * handles the actions related to inputs
 * then returns the next application state
 * @name inputReducer
 * @param {Object} state current application state
 * @param {Object} action what happened? - handeled action type:
 * INPUT_CHANGED, GROUP_REASSIGN, GROUP_SETTINGS_OPENED
 * @returns {Object} new application state
 */
export default function(state, action) {
  if (action.type === 'INPUT_CHANGED') {
    const field = action.field;
    const value = action.value;

    return { ...state, [field]: value };
  } else if (action.type === 'GROUP_SETTINGS_OPENED') {
    const field = action.field;
    const value = action.value;

    return { ...state, [field]: value };
  } else if (action.type === 'GROUP_REASSIGN') {
    const field = 'groupNameValue';
    const value = action.group ? action.group.name : '';

    return { ...state, [field]: value };
  } else {
    return state || { createGroupNameValue: '' };
  }
}
