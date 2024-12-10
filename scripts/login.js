let users = [
    {'email': 'admin@join.de', 'password': 'adminpassword'}
];

function msgRender() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if (msg) {
        msgBox.classList.remove('d-none');
        msgBox.innerHTML = msg;
    } else {
        msgBox.classList.add('d-none');
    }
}

function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email === email.value && u.password === password.value);
    let msgBox = document.getElementById('msgBox');
    console.log(user);
    if (user) {
        console.log('found user');
    } else {
        console.log('Username or password wrong');
        msgBox.innerHTML = 'Username or password wrong'
        msgBox.classList.remove('d-none');
    }
}