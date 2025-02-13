let storedUsers = [];
let storedLogin = [];

function initLogin() {
    getLoginLocalStorage();
    msgRender();
}

function msgRender() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if (msg) {
        createToast(msg);
    }
}

async function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let rememberMe = document.getElementById('rememberLogin');
    let login = false;
    setStoredUsers(await loadUsers());
    let user = storedUsers.find(u => u.email === email.value && u.password === password.value);
    if (user) {
        login = true;
        if (rememberMe.checked === true) {
            rememberMyLogin(email.value, password.value);
        }
    }
    if (rememberMe.checked === false) {
        removeMyLogin();
    }
    checkLogin(login);
}

async function checkLogin(login) {
    if (login == true) {
        setCurrentUser(saveCurrentUser());
        window.location.href = 'index.html?msg=successLogin';
    } else {
        msgBox.innerHTML = 'Username or password wrong, please try again'
        msgBox.classList.remove('d-none');
    }
}

function saveCurrentUser() {
    let userJson = storedUsers.find(u => u.email === email.value && u.password === password.value);
    return userJson;
}

function setCurrentUser(user) {
    currentUser = user;
    saveCurrentUserLocalStorage();
}

function guestLogin() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    email.value = 'guest@join.de';
    password.value = 'join123';
    login();
}

function rememberMyLogin(email, password) {
    const rememberCheckBox = document.getElementById('rememberLogin').checked;
    if (rememberCheckBox) {
        storedLogin = [{
            savedEmail: email,
            savedPassword: password
        }];
        saveLoginLocalStorage();
    }
}

function removeMyLogin() {
    if (localStorage.getItem('savedLogin')) {
        localStorage.removeItem('savedLogin');
    }
}

function saveLoginLocalStorage() {
    localStorage.setItem('savedLogin', JSON.stringify(storedLogin));
}

function getLoginLocalStorage() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let getSavedLogin = localStorage.getItem('savedLogin');
    if (getSavedLogin) {
        let savedLogin = JSON.parse(getSavedLogin);
        storedLogin = savedLogin;
        email.value = storedLogin[0].savedEmail;
        password.value = storedLogin[0].savedPassword;
        document.getElementById('rememberLogin').checked = true;
    }
}

function saveCurrentUserLocalStorage() {
    localStorage.setItem('savedUser', JSON.stringify(currentUser));
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
        password: users.password,
        initials: users.initials
    }));
}

function togglePassword(inputId, imgId) {
    let iptPassword = document.getElementById(inputId);

    if (iptPassword.value !== "") {
        if (iptPassword.type === 'password') {
            iptPassword.type = 'text';
            changeImgToOpenEye(imgId);
        } else {
            iptPassword.type = 'password';
            changeImgToClosedEye(imgId);
        }
    } else {
        changeImgToLock(imgId);
    }
}

function checkPasswordImg(inputId, imgId) {
    let iptPassword = document.getElementById(inputId);

    if (iptPassword.value === "") {
        changeImgToLock(imgId);
    } else {
        if (iptPassword.type === 'password') {
            changeImgToClosedEye(imgId);
        } else {
            changeImgToOpenEye(imgId);
        }
    }
}

function changeImgToLock(imgId) {
    let content = document.getElementById(imgId)
    content.src = './assets/img/lock.svg'
}

function changeImgToClosedEye(imgId) {
    let content = document.getElementById(imgId)
    content.src = './assets/img/visibilityOff.svg'
}

function changeImgToOpenEye(imgId) {
    let content = document.getElementById(imgId)
    content.src = './assets/img/visibility.svg'
}

document.addEventListener('DOMContentLoaded', () => {
    let iptPassword = document.getElementById('password');
    iptPassword.addEventListener('input', () => checkPasswordImg('password', 'toggle_password'));
});