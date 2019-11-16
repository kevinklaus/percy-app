import { editGroup } from './groups.action';
import { resetKarma } from './contacts.action';

/**
 * Action creators and functions handling everything happening in global context.
 * @namespace
 * @name globalActions
 */
export const globalActions = {
  groupIntervalFinished,
};

/**
 * Action creator to be called when contactImage is clicked
 * @memberof globalActions
 * @name globalActions.clickContactImage
 * @param {Object} contact the contact of which the image was clicked
 * @param {Object} history history object for navigation
 * @returns {Object} action
 * @property {string} action.type
 * @property {object} action.contact
 */
export const clickContactImage = (contact, history) => {
  console.log(contact, 'selected');
  history.push('/groups/contact/' + contact.id);
  return {
    type: 'CONTACT_IMAGE_CLICKED',
    contact: contact,
  };
};

/**
 * Action creator to be called when page is reloaded by user and there was a contact
 * in global state before refresh
 * @memberof globalActions
 * @name globalActions.reassignContact
 * @param {Object} contact the contact to be put into state
 * @returns {Object} action
 * @property {string} action.type
 * @property {object} action.contact
 */
export const reassignContact = contact => {
  return {
    type: 'CONTACT_REASSIGN',
    contact: contact,
  };
};

/**
 * Action creator to be called when page is reloaded by user and there was a group
 * in global state before refresh
 * @memberof globalActions
 * @name globalActions.reassignGroup
 * @param {Object} group the group to be put into state
 * @returns {Object} action
 * @property {string} action.type
 * @property {object} action.group
 */
export const reassignGroup = group => {
  return {
    type: 'GROUP_REASSIGN',
    group,
  };
};

/**
 * @memberof globalActions
 * @constant
 * @type {string}
 * @default
 */
export const GROUP_INTERVAL_FINISHED = 'GROUP_INTERVAL_FINISHED';
/**
 * Action creator called when group interval has finished
 * @memberof globalActions
 * @name globalActions.groupIntervalFinished
 * @param {object} group the group for which interval has finished
 * @returns {Object} action
 * @property {string} action.type
 * @property {object} action.group
 */
function groupIntervalFinished(group) {
  return {
    type: 'GROUP_INTERVAL_FINISHED',
    group,
  };
}

/**
 * function will edit group to reset timer
 * @memberof globalActions
 * @name globalActions.groupIntervalFinish
 * @param {object} group the to group to reset timer for
 * @param {object} notification the notification to be displayed for interval finished
 * @returns {function} doing dispatch and requests to backend
 */
export const groupIntervalFinish = (group, notification) => {
  return dispatch => {
    console.log('interval finished');

    dispatch(
      editGroup({ startTimer: true }, group.name, null, g => {
        if (Notification.permission === 'granted') {
          console.log('permission granted');
          navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(
              notification.title,
              notification.options
            );
          });
        }
        dispatch(groupIntervalFinished(g));
        dispatch(resetKarma(0.01, g));
      })
    );
  };
};

/**
 * Action creator called when back button is clicked
 * @memberof globalActions
 * @name globalActions.clickBackButton
 * @param {object} history object for navigation
 * @returns {Object} action
 * @property {string} action.type
 * @property {object} action.payload
 */
export const clickBackButton = history => {
  history.goBack();
  return {
    type: 'BACK_BUTTON_CLICKED',
    payload: '',
  };
};

/**
 * Action creator called when input is changed
 * @memberof globalActions
 * @name globalActions.changeInput
 * @param {object} e event containing value
 * @param {string} fieldName the name of the input that is changed
 * @returns {Object} action
 * @property {string} action.type
 * @property {object} action.value
 * @property {string} action.fieldName
 */
export const changeInput = (e, fieldName) => {
  console.log('User changed input', e);
  return {
    type: 'INPUT_CHANGED',
    value: e.target.value,
    field: fieldName,
  };
};

/**
 * @memberof globalActions
 * @name globalActions.openGroupSettings
 * Action creator called when group settings view is opened
 * @param {object} group the group to open settings for
 * @param {string} oldName the former name of group as it might be edited on settings page
 * @param {string} fieldName the name of the input field to notify state that input already has a value
 * @returns {Object} action
 * @property {string} action.type
 * @property {string} action.value
 * @property {string} action.field
 * @property {object} action.group
 */
export const openGroupSettings = (group, oldName, fieldName) => {
  console.log('group settings', oldName, fieldName);
  return {
    type: 'GROUP_SETTINGS_OPENED',
    value: oldName,
    field: fieldName,
    group,
  };
};

/**
 * Action creator called when button is clicked
 * @memberof globalActions
 * @name globalActions.clickButton
 * @param {object} e the click event
 * @param {string} fieldName the name of the input that was clicked
 * @returns {Object} action
 * @property {string} action.type
 * @property {string} action.value
 * @property {string} action.field
 */
export const clickButton = (e, fieldName) => {
  console.log('User clicked button', fieldName);
  return {
    type: 'BUTTON_CLICKED',
    value: e.target.value,
    field: fieldName,
  };
};

/**
 * Action creator called when slider is moved
 * @memberof globalActions
 * @name globalActions.moveSlider
 * @param {object} e the change event
 * @param {Number} newValue the value after slider was moved
 * @param {string} fieldName the name of the input that was changed
 * @param {function?} callback optional callback function
 * @returns {Object} action
 * @property {string} action.type
 * @property {Number} action.value
 * @property {string} action.field
 */
export const moveSlider = (e, newValue, fieldName, callBack) => {
  console.log('User moved slider', fieldName);
  //TODO:
  //handle state changes in reducer, not via callback function
  callBack(e, newValue);
  return {
    type: 'SLIDER_MOVED',
    value: newValue,
    field: fieldName,
  };
};
