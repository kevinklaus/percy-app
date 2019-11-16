import { combineReducers } from 'redux';
import contactsReducer from './contacts.reducer';
import ContactReducer from './contact.reducer';

import InputReducer from './input.reducer';
import groupsReducer from './groups.reducer';
import fetchingReducer from './fetching.reducer';
import userReducer from './user.reducer';
import googleContactsReducer from './google.contacts.reducer';
import modalReducer from './modal.reducer';
import groupReducer from './group.reducer';
import errorReducer from './error.reducer';
import demoReducer from './demo.reducer';

/**
 * This function serves as an entry point to address all combined reducers
 * @constant
 */
const allReducers = combineReducers({
  contacts: contactsReducer,
  googleContacts: googleContactsReducer,
  contact: ContactReducer,
  groups: groupsReducer,
  group: groupReducer,
  input: InputReducer,
  isFetching: fetchingReducer,
  user: userReducer,
  modal: modalReducer,
  error: errorReducer,
  demo: demoReducer,
});

export default allReducers;
