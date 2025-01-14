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
    text: "Task successfully created",
  },
};

function createToast(notificationId) {
  const text = notificationDetails[notificationId].text;
  const notifications = document.getElementById("notifications");

  const toast = document.createElement("li");
  toast.className = "toast";
  toast.innerHTML = `<span>${text}</span>`;
  notifications.appendChild(toast);
  toast.timeoutId = setTimeout(() => removeToast(toast), notificationDetails.timer);
}

function removeToast(toast) {
  toast.classList.add("hide");
  setTimeout(() => toast.remove(), 125);
}
