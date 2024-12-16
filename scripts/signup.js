let users = [
    {'email': 'admin@join.de', 'password': 'adminpassword'}
];

function addUser() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({email: email.value, password: password.value});
    window.location.href = 'login.html?msg=Du hast dich erfolgreich registriert';
}

function previousPage() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}