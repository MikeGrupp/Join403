/**
 * Array to store subtasks for a task
 *
 * @type {Array<string>}
 */
let addTaskSubtasks = [];

/**
 * Array to store contact IDs
 *
 * @type {Array<string>}
 */
let contactIds = [];

/**
 * Array to store assigned contacts
 * @type {Array<Object>}
 */
let assignedContacts = [];

/**
 * Array to store search results for contacts
 * @type {Array<string>}
 */
let searchContactsArray = [];

/**
 * String representing the current amount of Accounts
 *
 * @type {string}
 */
let addedAccounts = 0;

/**
 * Renders the dropdown container with contacts
 */
function renderDropdownContainerContacts() {
  let container = document.getElementById("dropdownContainer");
  container.innerHTML = ``;
  for (let i = 0; i < contactIds.length; i++) {
    let contactId = contactIds[i];
    let contact = storedContacts[contactId];
    let name = contact.name;
    let initials = contact.initials;
    let color = contact.color;
    container.innerHTML += templaterenderDropdownContainerContacts(
      contactId,
      initials,
      name,
      color
    );
  }
  checkAssignedContacts();
}

/**
 * Renders the assigned contacts
 */
function renderAddTaskAssignedContacts() {
  let container = document.getElementById("assignedContactsContainer");
  container.innerHTML = ``;
  for (let i = 0; i < assignedContacts.length; i++) {
    let assignedContact = assignedContacts[i];
    let initials = assignedContact.initials;
    let color = assignedContact.color;
    container.innerHTML += `
        <div class="task_account1 bg_${color}">${initials}</div>
      `;
  }
}

/**
 * check or uncheck currentCheckBox
 */
function addTaskAssignedContactsCheckbox(contactId) {
  let currentCheckBox = document.getElementById("checkbox" + contactId);
  if (currentCheckBox.checked == false) {
    currentCheckBox.checked = true;
  } else {
    currentCheckBox.checked = false;
  }
}

/**
 * Searches for contacts based on the input value
 *
 * @async
 */
async function searchContacts() {
  let filterword = document
    .getElementById("addTaskAssignedTo")
    .value.toLowerCase();
  let length = filterword.length;
  searchContactsArray = [];
  contactIds = [];
  await fetchContactsIds();
  if (length === 0) {
    document.getElementById("addTaskAssignedTo").value = "";
    renderDropdownContainerContacts();
  } else if (length > 0) {
    for (let i = 0; i < contactIds.length; i++) {
      let contactId = contactIds[i];
      let name = storedContacts[contactId].name.toLowerCase();
      if (name.includes(filterword)) {
        searchContactsArray.push(contactId);
      }
    }
    contactIds = searchContactsArray;
    renderDropdownContainerContacts();
  }
}

/**
 * Adds or removes a contact from the assigned contacts list
 *
 * @param {string} contactId - The ID of the contact to add or remove
 */
function addTaskAssignedContacts(contactId) {
  let currentCheckBox = document.getElementById("checkbox" + contactId);
  let assignedContact = storedContacts[contactId];
  if (addedAccounts < 4) {
    if (currentCheckBox.checked == false) {
      assignedAccounts.push(assignedContact);
      assignedAccountsIds.push(assignedContact);
      assignedContacts.push(assignedContact);
      currentCheckBox.checked = true;
      addedAccounts++;
    } else {
      let index = assignedContacts.findIndex((item) => item.id === contactId);
      assignedAccounts.splice(assignedContact);
      assignedAccountsIds.splice(assignedContact);
      assignedContacts.splice(index, 1);
      currentCheckBox.checked = false;
      addedAccounts--;
    }
    document.getElementById("addTaskRequiredContacts").classList.add("d-none");
  } else {
    if (currentCheckBox.checked == true) {
      let index = assignedContacts.findIndex((item) => item.id === contactId);
      assignedAccounts.splice(assignedContact);
      assignedAccountsIds.splice(assignedContact);
      assignedContacts.splice(index, 1);
      currentCheckBox.checked = false;
      addedAccounts--;
      document
        .getElementById("addTaskRequiredContacts")
        .classList.add("d-none");
    } else {
      document
        .getElementById("addTaskRequiredContacts")
        .classList.remove("d-none");
    }
  }
  renderAddTaskAssignedContacts();
}

/**
 * Fetches contact IDs and stores them in the `contactIds` array
 *
 * @async
 */
async function fetchContactsIds() {
  setStoredContacts(await loadContacts());
  let contactResponse = storedContacts;
  let contactKeysArray = Object.keys(contactResponse);
  for (let i = 0; i < contactKeysArray.length; i++) {
    contactIds.push(contactKeysArray[i]);
  }
}
