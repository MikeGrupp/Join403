function initSubmenuListeners(elementId, elementIdToBlur) {
  let submenu = document.getElementById(elementId);
  addOutsideClickClosingListener(submenu, elementIdToBlur);
  addEscapeListener(submenu, elementIdToBlur);
}

function openSubmenu(elementId) {
  let submenu = document.getElementById(elementId);
  submenu.showModal();
  submenu.focus();
}

function closeSubmenu(elementId) {
  let submenu = document.getElementById(elementId);
  submenu.showModal();
  submenu.close();
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
