import { SHOW_MODAL, HIDE_MODAL } from '../actions/modal.actions';

/**
 * The initial modal state
 * @memberof modalReducer
 * @constant
 * @type {object}
 * @property {string} modalType
 * @property {object} modalProps
 * @property {object} modalProps.googleContacts
 * @property {boolean} modalProps.googleContacts.open
 * @property {object} modalProps.searchContacts
 * @property {boolean} modalProps.searchContacts.open
 */
const initialState = {
  modalType: null,
  modalProps: {
    googleContacts: { open: true },
    searchContacts: { open: true },
  },
};

/**
 * This reducer function takes the current application state and
 * handles the actions related to modals
 * then returns the next application state
 * @name modalReducer
 * @namespace
 * @param {Object} state current application state
 * @param {Object} action what happened? - handeled action type: SHOW_MODAL, HIDE_MODAL
 * @returns {Object} new application state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        type: action.type,
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};
