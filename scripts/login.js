let storedUsers = [];
let storedLogin = [];

function initLogin() {
    getLoginLocalStorage();
}

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
    let rememberMe = document.getElementById('rememberLogin');
    let login = false;
    setStoredUsers(await createLoadUsers());
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
        window.location.href = 'index.html?msg=successfully logged in!';
    } else {
        msgBox.innerHTML = 'Username or password wrong, please try again'
        msgBox.classList.remove('d-none');
    }
}

function guestLogin() {
    window.location.href = 'index.html?msg=successfully logged in as guest!';
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
        console.log('savedLogin successfully deleted');
    } else {
        console.log('No savedLogin found in localStorage');
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

    if (iptPassword.value !== "") {
        if (iptPassword.type === 'password') {
            iptPassword.type = 'text';
            changeImgToOpenEye();
        } else {
            iptPassword.type = 'password';
            changeImgToClosedEye();
        }
    } else {
        changeImgToLock();
    }
}

function checkPasswordImg() {
    let iptPassword = document.getElementById('password');
    if (iptPassword.value === "") {
        changeImgToLock();
    } else {
        if (iptPassword.type === 'password') {
            changeImgToClosedEye();
        } else {
            changeImgToOpenEye();
        }
    }
}

function changeImgToLock() {
    let content = document.getElementById('toggle_password')
    content.src = './assets/img/lock.svg'
}

function changeImgToClosedEye() {
    let content = document.getElementById('toggle_password')
    content.src = './assets/img/visibility_off.svg'
}

function changeImgToOpenEye() {
    let content = document.getElementById('toggle_password')
    content.src = './assets/img/visibility.svg'
}

document.addEventListener('DOMContentLoaded', () => {
    let iptPassword = document.getElementById('password');
    iptPassword.addEventListener('input', checkPasswordImg);
});