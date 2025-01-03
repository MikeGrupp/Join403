let storedContacts = {};

function getStoredContacts() {
  return storedContacts;
}

function setStoredContacts(contacts) {
  storedContacts = contacts;
}

function addStoredContact(contact) {
  storedContacts.push(contact);
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

function initContacts(pageName) {
  if (pageName != "contacts") {
    return;
  }
  initDesktopAddContactButton();
  initContactList();
  initContactDetails();
}

function initDesktopAddContactButton() {
  let desktopAddContactContainerHtml = templateRenderDesktopAddContactButton();
  let desktopAddContactContainer = document.getElementById("desktop_add_contact_container");
  desktopAddContactContainer.innerHTML = desktopAddContactContainerHtml;
}

function initContactList() {
  let sortedContacts = getStoredContacts().sort((a, b) => a.name.localeCompare(b.name));
  let contactListHtml = "";
  let currentLetter = "";
  sortedContacts.forEach((contact) => {
    if (currentLetter != contact.name[0]) {
      currentLetter = contact.name[0];
      contactListHtml += templateRenderContactListLetter(currentLetter);
    }
    contactListHtml += templateRenderContactListEntry(
      contact.id,
      contact.color,
      contact.initials,
      contact.name,
      contact.mail
    );
  });
  let contactList = document.getElementById("contact_list");
  contactList.innerHTML = contactListHtml;
}

function initContactDetails() {
  let contactDetailsHtml = templateRenderContactDetailsDefault();
  let contactDetails = document.getElementById("desktop_contact_details_container");
  contactDetails.innerHTML = contactDetailsHtml;
}

function determineInitials(name) {
  return name
    .split(" ")
    .map((char) => {
      return char[0];
    })
    .join("");
}

function openContactDetails(contactId) {
  markAsSelectedContact(contactId);
  let contact = getStoredContactById(contactId);
  let contactDetailsHtml = templateRenderContactDetailsDefault();
  if (contact != null) {
    contactDetailsHtml += templateRenderContactDetailsForContact(
      contact.color,
      contact.initials,
      contact.name,
      contact.mail,
      contact.phone
    );
  }
  let contactDetails = document.getElementById("desktop_contact_details_container");
  contactDetails.innerHTML = contactDetailsHtml;
}

function markAsSelectedContact(contactId) {
  let contacts = document.getElementsByClassName("contact");
  for (let i = 0; i < contacts.length; i++) {
    contacts[i].classList.remove("selected_contact");
  }
  let contactById = document.getElementById("desktop_contact_details_container");
  contactById.classList.add("selected_contact");
}

function openContactManage() {
  document.activeElement?.blur();
  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no";
  let modal = document.getElementById("contact_manage_dialog");
  addContactManageOutsideClickClosingListener(modal);
  addContactManageEscapeListener(modal);
  modal.showModal();
}


function closeContactManage() {
  let modal = document.getElementById("contact_manage_dialog");
  modal.close();
}

function resetForm() {
  document.getElementById("contact_form").reset();
}

function addContactManageOutsideClickClosingListener(element) {
  element.addEventListener("click", (e) => {
    const elementDimensions = element.getBoundingClientRect();
    if (
      e.clientX < elementDimensions.left ||
      e.clientX > elementDimensions.right ||
      e.clientY < elementDimensions.top ||
      e.clientY > elementDimensions.bottom
    ) {
      document.documentElement.style.overflow = "auto";
      document.body.scroll = "yes";
      element.close();
      document.getElementById("contact_manage_dialog").blur();
    }
  });
}

function addContactManageEscapeListener(element) {
  element.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.documentElement.style.overflow = "auto";
      document.body.scroll = "yes";
      element.close();
      document.getElementById("contact_manage_dialog").blur();
    }
  });
}

async function addNewContact(event) {
  event.preventDefault();
  let name = document.getElementById("contact_manage_name");
  let mail = document.getElementById("contact_manage_mail");
  let phone = document.getElementById("contact_manage_phone");

  let initials = determineInitials(name.value);
  let color = selectRandomColor();
  let newUserId = await postData("/contacts", {
    name: name.value,
    initials: initials,
    mail: mail.value,
    phone: phone.value,
    color: color,
  });

  if (newUserId) {
    console.log(newUserId);
    addStoredContact({
      id: newUserId,
      name: name.value,
      initials: initials,
      mail: mail.value,
      phone: phone.value,
      color: color,
    });
    initContactList();
    closeContactManage();
    openContactDetails(newUserId);
  }
}

function selectRandomColor() {
  const COLORS = [
    "orange",
    "pink",
    "violet_blue",
    "violet",
    "blue_cerulean ",
    "green_java ",
    "red_bittersweet ",
    "orange_tangerine ",
    "pink_helitrope ",
    "yellow_supernova ",
    "blue_ribbon ",
    "green_yellow ",
    "yellow_sun ",
    "red_coral ",
    "yellow_sin ",
    "purple_minsk",
  ];
  let randomNumber = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomNumber];
}
