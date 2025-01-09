let storedContacts = {};

function getStoredContacts() {
  return storedContacts;
}

function setStoredContacts(contacts) {
  storedContacts = contacts;
}

function addStoredContact(userId, name, initials, mail, phone, color) {
  storedContacts.push({
    id: userId,
    name: name,
    initials: initials,
    mail: mail,
    phone: phone,
    color: color,
  });
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
  let newUserId = await postContact(name, initials, mail, phone, color);
  if (newUserId) {
    addStoredContact(newUserId, name, initials, mail, phone, color);
    createToast("successNewContact");
  }
  return newUserId;
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
  });;
}

function isContactValid() {
  return true; //TODO: implement validation
}