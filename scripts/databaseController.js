const BASE_URL =
  "https://join403-42006-default-rtdb.europe-west1.firebasedatabase.app/";

async function loadContacts() {
  let contacts = null;
  try {
    let contactsJson = await loadData("/contacts");
    contacts = mapContactsJson(contactsJson);
  } catch (error) {
    console.error(error);
  }
  return contacts;
}

async function loadUsers() {
  let users = null;
  try {
    let usersJson = await loadData("/users");
    users = mapUsersJson(usersJson);
  } catch (error) {
    console.error(error);
  }
  return users;
}

async function loadTasks() {
  let tasks = null;
  try {
    let tasksJson = await loadData("/tasks");
    tasks = mapTasksJson(tasksJson);
  } catch (error) {
    console.error(error);
  }
  return tasks;
}

async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return await response.json();
}

async function postData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData.name;
}

async function patchData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PATCH",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  return responseData.name;
}

async function deleteData(path = "") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
    header: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}
