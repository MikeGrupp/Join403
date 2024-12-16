const users = await loadData("users");

function addUser() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let password_confirm = document.getElementById('passwordConfirm');

    if (password.value === password_confirm.value) {
        postData("users", { "email": email.value, "password": password.value });
        window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
    }
}

function previousPage() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}