/**
 * Handles the user signup process
 * Retrieves user input, checks for email existence, creates a new contact and user,
 * and redirects to the login page upon successful signup
 *
 * @async
 */
async function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let passwordConfirm = document.getElementById('passwordConfirm');
    let initials = determineInitials(name.value);

    if (password.value === passwordConfirm.value) {
        let check = await checkUserEmail();
        if (check === true) {
            let newContactId = await postData("/contacts", {name: name.value, initials: initials, mail: email.value, phone: '', color: selectRandomColor()});
            postData("users", { "name": name.value, "email": email.value, "password": password.value, "assignedContact": newContactId, "initials": initials});
            window.location.href = 'login.html?msg=successSignup';
        } else {
            postMsg(`This Email is already in use, please use another`);
        }
    } else {
        postMsg(`Your passwords don't match, please try again.`)
    }
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