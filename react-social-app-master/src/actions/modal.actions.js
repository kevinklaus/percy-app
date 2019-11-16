/**
 * @memberof modalActions
 * @constant
 * @type {string}
 * @default
 */
export const HIDE_MODAL = 'HIDE_MODAL';
/**
 * @memberof modalActions
 * @constant
 * @type {string}
 * @default
 */
export const SHOW_MODAL = 'SHOW_MODAL';

/**
 * Action creators and functions handling everything happening to modals.
 * @namespace
 * @name modalActions
 */
export const modalActions = {};

/**
 * Action creator called when modal shall be shown
 * @memberof modalActions
 * @name modalActions.showModal
 * @param {object} modalProps object containing properties of modal
 * @returns {Object} action
 * @property {string} action.type
 * @property {object} action.modalProps
 */
export const showModal = ({ modalProps }) => dispatch => {
  dispatch({
    type: SHOW_MODAL,
    modalProps,
  });
};

/**
 * Action creator called when modal shall be hidden
 * @memberof modalActions
 * @name modalActions.hideModal
 * @returns {Object} action
 * @property {string} action.type
 */
export const hideModal = () => dispatch => {
  dispatch({
    type: HIDE_MODAL,
  });
};
