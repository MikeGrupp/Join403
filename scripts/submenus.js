function initSubmenuListeners() {
  let submenu = document.getElementById("submenu_dialog");
  addOutsideClickClosingListener(submenu, "header_user_profile");
  addEscapeListener(submenu, "header_user_profile");
}

function openSubmenu() {
  let submenu = document.getElementById("submenu_dialog");
  submenu.showModal();
  submenu.focus();
}

function initContactManageSubmenuListeners() {
  let contactManageSubmenu = document.getElementById("contact_manage_submenu");
  addOutsideClickClosingListener(contactManageSubmenu, "contact_burger_menu");
  addEscapeListener(contactManageSubmenu, "contact_burger_menu");
}

function openContactManageSubmenu() {
  let contactManageSubmenu = document.getElementById("contact_manage_submenu");
  contactManageSubmenu.showModal();
  contactManageSubmenu.focus();
}

function addOutsideClickClosingListener(element, elementIdToBlur) {
  element.addEventListener("click", (e) => {
    const elementDimensions = element.getBoundingClientRect();
    if (
      e.clientX < elementDimensions.left ||
      e.clientX > elementDimensions.right ||
      e.clientY < elementDimensions.top ||
      e.clientY > elementDimensions.bottom
    ) {
      element.close();
      document.getElementById(elementIdToBlur).blur();
    }
  });
}

function addEscapeListener(element, elementIdToBlur) {
  element.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      element.close();
      document.getElementById(elementIdToBlur).blur();
    }
  });
}
