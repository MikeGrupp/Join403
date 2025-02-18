/**
 * Adds a new user by validating input fields and making API requests.
 */
async function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let passwordConfirm = document.getElementById('passwordConfirm');
    let initials = determineInitials(name.value);

    await signupValidation(name, email, password, passwordConfirm, initials);
}

/**
 * Main signup validation and registration handler
 * 
 * @param {HTMLElement} name - The name input field
 * @param {HTMLElement} email - The email input field
 * @param {HTMLElement} password - The password input field
 * @param {HTMLElement} passwordConfirm - The password confirmation input field
 * @param {string} initials - The user's initials
 */
async function signupValidation(name, email, password, passwordConfirm, initials) {
    if (password.value !== passwordConfirm.value) {
        return postMsg(`Your passwords don't match, please try again.`);
    }
    const isValidSignup = await validateSignupDetails(email);
    if (!isValidSignup) {
        return;
    }
    await createUserAccount(name, email, password, initials);
}

/**
 * Validates the signup details including email format and availability
 * 
 * @param {HTMLElement} email - The email input field
 * @returns {Promise<boolean>} Whether the signup details are valid
 */
async function validateSignupDetails(email) {
    const isEmailAvailable = await checkUserEmail();
    if (!isEmailAvailable) {
        postMsg(`This Email is already in use, please use another.`);
        return false;
    }
    if (!validateEmail(email.value)) {
        postMsg(`Please enter a valid contact email.`);
        return false;
    }
    return true;
}

/**
 * Creates user account and associated contact
 * 
 * @param {HTMLElement} name - The name input field
 * @param {HTMLElement} email - The email input field
 * @param {HTMLElement} password - The password input field
 * @param {string} initials - The user's initials
 */
async function createUserAccount(name, email, password, initials) {
    const newContactId = await postData("/contacts", {name: name.value, initials: initials, mail: email.value, phone: '', color: selectRandomColor()});
    await postData("users", {name: name.value, email: email.value, password: password.value, assignedContact: newContactId, initials: initials});
    window.location.href = 'login.html?msg=successSignup';
}

/**
 * Validates an email address format.
 * @param {string} input - The email address to validate.
 * @returns {boolean} True if the email format is valid, otherwise false.
 */
function validateEmail(input) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(input);
}

/**
 * Displays a message to the user in the message box
 *
 * @param {string} msg - The message to be displayed
 */
function postMsg(msg) {
    msgBox.classList.remove('d-none');
    msgBox.innerHTML = msg
}

/**
 * Checks if a user with the given email already exists
 *
 * @async
 * @returns {Promise<boolean>} True if the email is not found (signup allowed), false otherwise
 */
async function checkUserEmail() {
    let email = document.getElementById('email');
    let signUp = true;
    setStoredUsers(await loadUsers());
    let user = storedUsers.find(u => u.email === email.value);
    if (user) {
        signUp = false;
    }
    return signUp
}

/**
 * Enables/disables the submit button based on whether all required form inputs are filled
 */
function checkFormInputs() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const policy = document.getElementById('privacyPolicy').checked;
    const submitButton = document.getElementById('submitButton');
    if (name && email && password && passwordConfirm && policy) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

/**
 * Navigates to the previous page in history or to the login page if there's no history
 */
function previousPage() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'login.html';
    }
}

/**
 * Adds an event listener to the password confirmation input field to check password match
 * Called when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    let iptPassword = document.getElementById('passwordConfirm');
    iptPassword.addEventListener('input', () => checkPasswordImg('passwordConfirm', 'toggle_confirmPassword'));
});