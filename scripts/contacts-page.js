function initContacts(pageName) {
  if (pageName != "contacts") {
    return;
  }
  initDesktopAddContactButton();
  initContactList();
  initContactDetails();
  initContactManageDialog();
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

function initContactManageDialog() {
  let contactManageDialogHtml = templateRenderContactManageDialog();
  let contactManageDialog = document.getElementById("contact_manage_dialog");
  contactManageDialog.innerHTML = contactManageDialogHtml;
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
  let contactById = document.getElementById(contactId);
  contactById.classList.add("selected_contact");
  contactById.focus();
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
  let nameInput = document.getElementById("contact_manage_name");
  let mailInput = document.getElementById("contact_manage_mail");
  let phoneInput = document.getElementById("contact_manage_phone");

  await reloadContactsFromDatabase();
  if (isContactValid()) {
    let newUserId = await createNewContact(nameInput.value, mailInput.value, phoneInput.value);
    initContactList();
    closeContactManage();
    openContactDetails(newUserId);
  }
}