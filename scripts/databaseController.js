/**
 * Base URL for the Firebase Realtime Database
 *
 * @type {string}
 */
const BASE_URL = "https://join403-42006-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Loads contacts from the database
 *
 * @async
 * @returns {Promise<Array<object>|null>} A promise that resolves to an array of contact objects, or null if an error occurs.
 */
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

/**
 * Loads users from the database.
 *
 * @async
 * @returns {Promise<Array<object>|null>} A promise that resolves to an array of user objects, or null if an error occurs.
 */
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

/**
 * Loads tasks from the database
 *
 * @async
 * @returns {Promise<Array<object>|null>} A promise that resolves to an array of task objects, or null if an error occurs
 */
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

/**
 * Loads data from the specified path in the database
 *
 * @async
 * @param {string} [path=""] - The path to the data in the database
 * @returns {Promise<object|null>} A promise that resolves to the data as a JSON object, or null if an error occurs
 */
async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return await response.json();
}

/**
 * Posts data to the specified path in the database
 *
 * @async
 * @param {string} [path=""] - The path to post the data to
 * @param {object} [data={}] - The data to post
 * @returns {Promise<string|null>} A promise that resolves to the name generated by Firebase for the new data, or null if an error occurs
 */
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

/**
 * Patches data at the specified path in the database
 *
 * @async
 * @param {string} [path=""] - The path to patch the data at
 * @param {object} [data={}] - The data to patch
 * @returns {Promise<string|null>} A promise that resolves to the name generated by Firebase for the updated data, or null if an error occurs
 */
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

/**
 * Deletes data at the specified path in the database
 *
 * @async
 * @param {string} [path=""] - The path to delete the data at
 * @returns {Promise<object|null>} - A promise that resolves to the response from the delete operation, or null if an error occurs
 */
async function deleteData(path = "") {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "DELETE",
    header: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}
