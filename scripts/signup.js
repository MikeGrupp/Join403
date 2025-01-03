function addUser() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let password_confirm = document.getElementById('passwordConfirm');

    if (password.value === password_confirm.value) {
        postData("users", { "email": email.value, "password": password.value });
        window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
    }
}

function checkFormInputs() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('passwordConfirm').value.trim();
    const policy = document.getElementById('privacyPolicy').checked

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
        window.location.href = 'index.html';
    }
}