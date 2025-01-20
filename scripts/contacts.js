let storedContacts = {};

function getStoredContacts() {
  return Object.values(storedContacts);
}

function setStoredContacts(contacts) {
  storedContacts = contacts.reduce((contactsObject, contact) => {
    contactsObject[contact.id] = contact;
    return contactsObject;
  }, {});
}

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

function editStoredContact(contactId, name, initials, mail, phone) {
  storedContacts[contactId] = {
    ...storedContacts[contactId],
    name: name,
    initials: initials,
    mail: mail,
    phone: phone,
  };
}

function deleteStoredContact(contactId) {
  if (storedContacts.hasOwnProperty(contactId)) {
    delete storedContacts[contactId];
  }
}

function getStoredContactById(contactId) {
  return storedContacts[contactId] || null;
}

function mapContactsJson(json) {
  if (json == null) {
    return null;
  }
  return Object.entries(json).map(([firebaseId, contact]) => ({
    id: firebaseId,
    name: contact.name,
    initials: contact.initials,
    mail: contact.mail,
    phone: contact.phone,
    color: contact.color,
  }));
}

async function createNewContact(name, mail, phone) {
  let initials = determineInitials(name);
  let color = selectRandomColor();
  let newContactId = await postContact(name, initials, mail, phone, color);
  if (newContactId) {
    addStoredContact(newContactId, name, initials, mail, phone, color);
    resetForm("contact_form");
    createToast("successNewContact");
  }
  return newContactId;
}

async function editExistingContact(contactId, name, mail, phone) {
  let initials = determineInitials(name);
  await patchContact(contactId, name, initials, mail, phone);
  editStoredContact(contactId, name, initials, mail, phone);
  return contactId;
}

async function deleteExistingContact(contactId) {
  await deleteContact(contactId);
  deleteStoredContact(contactId);
  return contactId;
}

async function reloadContactsFromDatabase() {
  setStoredContacts(await createLoadContacts());
}

async function postContact(name, initials, mail, phone, color) {
  return await postData("/contacts", {
    name: name,
    initials: initials,
    mail: mail,
    phone: phone,
    color: color,
  });
}

async function patchContact(contactId, name, initials, mail, phone) {
  return await patchData("/contacts/" + contactId, {
    name: name,
    initials: initials,
    mail: mail,
    phone: phone,
  });
}

async function deleteContact(contactId) {
  return await deleteData("/contacts/" + contactId);
}

async function removeExistingContactFromUsers(contactId) {
  let users = await loadData("users/");
  for (const userId in users) {
    if (users.hasOwnProperty(userId)) {
      const user = users[userId];
      if (
        user.assignedContact &&
        user.assignedContact === contactId
      ) {
        deleteContactFromUsers(userId);
      }
    }
  }
  return contactId;
}

async function deleteContactFromUsers(userId) {
  return await deleteData("/users/" + userId + "/assignedContact/");
}

function isContactValid() {
  return true; //TODO: implement validation
}