/**
 * Object containing constants for selectors and classes used in the contacts page
 */
const CONSTANTS = {
  SELECTORS: {
    CONTACT_LIST: "contact_list",
    CONTACT_DETAILS_D: "desktop_contact_details_container",
    CONTACT_DETAILS_M: "mobile_contact_details_container",
    CONTACT_MANAGE_SUBMENU: "contact_manage_submenu",
    CONTACT_BURGER_MENU: "contact_burger_menu",
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

/**
 * Initializes the contacts page by loading contacts, initializing the contact list, and initializing contact details
 *
 * @async
 */
async function initContacts() {
  setStoredContacts(await loadContacts());
  initContactList();
  initContactDetails();
}

/**
 * Initializes the contact list by retrieving stored contacts, sorting them alphabetically,
 * rendering the list HTML, and updating the contact list element in the DOM
 */
function initContactList() {
  const sortedContacts = getStoredContacts().sort((a, b) => a.name.localeCompare(b.name));
  const contactListHtml = renderContactList(sortedContacts);
  document.getElementById(CONSTANTS.SELECTORS.CONTACT_LIST).innerHTML = contactListHtml;
}

/**
 * Renders the HTML for the contact list based on the provided array of contacts
 *
 * @param {Array<Object>} contacts - An array of contact objects, each with properties like
 *                                 `id`, `color`, `initials`, `name`, and `mail`
 * @returns {string} The HTML string representing the rendered contact list
 */
function renderContactList(contacts) {
  let contactListHtml = "";
  let currentFirstLetter = "";
  contacts.forEach((contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (currentFirstLetter !== firstLetter) {
      currentFirstLetter = firstLetter;
      contactListHtml += templateRenderContactListLetter(currentFirstLetter);
    }
    contactListHtml += templateRenderContactListEntry(contact.id, contact.color, contact.initials, contact.name, contact.mail);
  });
  return contactListHtml;
}

/**
 * Initializes the default contact details view for both desktop and mobile
 */
function initContactDetails() {
  let contactDetailsHtml = templateRenderContactDetailsDefault();
  let contactDetails = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DETAILS_D);
  contactDetails.innerHTML = contactDetailsHtml;
  let contactDetailsMobile = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DETAILS_M);
  contactDetailsMobile.innerHTML = contactDetailsHtml;
}

/**
 * Initializes the contact management dialog with the specified mode (create or edit) and contact details
 *
 * @param {string} mode - The mode of the dialog (create or edit)
 * @param {string} contactId - The ID of the contact being edited
 * @param {string} initials - The initials of the contact being edited
 * @param {string} color - The color of the contact being edited
 */
function initContactManageDialog(mode, contactId, initials, color) {
  let contactManageDialogHtml = templateRenderContactManageDialog(mode, contactId, initials, color);
  let contactManageDialog = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DIALOG);
  contactManageDialog.innerHTML = contactManageDialogHtml;
}

/**
 * Opens the contact details view for the specified contact
 *
 * @param {string} contactId - The ID of the contact to display
 */
function openContactDetails(contactId) {
  dNone(CONSTANTS.SELECTORS.CONTACT_DETAILS_M);
  markAsSelectedContact(contactId);
  let contact = getStoredContactById(contactId);
  initContactDetailsDesktop(contact);
  initContactDetailsMobile(contact);
}

/**
 * Initializes the contact details view for desktop
 *
 * @param {object} contact - The contact object to display
 */
function initContactDetailsDesktop(contact) {
  let contactDetailsDesktopHtml = templateRenderContactDetailsDefault();
  if (contact != null) {
    contactDetailsDesktopHtml += templateRenderContactDetailsForContact(false, contact.id, contact.color, contact.initials, contact.name, contact.mail, contact.phone
    );
    let contactDetails = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DETAILS_D);
    contactDetails.innerHTML = contactDetailsDesktopHtml;
  }
}

/**
 * Initializes the contact details view for mobile
 *
 * @param {object} contact - The contact object to display
 */
function initContactDetailsMobile(contact) {
  let contactDetailsMobileHtml = templateRenderContactDetailsDefault();
  if (contact != null) {
    contactDetailsMobileHtml += templateRenderContactDetailsForContact(true, contact.id, contact.color, contact.initials, contact.name, contact.mail, contact.phone);
    let contactDetailsMobile = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DETAILS_M);
    contactDetailsMobile.innerHTML = contactDetailsMobileHtml;
    initContactManageSubmenu(contact.id);
  }
}

/**
 * Initializes the contact management submenu for the specified contact
 *
 * @param {string} contactId - The ID of the contact
 */
function initContactManageSubmenu(contactId) {
  let contactManageSubmenu = document.getElementById(CONSTANTS.SELECTORS.CONTACT_MANAGE_SUBMENU);
  contactManageSubmenu.innerHTML = templateRenderContactDetailsMenuForContact(contactId);
  initSubmenuListeners(CONSTANTS.SELECTORS.CONTACT_MANAGE_SUBMENU, CONSTANTS.SELECTORS.CONTACT_BURGER_MENU);
}

/**
 * Marks the specified contact as selected in the contact list
 *
 * @param {string} contactId - The ID of the contact to mark as selected
 */
function markAsSelectedContact(contactId) {
  let contacts = document.getElementsByClassName(CONSTANTS.CLASSES.CONTACT);
  for (let i = 0; i < contacts.length; i++) {
    contacts[i].classList.remove(CONSTANTS.CLASSES.SELECTED_CONTACT);
  }
  let contactById = document.getElementById(contactId);
  contactById.classList.add(CONSTANTS.CLASSES.SELECTED_CONTACT);
  contactById.focus();
}

/**
 * Opens the contact management dialog
 */
function openContactManage() {
  document.activeElement?.blur();
  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no";
  let modal = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DIALOG);
  addContactManageOutsideClickClosingListener(modal);
  addContactManageEscapeListener(modal);
  addContactFieldsFocusListeners();
  modal.showModal();
}

/**
 * Opens the contact management dialog in create mode
 */
function openCreateContact() {
  initContactManageDialog("create");
  openContactManage();
}

/**
 * Opens the contact management dialog in edit mode for the specified contact
 *
 * @param {string} contactId - The ID of the contact to edit
 */
function openEditContact(contactId) {
  reloadContactsFromDatabase();
  let contact = getStoredContactById(contactId);
  initContactManageDialog("edit", contactId, contact.initials, contact.color);
  openContactManage();
  fillContactFields(contact);
}

/**
 * Closes the contact management dialog
 */
function closeContactManage() {
  let modal = document.getElementById(CONSTANTS.SELECTORS.CONTACT_DIALOG);
  modal.close();
}

/**
 * Adds an event listener to close the contact management dialog when the user clicks outside of it
 *
 * @param {HTMLElement} element - The contact management dialog element
 */
function addContactManageOutsideClickClosingListener(el) {
  el.addEventListener("click", (e) => {
    const rect = el.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
      document.documentElement.style.overflow = "auto";
      document.body.scroll = "yes";
      el.close();
    }
  });
}

/**
 * Adds an event listener to close the contact management dialog when the Escape key is pressed
 *
 * @param {HTMLElement} element - The contact management dialog element
 */
function addContactManageEscapeListener(element) {
  element.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.documentElement.style.overflow = "auto";
      document.body.scroll = "yes";
      element.close();
    }
  });
}

/**
 * Adds a new contact to the database
 *
 * @async
 * @param {Event} event - The form submit event
 */
async function addNewContact(event) {
  event.preventDefault();
  let nameInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_NAME);
  let mailInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_MAIL);
  let phoneInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_PHONE);
  await reloadContactsFromDatabase();
  if (isContactValid(nameInput, mailInput, phoneInput, false)) {
    await createAndOpenContact(nameInput, mailInput, phoneInput);
  }
}

/**
 * Creates a new contact and opens its details in the UI
 *
 * @async
 * @param {HTMLInputElement} nameInput - The input element for the contact's name
 * @param {HTMLInputElement} mailInput - The input element for the contact's email
 * @param {HTMLInputElement} phoneInput - The input element for the contact's phone number
 */
async function createAndOpenContact(nameInput, mailInput, phoneInput) {
  const newContactId = await createNewContact(nameInput.value, mailInput.value, phoneInput.value);
  if (newContactId) {
    initContactList();
    closeContactManage();
    openContactDetails(newContactId);
  }
}

/**
 * Edits an existing contact in the database
 *
 * @async
 * @param {Event} event - The form submit event
 * @param {string} contactId - The ID of the contact to edit
 */
async function editContact(event, contactId) {
  event.preventDefault();
  const nameInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_NAME);
  const mailInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_MAIL);
  const phoneInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_PHONE);
  await reloadContactsFromDatabase();
  if (isContactValid(nameInput, mailInput, phoneInput, false)) {
    await editAndOpenContact(contactId, nameInput, mailInput, phoneInput);
  }
}

/**
 * Edits an existing contact and opens its details in the UI
 *
 * @async
 * @param {number} contactId - The ID of the contact to edit
 * @param {HTMLInputElement} nameInput - The input element for the contact's name
 * @param {HTMLInputElement} mailInput - The input element for the contact's email
 * @param {HTMLInputElement} phoneInput - The input element for the contact's phone number
 */
async function editAndOpenContact(contactId, nameInput, mailInput, phoneInput) {
  await editExistingContact(contactId, nameInput.value, mailInput.value, phoneInput.value);
  if (contactId) {
    resetForm(CONSTANTS.SELECTORS.CONTACT_FORM);
    createToast("successEditContact");
    initContactList();
    closeContactManage();
    closeSubmenu(CONSTANTS.SELECTORS.CONTACT_MANAGE_SUBMENU);
    openContactDetails(contactId);
  }
}

/**
 * Deletes a contact from the database and related tasks/users
 *
 * @async
 * @param {string} contactId - The ID of the contact to delete
 */
async function deleteContactFromContacts(contactId) {
  await reloadContactsFromDatabase();
  removeExistingContactFromTasks(contactId);
  removeExistingContactFromUsers(contactId);
  await deleteExistingContact(contactId);
  createToast("successDeleteContact");
  initContactList();
  initContactDetails();
  closeSubmenu(CONSTANTS.SELECTORS.CONTACT_MANAGE_SUBMENU);
  dNone(CONSTANTS.SELECTORS.CONTACT_DETAILS_M);
}

/**
 * Fills the contact form fields with the data from the given contact object
 *
 * @param {object} contact - The contact object containing the data to fill the form.  Assumed to have properties: name, mail, phone
 */
function fillContactFields(contact) {
  document.getElementById(CONSTANTS.SELECTORS.CONTACT_NAME).value = contact.name;
  document.getElementById(CONSTANTS.SELECTORS.CONTACT_MAIL).value = contact.mail;
  document.getElementById(CONSTANTS.SELECTORS.CONTACT_PHONE).value = contact.phone;
}

/**
 * Adds focus listeners to the contact name, email, and phone input fields
 * When these fields gain focus, the 'touched' class is added to them
 */
function addContactFieldsFocusListeners() {
  addFormFocusListener(document.getElementById(CONSTANTS.SELECTORS.CONTACT_NAME));
  addFormFocusListener(document.getElementById(CONSTANTS.SELECTORS.CONTACT_MAIL));
  addFormFocusListener(document.getElementById(CONSTANTS.SELECTORS.CONTACT_PHONE));
}

/**
 * Adds a focus listener to the given element
 * When the element gains focus, the 'touched' class is added to it
 *
 * @param {HTMLElement} element - The HTML element to add the focus listener to
 */
function addFormFocusListener(element) {
  element.addEventListener('focus', () => {
    element.classList.add('touched');
  });
}

/**
 * Adds the 'touched' class to all contact form fields
 */
function touchAllContactFields() {
  document.getElementById(CONSTANTS.SELECTORS.CONTACT_NAME).classList.add('touched');
  document.getElementById(CONSTANTS.SELECTORS.CONTACT_MAIL).classList.add('touched');
  document.getElementById(CONSTANTS.SELECTORS.CONTACT_PHONE).classList.add('touched');
}

/**
 * Validates the contact form by calling the `isContactValid` function with the appropriate field elements
 *
 * @param {boolean} fieldFocusCheck - A boolean indicating whether to check field focus
 */
function validateContact(fieldFocusCheck) {
  let nameInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_NAME);
  let mailInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_MAIL);
  let phoneInput = document.getElementById(CONSTANTS.SELECTORS.CONTACT_PHONE);
  isContactValid(nameInput, mailInput, phoneInput, fieldFocusCheck);
}

