/**
 * Configuration object containing notification settings and messages.
 * 
 * @typedef {Object} notificationDetails
 * @property {number} timer - specifies the duration after which the toast will automatically be removed
 * @property {string} text - The toast message to display
*/
const notificationDetails = {
  timer: 925,
  successSignup: {
    text: "You Signed Up successfully",
  },
  successLogin: {
    text: "You successfully Logged In",
  },
  successNewContact: {
    text: "Contact successfully created",
  },
  successEditContact: {
    text: "Contact successfully edited",
  },
  successDeleteContact: {
    text: "Contact successfully deleted",
  },
  successNewTask: {
    text: "Task added to board",
  },
  successDeleteTask: {
    text: "Task successfully deleted",
  },
};

/**
 * Creates and displays a toast notification based on the specified notification ID.
 * The toast will automatically be removed after the duration specified in notificationDetails.timer.
 * For 'successNewTask' notifications, an additional board icon is displayed.
 * 
 * @param {string} notificationId - The key of the notification to display.
 */
function createToast(notificationId) {
  const text = notificationDetails[notificationId].text;
  const notifications = document.getElementById("notifications");
  const toast = document.createElement("li");
  toast.className = "toast";
  toast.innerHTML = `<span>${text}</span>`;
  if (notificationId === "successNewTask") {
    toast.innerHTML += toast.innerHTML = `<img src="assets/img/board.svg" alt="board">`;
  }
  notifications.appendChild(toast);
  toast.timeoutId = setTimeout(() => removeToast(toast), notificationDetails.timer);
}

/**
 * Removes a toast notification with a fade-out animation.
 * First adds a 'hide' class for the animation, then removes the element after 125ms.
 * 
 * @param {HTMLElement} toast - The toast element to remove from the DOM.
 */
function removeToast(toast) {
  toast.classList.add("hide");
  setTimeout(() => toast.remove(), 125);
}
