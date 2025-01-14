async function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let passwordConfirm = document.getElementById('passwordConfirm');
    let initials = determineInitials(name.value);

    if (password.value === passwordConfirm.value) {
        let check = await checkUserEmail();
        if (check === true) {
            postData("users", { "name": name.value, "email": email.value, "password": password.value, "initials": initials });
            postData("/contacts", {name: name.value, initials: initials, mail: email.value, phone: '', color: selectRandomColor()});
            window.location.href = 'login.html?msg=successSignup';
        } else {
            postMsg(`This Email is already in use, please use another`);
        }
    } else {
        postMsg(`Your passwords don't match, please try again.`)
    }
}

function postMsg(msg) {
    msgBox.classList.remove('d-none');
    msgBox.innerHTML = msg
}

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

function previousPage() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let iptPassword = document.getElementById('passwordConfirm');
    iptPassword.addEventListener('input', () => checkPasswordImg('passwordConfirm', 'toggle_confirmPassword'));
});