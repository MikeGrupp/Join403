let storedContacts = {};

function getStoredContacts() {
  return storedContacts;
}

function setStoredContacts(contacts) {
  storedContacts = contacts;
}

function addStoredContact(contactId, name, initials, mail, phone, color) {
  storedContacts.push({
    id: contactId,
    name: name,
    initials: initials,
    mail: mail,
    phone: phone,
    color: color,
  });
}

function editStoredContact(contactId, name, initials, mail, phone) {
  let index = storedContacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    storedContacts[index] = {
      ...storedContacts[index],
      name: name,
      initials: initials,
      mail: mail,
      phone: phone,
    };
  }
}

function getStoredContactById(id) {
  return storedContacts.find((element) => element["id"] === id) || null;
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
  resetForm("contact_form");
  createToast("successNewContact");
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

function isContactValid() {
  return true; //TODO: implement validation
}