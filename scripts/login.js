/**
 * Array to store user objects
 *
 * @type {Array<Object>}
 */
let storedUsers = [];

/**
 * Array to store login credentials for "remember me" functionality
 *
 * @type {Array<Object>}
 */
let storedLogin = [];

/**
 * Initializes the login page, retrieves stored login credentials, and displays any messages
 */
function initLogin() {
  getLoginLocalStorage();
  msgRender();
}

/**
 * Renders a toast message if a message parameter is present in the URL
 */
function msgRender() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");
  if (msg) {
    createToast(msg);
  }
}

/**
 * Gets form elements from the DOM
 * 
 * @returns {Object} Object containing form elements
 */
function getLoginFormElements() {
  return {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    rememberMe: document.getElementById("rememberLogin")
  };
}

/**
 * Validates user credentials against stored users
 * 
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Array} users - Array of stored users
 * @returns {Object|null} Found user or null
 */
function validateUser(email, password, users) {
  return users.find((u) => u.email === email && u.password === password);
}

/**
 * Handles remember me functionality
 * 
 * @param {boolean} isChecked - Remember me checkbox state
 * @param {string} email - User email
 * @param {string} password - User password
 */
function handleRememberMe(isChecked, email, password) {
  if (isChecked) {
    rememberMyLogin(email, password);
  } else {
    removeMyLogin();
  }
}

/**
 * Handles user login
 *
 * @async
 */
async function login() {
  const { email, password, rememberMe } = getLoginFormElements();
  let login = false;
  setStoredUsers(await loadUsers());
  const user = validateUser(email.value, password.value, storedUsers);
  if (user) {
    login = true;
    handleRememberMe(rememberMe.checked, email.value, password.value);
  }
  checkLogin(login);
}

/**
 * Checks the login status and redirects or displays an error message
 *
 * @async
 * @param {boolean} login - The login status.
 */
async function checkLogin(login) {
  if (login == true) {
    setCurrentUser(saveCurrentUser());
    window.location.href = "index.html?msg=successLogin";
  } else {
    msgBox.innerHTML = "Username or password wrong, please try again";
    msgBox.classList.remove("d-none");
  }
}

/**
 * Saves the current user's data
 *
 * @returns {User} The current user's data
 */
function saveCurrentUser() {
  let userJson = storedUsers.find((u) => u.email === email.value && u.password === password.value);
  return userJson;
}

/**
 * Sets the current user
 *
 * @param {User} user - The user object to set as current
 */
function setCurrentUser(user) {
  currentUser = user;
  saveCurrentUserLocalStorage();
}

/**
 * Handles guest login
 */
function guestLogin() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  email.value = "guest@join.de";
  password.value = "join123";
  login();
}

/**
 * Remembers the user's login credentials
 *
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 */
function rememberMyLogin(email, password) {
  const rememberCheckBox = document.getElementById("rememberLogin").checked;
  if (rememberCheckBox) {
    storedLogin = [
      {
        savedEmail: email,
        savedPassword: password,
      },
    ];
    saveLoginLocalStorage();
  }
}

/**
 * Removes stored login credentials
 */
function removeMyLogin() {
  if (localStorage.getItem("savedLogin")) {
    localStorage.removeItem("savedLogin");
  }
}

/**
 * Saves login credentials to local storage
 */
function saveLoginLocalStorage() {
  localStorage.setItem("savedLogin", JSON.stringify(storedLogin));
}

/**
 * Retrieves login credentials from local storage
 */
function getLoginLocalStorage() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let getSavedLogin = localStorage.getItem("savedLogin");
  if (getSavedLogin) {
    let savedLogin = JSON.parse(getSavedLogin);
    storedLogin = savedLogin;
    email.value = storedLogin[0].savedEmail;
    password.value = storedLogin[0].savedPassword;
    document.getElementById("rememberLogin").checked = true;
  }
}

/**
 * Saves the current user's data to local storage
 */
function saveCurrentUserLocalStorage() {
  localStorage.setItem("savedUser", JSON.stringify(currentUser));
}

/**
 * Sets the stored users
 *
 * @param {Array<Object>} users - The array of users
 */
function setStoredUsers(users) {
  storedUsers = users;
}

/**
 * Maps a JSON object to an array of User objects
 *
 * @param {Object} json - The JSON object to map
 * @returns {Object|null} An array of User objects, or null if the input is null
 */
function mapUsersJson(json) {
  if (json == null) {
    return null;
  }
  return Object.entries(json).map(([firebaseId, users]) => ({
    id: firebaseId,
    email: users.email,
    password: users.password,
    initials: users.initials,
  }));
}

/**
 * Toggles the password visibility
 *
 * @param {string} inputId - The ID of the password input field
 * @param {string} imgId - The ID of the image element to toggle
 */
function togglePassword(inputId, imgId) {
  let iptPassword = document.getElementById(inputId);
  if (iptPassword.value !== "") {
    if (iptPassword.type === "password") {
      iptPassword.type = "text";
      changeImgToOpenEye(imgId);
    } else {
      iptPassword.type = "password";
      changeImgToClosedEye(imgId);
    }
  } else {
    changeImgToLock(imgId);
  }
}

/**
 * Checks the password input and updates the visibility icon
 *
 * @param {string} inputId - The ID of the password input field
 * @param {string} imgId - The ID of the image element
 */
function checkPasswordImg(inputId, imgId) {
  let iptPassword = document.getElementById(inputId);

  if (iptPassword.value === "") {
    changeImgToLock(imgId);
  } else {
    if (iptPassword.type === "password") {
      changeImgToClosedEye(imgId);
    } else {
      changeImgToOpenEye(imgId);
    }
  }
}

/**
 * Changes the password visibility icon to a lock
 *
 * @param {string} imgId - The ID of the image element
 */
function changeImgToLock(imgId) {
  let content = document.getElementById(imgId);
  content.src = "./assets/img/lock.svg";
}

/**
 * Changes the password visibility icon to a closed eye
 *
 * @param {string} imgId - The ID of the image element
 */
function changeImgToClosedEye(imgId) {
  let content = document.getElementById(imgId);
  content.src = "./assets/img/visibilityOff.svg";
}

/**
 * Changes the password visibility icon to an open eye
 *
 * @param {string} imgId - The ID of the image element
 */
function changeImgToOpenEye(imgId) {
  let content = document.getElementById(imgId);
  content.src = "./assets/img/visibility.svg";
}

/**
 * Adds an event listener to the password confirmation input field to check password match
 * Called when the DOM is fully loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  let iptPassword = document.getElementById("password");
  iptPassword.addEventListener("input", () => checkPasswordImg("password", "toggle_password"));
});
