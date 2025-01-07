function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let password_confirm = document.getElementById('passwordConfirm');

    if (password.value === password_confirm.value) {
        let check = checkUserEmail();
        if (check === true) {
            postData("users", { "name": name.value, "email": email.value, "password": password.value });
            window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
        } else {
            msgBox.classList.remove('d-none');
            msgBox.innerHTML = `This Email is already in use, please use another`;
        }
    } else {
        msgBox.classList.remove('d-none');
        msgBox.innerHTML = `Your passwords don't match, please try again.`;
    }
}

async function checkUserEmail() {
    let email = document.getElementById('email');
    let signUp = true;
    setStoredUsers(await createLoadUsers());
    let user = storedUsers.find(u => u.email === email.value);
    if (user) {
        signUp = false;
    }
    return signUp
}

function checkFormInputs() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('passwordConfirm').value;
    const policy = document.getElementById('privacyPolicy').checked;

    const submitButton = document.getElementById('submitButton');

    if (name && email && password && confirmPassword && policy) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

function previousPage() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'login.html';
    }
}