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
    container.innerHTML += templaterenderDropdownContainerContacts(
      contactId,
      contact.initials,
      contact.name,
      contact.color
    );
  } checkAssignedContacts();
}

/**
 * Renders the assigned contacts
 */
function renderAddTaskAssignedContacts() {
  assignedContacts.length > 5 ? renderContactsPlusFour(): renderContactsMinusFour();
}

/**
 * Renders under 4 the assigned contacts 
 */
function renderContactsMinusFour(){
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
 * Renders over 4 the assigned contacts 
 */
function renderContactsPlusFour() {
  let container = document.getElementById("assignedContactsContainer");
  let notRendertAmount = addedAccounts - 5;
  container.innerHTML = ``;
  for (let i = 0; i < 5; i++) {
    let assignedContact = assignedContacts[i];
    let initials = assignedContact.initials;
    let color = assignedContact.color;
    container.innerHTML += `<div class="task_account1 bg_${color}">${initials}</div>`;
  }
  container.innerHTML += `<div class="task_account1 bg_grey">+${notRendertAmount}</div>`;
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
  let input = document.getElementById("addTaskAssignedTo");
  let filter = input.value.toLowerCase();
  await initializeSearch(filter, input);
  renderDropdownContainerContacts();
}

/**
 * Initializes the search process
 *
 * @async
 * @param {string} filter - The filter string
 * @param {HTMLInputElement} input - The input element
 */
async function initializeSearch(filter, input) {
  searchContactsArray = [];
  contactIds = [];
  await fetchContactsIds();
  handleFilter(filter, input);
}

/**
 * Handles the filtering logic
 *
 * @param {string} filter - The filter string
 * @param {HTMLInputElement} input - The input element
 */
function handleFilter(filter, input) {
  if (filter.length === 0) {
    input.value = "";
  } else {
    filterContacts(filter);
  }
}

/**
 * Filters the contacts based on the filter string
 *
 * @param {string} filter - The filter string
 */
function filterContacts(filter) {
  contactIds.forEach((id) => {
    if (storedContacts[id].name.toLowerCase().includes(filter)) {
      searchContactsArray.push(id);
    }
  });
  contactIds = searchContactsArray;
}

/**
 * Adds or removes a contact from the assigned contacts list
 *
 * @param {string} contactId - The ID of the contact to add or remove
 */
function addTaskAssignedContacts(contactId) {
  let currentCheckBox = document.getElementById("checkbox" + contactId);
  let assignedContact = storedContacts[contactId];
  currentCheckBox.checked == false ? addTaskAssignedContactsAdd(assignedContact,contactId): addTaskAssignedContactsRemove(assignedContact,contactId);
  renderAddTaskAssignedContacts();
}

/**
 * Adds a contact from the assigned contacts list
 *
 * @param {string} assignedContact - The ID of the assignedContact to add or remove
 */
function addTaskAssignedContactsAdd(assignedContact,contactId){
  let currentCheckBox = document.getElementById("checkbox" + contactId);
  assignedAccountsIds.push(assignedContact.id);
  assignedContacts.push(assignedContact);
  currentCheckBox.checked = true;
  addedAccounts++;
}

/**
 * Delete a contact from the assigned contacts list
 *
 * @param {string} assignedContact - The ID of the assignedContact to add or remove
 * @param {string} contactId - The ID of the contact to add or remove
 */
function addTaskAssignedContactsRemove(assignedContact,contactId){
  let currentCheckBox = document.getElementById("checkbox" + contactId);
  let index = assignedContacts.findIndex((item) => item.id === contactId);
  assignedAccountsIds.splice(assignedContact);
  assignedContacts.splice(index, 1);
  currentCheckBox.checked = false;
  addedAccounts--;
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
