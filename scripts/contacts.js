function initContacts() {
  let sortedContacts = getStoredContacts().sort((a, b) => a.name.localeCompare(b.name));
  let contactListHtml = "";
  let currentLetter = "";
  sortedContacts.forEach((contact) => {
    if (currentLetter != contact.name[0]) {
      currentLetter = contact.name[0];
      contactListHtml += templateRenderContactListLetter(currentLetter);
    }
    contactListHtml += templateRenderContactListEntry(
      "bg_orange",
      getInitials(contact.name),
      contact.name,
      contact.mail
    );
  });
  let contacts = document.getElementById("contact_list");
  contacts.innerHTML = contactListHtml;
}

function getInitials(name) {
  return name
    .split(" ")
    .map((char) => {
      return char[0];
    })
    .join("");
}
