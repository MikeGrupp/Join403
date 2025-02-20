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
    const isValidSignup = await validateSignupDetails(email, name, password, passwordConfirm);
    if (!isValidSignup) {
        return;
    }
    await createUserAccount(name, email, password, initials);
}

/**
 * Validates the signup details, including email format, availability, name, and password.
 * Calls individual validation functions for each field.
 *
 * @param {HTMLInputElement} email - The email input field.
 * @param {HTMLInputElement} name - The name input field.
 * @param {HTMLInputElement} password - The password input field.
 * @returns {Promise<boolean>} - Whether the signup details are valid
 */
async function validateSignupDetails(email, name, password, passwordConfirm) {
    if (!await checkUserEmail()) { return false; }
    if (!validateEmail(email.value)) { return false; }
    if (!validateName(name.value)) { return false; }
    if (!validatePassword(password.value)) { return false; }
    if (!validatePassword(passwordConfirm.value, password.value)) { return false; }
    return true;
}

/**
 * Validates the name input.
 * - Ensures the name is at least 2 characters long and does not contain invalid characters.
 *
 * @param {string} name - The name to validate.
 * @returns {boolean} - Returns true if valid, otherwise false. Also posts a message if invalid.
 */
function validateName(name) {
    name = name.trim();
    if (name.replace(/\s/g, "").length < 2) {
        postMsg(`Name must consist of at least 2 characters.`, `msgBoxName`);
        return false;
    }
    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
    if (!namePattern.test(name)) {
        postMsg(`Only letters, spaces, and hyphens are allowed.`, `msgBoxName`);
        return false;
    }
    document.getElementById("msgBoxName").innerHTML = "";
    return true;
}

/**
 * Validates the email format.
 *
 * @param {string} email - The email to validate.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        postMsg(`Please enter a valid Email.`, `msgBoxEmail`);
        return false;
    }
    document.getElementById("msgBoxEmail").innerHTML = "";
    return true;
}

/**
 * Validates the password.
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} - Returns true if valid, otherwise false.
 */
function validatePassword(password) {
    const passwordPattern = /^(?!.*\s).{8,}$/;
    if (!passwordPattern.test(password)) {
        postMsg(`Password must be at least 8 characters, no spaces.`, `msgBoxPassword`);
        return false;
    }
    document.getElementById("msgBoxPassword").innerHTML = "";
    return true;
}

/**
 * Validates whether the password confirmation matches the original password.
 *
 * @param {string} passwordConfirm - The confirmed password.
 * @param {string} password - The original password.
 * @returns {boolean} - Returns true if passwords match, otherwise false.
 */
function validatePasswordConfirm(passwordConfirm, password) {
    if (passwordConfirm !== password) {
        postMsg(`Your passwords don't match, please try again.`, `msgBoxPasswordConfirm`);
        return false;
    }
    document.getElementById("msgBoxPasswordConfirm").innerHTML = "";
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
    const newContactId = await postData("/contacts", { name: name.value, initials: initials, mail: email.value, phone: '', color: selectRandomColor() });
    await postData("users", { name: name.value, email: email.value, password: password.value, assignedContact: newContactId, initials: initials });
    window.location.href = 'login.html?msg=successSignup';
}

/**
 * Displays a message in the specified message box.
 *
 * @param {string} msg - The message to be displayed.
 * @param {string} id - The ID of the message box element.
 */
function postMsg(msg, id) {
    let msgBoxId = document.getElementById(id);
    msgBoxId.classList.remove('d-none');
    msgBoxId.innerHTML = msg
}

/**
 * Checks if the provided email is already in use.
 * Displays a message if the email is already taken.
 *
 * @returns {Promise<boolean>} - Returns true if the email is available, otherwise false.
 */
async function checkUserEmail() {
    let email = document.getElementById('email');
    setStoredUsers(await loadUsers());
    let user = storedUsers.find(u => u.email === email.value);
    if (user) {
        postMsg(`This Email is already in use, please use another.`, `msgBoxEmail`);
        return false;
    }
    return true;
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

// Sicherstellen, dass das Skript erst ausgeführt wird, wenn das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
    /**
     * Adds a blur event to the name input field to validate the name when the user leaves the field.
     */
    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.addEventListener('blur', function () {
            validateName(this.value);
        });
    }

    /**
     * Adds a blur event to the email input field to validate the email when the user leaves the field.
     */
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            validateEmail(this.value);
        });
    }

    /**
     * Adds a blur event to the password input field to validate the password when the user leaves the field.
     */
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('blur', function () {
            validatePassword(this.value);
        });
    }

    /**
     * Adds a blur event to the password confirmation input field to validate the password match when the user leaves the field.
     */
    const passwordConfirmInput = document.getElementById('passwordConfirm');
    if (passwordConfirmInput) {
        passwordConfirmInput.addEventListener('blur', function () {
            validatePasswordConfirm(this.value, document.getElementById('password').value);
        });
    }
});
