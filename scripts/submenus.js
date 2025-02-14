/**
 * Initializes listeners for a submenu, including closing on outside click and Escape key press
 *
 * @param {string} elementId The ID of the submenu element
 * @param {string} elementIdToBlur The ID of the element to blur when the submenu closes
 */
function initSubmenuListeners(elementId, elementIdToBlur) {
  let submenu = document.getElementById(elementId);
  addOutsideClickClosingListener(submenu, elementIdToBlur);
  addEscapeListener(submenu, elementIdToBlur);
}

/**
 * Opens a submenu
 *
 * @param {string} elementId The ID of the submenu element.
 */
function openSubmenu(elementId) {
  let submenu = document.getElementById(elementId);
  submenu.showModal();
  submenu.focus();
}

/**
 * Closes a submenu.
 *
 * @param {string} elementId The ID of the submenu element.
 */
function closeSubmenu(elementId) {
  let submenu = document.getElementById(elementId);
  submenu.showModal();
  submenu.close();
}

/**
 * Adds a listener to close the submenu when clicked outside of it.
 *
 * @param {HTMLElement} element The submenu element.
 * @param {string} elementIdToBlur The ID of the element to blur when the submenu closes.
 */
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

/**
 * Adds a listener to close the submenu when the Escape key is pressed.
 *
 * @param {HTMLElement} element The submenu element.
 * @param {string} elementIdToBlur The ID of the element to blur when the submenu closes.
 */
function addEscapeListener(element, elementIdToBlur) {
  element.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      element.close();
      document.getElementById(elementIdToBlur).blur();
    }
  });
}
