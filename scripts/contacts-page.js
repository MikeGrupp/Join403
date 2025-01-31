const CONSTANTS = {
  SELECTORS: {
    CONTACT_LIST_CONTAINER: "contact_list_container",
    CONTACT_LIST: "contact_list",
    CONTACT_ADD_CONTAINER: "add_contact_container",
    CONTACT_DETAILS_D: "desktop_contact_details_container",
    CONTACT_DETAILS_M: "mobile_contact_details_container",
    CONTACT_DETAILS_SUBMENU: "contact_manage_submenu",
    CONTACT_DIALOG: "contact_manage_dialog",
    CONTACT_FORM: "contact_form",
    CONTACT_NAME: "contact_manage_name",
    CONTACT_MAIL: "contact_manage_mail",
    CONTACT_PHONE: "contact_manage_phone",
  },
  CLASSES: {
    CONTACT: "contact",
    SELECTED_CONTACT: "selected_contact",
  },
};

async function initContacts() {
  setStoredContacts(await createLoadContacts());
  initDesktopAddContactButton();
  initContactList();
  initContactDetails();
}

function initDesktopAddContactButton() {
  let desktopAddContactContainerHtml = templateRenderDesktopAddContactButton();
  let desktopAddContactContainer = document.getElementById(CONSTANTS.SELECTORS.CONTACT_ADD_CONTAINER);
  desktopAddContactContainer.innerHTML = desktopAddContactContainerHtml;
}

function initContactList() {
  let sortedContacts = getStoredContacts().sort((a, b) => a.name.localeCompare(b.name));
  let contactListHtml = "";
  let currentFirstLetter = "";
  sortedContacts.forEach((contact) => {
    if (currentFirstLetter != contact.name[0].toUpperCase()) {
      currentFirstLetter = contact.name[0].toUpperCase();
      contactListHtml += templateRenderContactListLetter(currentFirstLetter);
    }
    contactListHtml += templateRenderContactListEntry(
      contact.id,
      contact.color,
      contact.initials,
      contact.name,
      contact.mail
    );
  });
  let contactList = document.getElementById(CONSTANTS.SELECTORS.CONTACT_LIST);
  contactList.innerHTML = contactListHtml;
}

function initContactDetails() {
  let contactDetailsHtml = templateRenderContactDetailsDefault();
  let contactDetails = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DETAILS_D);
  contactDetails.innerHTML = contactDetailsHtml;
  let contactDetailsMobile = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DETAILS_M);
  contactDetailsMobile.innerHTML = contactDetailsHtml;
}

function initContactManageDialog(mode, contactId, initials, color) {
  let contactManageDialogHtml = templateRenderContactManageDialog(mode, contactId, initials, color);
  let contactManageDialog = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DIALOG);
  contactManageDialog.innerHTML = contactManageDialogHtml;
}

function openContactDetails(contactId) {
  if (window.screen.width < 768) {
    dNone(CONSTANTS.SELECTORS.CONTACT_LIST_CONTAINER);
    dNone(CONSTANTS.SELECTORS.CONTACT_DETAILS_M);
  }
  markAsSelectedContact(contactId);
  let contact = getStoredContactById(contactId);
  let contactDetailsHtml = templateRenderContactDetailsDefault();
  if (contact != null) {
    contactDetailsHtml += templateRenderContactDetailsForContact(
      contactId,
      contact.color,
      contact.initials,
      contact.name,
      contact.mail,
      contact.phone
    );
  }
  let contactDetails = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DETAILS_D);
  contactDetails.innerHTML = contactDetailsHtml;
  let contactDetailsMobile = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DETAILS_M);
  contactDetailsMobile.innerHTML = contactDetailsHtml;
  initContactManageSubmenu(contactId);
}

function initContactManageSubmenu(contactId) {
  let contactManageSubmenu = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DETAILS_SUBMENU);
  contactManageSubmenu.innerHTML = templateRenderContactDetailsMenuForContact(contactId);
  initContactManageSubmenuListeners();
}

function markAsSelectedContact(contactId) {
  let contacts = document.getElementsByClassName(CONSTANTS.CLASSES.CONTACT);
  for (let i = 0; i < contacts.length; i++) {
    contacts[i].classList.remove(CONSTANTS.CLASSES.SELECTED_CONTACT);
  }
  let contactById = document.getElementById(contactId);
  contactById.classList.add(CONSTANTS.CLASSES.SELECTED_CONTACT);
  contactById.focus();
}

function openContactManage() {
  document.activeElement?.blur();
  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no";
  let modal = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DIALOG);
  addContactManageOutsideClickClosingListener(modal);
  addContactManageEscapeListener(modal);
  modal.showModal();
}

function openCreateContact() {
  initContactManageDialog("create");
  openContactManage();
}

function openEditContact(contactId) {
  reloadContactsFromDatabase();
  let contact = getStoredContactById(contactId);
  initContactManageDialog("edit", contactId, contact.initials, contact.color);
  openContactManage();
  fillContactFields(contact);
}

function closeContactManage() {
  let modal = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DIALOG);
  modal.close();
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
    }
  });
}

function addContactManageEscapeListener(element) {
  element.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.documentElement.style.overflow = "auto";
      document.body.scroll = "yes";
      element.close();
    }
  });
}

async function addNewContact(event) {
  event.preventDefault();
  let nameInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_NAME);
  let mailInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_MAIL);
  let phoneInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_PHONE);

  await reloadContactsFromDatabase();
  if (isContactValid(nameInput, mailInput, phoneInput)) {
    let newContactId = await createNewContact(nameInput.value, mailInput.value, phoneInput.value);
    if (newContactId) {
      initContactList();
      closeContactManage();
      openContactDetails(newContactId);
    }
  }
}

async function editContact(event, contactId) {
  event.preventDefault();
  let nameInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_NAME);
  let mailInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_MAIL);
  let phoneInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_PHONE);

  await reloadContactsFromDatabase();
  if (isContactValid(nameInput, mailInput, phoneInput)) {
    await editExistingContact(contactId, nameInput.value, mailInput.value, phoneInput.value);
    if (contactId) {
      resetForm(CONSTANTS.SELECTORS.CONTACT_FORM);
      createToast("successEditContact");
      initContactList();
      closeContactManage();
      openContactDetails(contactId);
    }
  }
}

async function deleteContactFromContacts(contactId) {
  await reloadContactsFromDatabase();
  removeExistingContactFromTasks(contactId);
  removeExistingContactFromUsers(contactId);
  await deleteExistingContact(contactId);
  createToast("successDeleteContact");
  if (window.screen.width >= 768) {
    initContactList();
    initContactDetails();
  } else {
    window.location.href='./contacts.html';
  }
}

function fillContactFields(contact) {
  document.getElementById(CONSTANTS.SELECTORS.CONTACT_NAME).value = contact.name;
  document.getElementById(CONSTANTS.SELECTORS.CONTACT_MAIL).value = contact.mail;
  document.getElementById(CONSTANTS.SELECTORS.CONTACT_PHONE).value = contact.phone;
}
