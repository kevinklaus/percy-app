import Dexie from 'dexie';

const db = new Dexie('localDb');
db.version(1).stores({
  tasks: '++id,date,description,done',
  group: 'name',
  contacts: '++id,firstName,lastName,phone',
  phone: 'contact,phone_regex,phone_number',
});

/**
 * Component that uses the Dexie wrapper to create
 * an indexedDB database and attaches its stores.
 * @namespace
 * @name localDb
 */
export default db;
