function initSubmenu() {
  let submenu = document.getElementById("submenu_dialog");
  addOutsideClickClosingListener(submenu);
  addEscapeListener(submenu);
}

function openSubmenu() {
  let submenu = document.getElementById("submenu_dialog");
  submenu.showModal();
  submenu.focus();
}

function addOutsideClickClosingListener(element) {
  element.addEventListener("click", (e) => {
    const elementDimensions = element.getBoundingClientRect();
    if (
      e.clientX < elementDimensions.left ||
      e.clientX > elementDimensions.right ||
      e.clientY < elementDimensions.top ||
      e.clientY > elementDimensions.bottom
    ) {
      element.close();
      document.getElementById("header_user_profile").blur();
    }
  });
}

function addEscapeListener(element) {
  element.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      element.close();
      document.getElementById("header_user_profile").blur();
    }
  });
}
