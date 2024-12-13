let storedContacts = {};

function getStoredContacts() {
  return storedContacts;
}

function setStoredContacts(contacts) {
  storedContacts = contacts;
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

function initContacts(pageName) {
  if(pageName != "contacts") {
    return;
  }
  let sortedContacts = getStoredContacts().sort((a, b) => a.name.localeCompare(b.name));
  let contactListHtml = "";
  let currentLetter = "";
  sortedContacts.forEach((contact) => {
    if (currentLetter != contact.name[0]) {
      currentLetter = contact.name[0];
      contactListHtml += templateRenderContactListLetter(currentLetter);
    }
    contactListHtml += templateRenderContactListEntry(contact.color, contact.initials, contact.name, contact.mail);
  });
  let contacts = document.getElementById("contact_list");
  contacts.innerHTML = contactListHtml;
}

function determineInitials(name) {
  return name
    .split(" ")
    .map((char) => {
      return char[0];
    })
    .join("");
}
