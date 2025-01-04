let storedUsers = [];
let rememberLogin = [];

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

async function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let login = false;
    setStoredUsers(await createLoadUsers());
    let user = storedUsers.find(u => u.email === email.value && u.password === password.value);
    if (user) {
        login = true;
        rememberLogin(email.value, password.value);
    }
    checkLogin(login);
}

async function checkLogin(login) {
    if (login == true) {
        window.location.href = 'index.html?msg=successfully logged in!';
    } else {
        msgBox.innerHTML = 'Username or password wrong, please try again'
        msgBox.classList.remove('d-none');
    }
}

function guestLogin() {
    window.location.href = 'index.html?msg=successfully logged in as guest!';
}

function setStoredUsers(users) {
    storedUsers = users;
}

function mapUsersJson(json) {
    if (json == null) {
        return null;
    }
    return Object.entries(json).map(([firebaseId, users]) => ({
        id: firebaseId,
        email: users.email,
        password: users.password
    }));
}

function togglePassword() {
    let iptPassword = document.getElementById('password');

    if (password) {
        if (iptPassword.type === 'password') {
            iptPassword.type = 'text';
            changeImgToClosedEye();
        } else {
            iptPassword.type = 'password';
            changeImgToOpenEye();
        }
    } else {
        changeImgToLock();
    }
}

function changeImgToLock(); {
    let content = document.getElementById('toggle_password')
    content.src = './assets/img/lock.svg'
}

function changeImgToClosedEye(); {
    let content = document.getElementById('toggle_password')
    content.src = './assets/img/visibility_off.svg'
}

function changeImgToOpenEye(); {
    let content = document.getElementById('toggle_password')
    content.src = './assets/img/visibility.svg'
}