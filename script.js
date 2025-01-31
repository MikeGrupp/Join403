let currentUser = "";
let userInitials = "";

async function load(pageName) {
  checkUserLogin(pageName);
  await initDatabase(pageName);
  initPageSpecificLayout(pageName, userInitials);
  checkLoginForPageDesign(pageName);
}

function initPageSpecificLayout(pageName, userInitials) {
  switch (pageName) {
    case "summary":
    case "task":
    case "board":
    case "contacts":
      initDefaultHeader(userInitials);
      initSubmenu();
      initContacts(pageName);
      break;
    case "help":
      initHelpPageHeader(userInitials);
      initSubmenu();
      break;
    case "privacy":
    case "legal":
      initNoUserHeader();
      break;
    default:
      break;
  }
}

function checkLoginForPageDesign(pageName) {
  let getSavedUser = localStorage.getItem('savedUser');
  if (getSavedUser) {
    renderSidebar();
    renderSidebarSummary(pageName);
  } else {
    renderSidebarLogin();
  }
}

function initDefaultHeader(userInitials) {
  let headerString = templateRenderBasicHeader();
  headerString += templateRenderHeaderProfileContainer();
  let header = document.getElementById("header");
  header.innerHTML = headerString;

  let headerProfileContainer = document.getElementById(
    "header_profile_container"
  );
  let fontSize = checkUserInitialsLength();
  headerProfileContainer.innerHTML += templateRenderHeaderUser(userInitials, fontSize);
}

function checkUserInitialsLength() {
  let length = userInitials.length;

  if (length === 1) {
    return "registered_user_28";
  } else if (length === 2) {
    return "registered_user_20";
  } else if (length === 3) {
    return "registered_user_14";
  } else if (length === 4) {
    return "registered_user_10";
  } else {
    return "registered_user_0";
  }
}

function initHelpPageHeader(userInitials) {
  let headerString = templateRenderBasicHeader();
  let fontSize = checkUserInitialsLength();
  headerString += templateRenderHeaderUser(userInitials, fontSize);
  let header = document.getElementById("header");
  header.innerHTML = headerString;
}

function initNoUserHeader() {
  let header = document.getElementById("header");
  header.innerHTML = templateRenderBasicHeader();
}

function initSubmenu() {
  let submenu = document.getElementById("submenu_dialog");
  submenu.innerHTML = templateRenderSubmenu();
  initSubmenuListeners();
}

function renderSidebar() {
  let container = document.getElementById("sidebar");
  container.innerHTML = `${templateRenderSidebar()}`;
}

function renderSidebarLogin() {
  let container = document.getElementById("sidebar");
  container.innerHTML = `${templateRenderSidebarLogin()}`;
}

function renderSidebarSummary(pageName) {
  if (pageName != "help") {
    document.getElementById(pageName).innerHTML = templateRenderSidebarSummary(pageName);
    sidebarFocus(pageName);
  }
}

function sidebarFocus(pageName) {
  document.getElementById(pageName).classList.add("bgSummary_focus");
}

function checkUserLogin(pageName) {
  if (pageName !== 'privacy' && pageName !== 'legal') {
    let getSavedUser = localStorage.getItem('savedUser');
    if (getSavedUser) {
      let savedUser = JSON.parse(getSavedUser);
      currentUser = savedUser;
      userInitials = currentUser.initials;
    } else {
      window.location.href = 'login.html';
    }
  }
}

function userLogout() {
  if (localStorage.getItem('savedUser')) {
    localStorage.removeItem('savedUser');
    checkUserLogin();
  } else {
    checkUserLogin();
  }
}