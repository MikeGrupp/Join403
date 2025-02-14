/**
 * Array to store contact objects.  Contacts are stored as key-value pairs
 * where the key is the contact ID
 *
 * @type {Array<Object>}
 */
let storedContacts = [];

/**
 * Retrieves all stored contacts
 *
 * @returns {Array<Object>} An array of contact objects
 */
function getStoredContacts() {
  return Object.values(storedContacts);
}

/**
 * Sets the stored contacts.
 *
 * @param {Array<Object>} contacts - An array of contact objects to set
 */
function setStoredContacts(contacts) {
  storedContacts = contacts;
}

/**
 * Adds a new contact to the stored contacts
 *
 * @param {string} contactId - The ID of the contact
 * @param {string} name - The name of the contact
 * @param {string} initials - The initials of the contact
 * @param {string} mail - The email address of the contact
 * @param {string} phone - The phone number of the contact
 * @param {string} color - The color associated with the contact
 */
function addStoredContact(contactId, name, initials, mail, phone, color) {
  storedContacts[contactId] = {
    id: contactId,
    name: name,
    initials: initials,
    mail: mail,
    phone: phone,
    color: color,
  };
}

/**
 * Edits an existing contact in the stored contacts
 *
 * @param {string} contactId - The ID of the contact to edit
 * @param {string} name - The updated name of the contact
 * @param {string} initials - The updated initials of the contact
 * @param {string} mail - The updated email address of the contact
 * @param {string} phone - The updated phone number of the contact
 */
function editStoredContact(contactId, name, initials, mail, phone) {
  storedContacts[contactId] = {
    ...storedContacts[contactId],
    name: name,
    initials: initials,
    mail: mail,
    phone: phone,
  };
}

/**
 * Deletes a contact from the stored contacts
 *
 * @param {string} contactId - The ID of the contact to delete
 */
function deleteStoredContact(contactId) {
  if (storedContacts.hasOwnProperty(contactId)) {
    delete storedContacts[contactId];
  }
}

/**
 * Retrieves a contact by its ID
 *
 * @param {string} contactId - The ID of the contact to retrieve
 * @returns {Object|null} The contact object, or null if not found
 */
function getStoredContactById(contactId) {
  return storedContacts[contactId] || null;
}

/**
 * Maps a JSON object of contacts to the internal contact format.  Used when
 * loading contacts from the database
 *
 * @param {Object} json - The JSON object of contacts.  Keys are Firebase IDs
 * @returns {Object|null} An object of contacts, or null if the input is null
 */
function mapContactsJson(json) {
  if (json == null) {
    return null;
  }
  return Object.entries(json).reduce((contactsObject, [firebaseId, contact]) => {
    contactsObject[firebaseId] = {
      id: firebaseId,
      name: contact.name,
      initials: contact.initials,
      mail: contact.mail,
      phone: contact.phone,
      color: contact.color,
    };
    return contactsObject;
  }, {});
}

/**
 * Creates a new contact
 *
 * @async
 * @param {string} name - The name of the new contact
 * @param {string} mail - The email address of the new contact
 * @param {string} phone - The phone number of the new contact
 * @returns {Promise<string|null>} A promise that resolves with the new contact ID, or null if creation fails
 */
async function createNewContact(name, mail, phone) {
  let initials = determineInitials(name);
  let color = selectRandomColor();
  let newContactId = await postContact(name, initials, mail, phone, color);
  if (newContactId) {
    addStoredContact(newContactId, name, initials, mail, phone, color);
    resetForm(CONSTANTS.SELECTORS.CONTACT_FORM);
    createToast("successNewContact");
  }
  return newContactId;
}

/**
 * Edits an existing contact
 *
 * @async
 * @param {string} contactId - The ID of the contact to edit
 * @param {string} name - The updated name of the contact
 * @param {string} mail - The updated email address of the contact
 * @param {string} phone - The updated phone number of the contact
 * @returns {Promise<string>} A promise that resolves with the contact ID
 */
async function editExistingContact(contactId, name, mail, phone) {
  let initials = determineInitials(name);
  await patchContact(contactId, name, initials, mail, phone);
  editStoredContact(contactId, name, initials, mail, phone);
  return contactId;
}

/**
 * Deletes an existing contact
 *
 * @async
 * @param {string} contactId - The ID of the contact to delete
 * @returns {Promise<string>} A promise that resolves with the contact ID
 */
async function deleteExistingContact(contactId) {
  await deleteContact(contactId);
  deleteStoredContact(contactId);
  return contactId;
}

/**
 * Reloads contacts from the database
 *
 * @async
 */
async function reloadContactsFromDatabase() {
  setStoredContacts(await loadContacts());
}

/**
 * Posts a new contact to the database
 *
 * @async
 * @param {string} name - The name of the contact
 * @param {string} initials - The initials of the contact
 * @param {string} mail - The email address of the contact
 * @param {string} phone - The phone number of the contact
 * @param {string} color - The color associated with the contact
 * @returns {Promise<string>} A promise that resolves with the new contact ID
 */
async function postContact(name, initials, mail, phone, color) {
  return await postData("/contacts", {
    name: name,
    initials: initials,
    mail: mail,
    phone: phone,
    color: color,
  });
}

/**
 * Patches an existing contact in the database
 *
 * @async
 * @param {string} contactId - The ID of the contact to patch
 * @param {string} name - The updated name of the contact
 * @param {string} initials - The updated initials of the contact
 * @param {string} mail - The updated email address of the contact
 * @param {string} phone - The updated phone number of the contact
 * @returns {Promise<any>} A promise that resolves with the response from the patch request
 */
async function patchContact(contactId, name, initials, mail, phone) {
  return await patchData("/contacts/" + contactId, {
    name: name,
    initials: initials,
    mail: mail,
    phone: phone,
  });
}

/**
 * Deletes a contact from the database
 *
 * @async
 * @param {string} contactId - The ID of the contact to delete
 * @returns {Promise<any>} A promise that resolves with the response from the delete request
 */
async function deleteContact(contactId) {
  return await deleteData("/contacts/" + contactId);
}

/**
 * Removes a contact from the assigned contacts of all users
 *
 * @async
 * @param {string} contactId - The ID of the contact to remove
 * @returns {Promise<string>} A promise that resolves with the contact ID
 */
async function removeExistingContactFromUsers(contactId) {
  let users = await loadData("users/");
  for (const userId in users) {
    if (users.hasOwnProperty(userId)) {
      const user = users[userId];
      if (user.assignedContact && user.assignedContact === contactId) {
        deleteContactFromUsers(userId);
      }
    }
  }
  return contactId;
}

/**
 * Deletes a contact assignment from a specific user
 *
 * @async
 * @param {string} userId - The ID of the user to remove the contact assignment from
 * @returns {Promise<any>} A promise that resolves with the response from the delete request
 */
async function deleteContactFromUsers(userId) {
  return await deleteData("/users/" + userId + "/assignedContact/");
}
