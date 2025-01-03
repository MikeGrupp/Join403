async function load(pageName, user) {
  await initDatabase(pageName);
  initPageSpecificLayout(pageName, user);
  renderSidebar();
  renderSidebarSummary(pageName);
}

function initPageSpecificLayout(pageName, user) {
  switch (pageName) {
    case "summary":
    case "task":
    case "board":
    case "contacts":
      initDefaultHeader(user);
      initSubmenu();
      initContacts(pageName);
      break;
    case "help":
      initHelpPageHeader(user);
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

function initDefaultHeader(user) {
  let headerString = templateRenderBasicHeader();
  headerString += templateRenderHeaderProfileContainer();
  let header = document.getElementById("header");
  header.innerHTML = headerString;

  let headerProfileContainer = document.getElementById(
    "header_profile_container"
  );
  headerProfileContainer.innerHTML += templateRenderHeaderUser(user);
}

function initHelpPageHeader(user) {
  let headerString = templateRenderBasicHeader();
  headerString += templateRenderHeaderUser(user);
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

function renderSidebarSummary(pageName) {
  if (pageName != "help") {
    document.getElementById(pageName).innerHTML = templateRenderSidebarSummary(pageName);
    sidebarFocus(pageName);
  }
}

function sidebarFocus(pageName) {
  document.getElementById(pageName).classList.add("bgSummary_focus");
}
