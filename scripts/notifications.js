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

function removeToast(toast) {
  toast.classList.add("hide");
  setTimeout(() => toast.remove(), 125);
}
