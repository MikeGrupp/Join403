function load(pageName, user) {
  initPageSpecificLayout(pageName, user);
  renderSidebar();
}

function initPageSpecificLayout(pageName, user) {
  switch (pageName) {
    case "summary":
    case "task":
    case "board":
    case "contacts":
      initDefaultHeader(user);
      initSubmenu();
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

  let headerProfileContainer = document.getElementById("header_profile_container");
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

function renderSidebarSummary(i) {
  let id = "summary" + i;
  let container = document.getElementById(id);
  container.innerHTML = `${templateRenderSidebarSummary(i)}`;
  sidebarFocus(id);
}

function sidebarFocus(id) {
  document.getElementById(id).classList.add("bgSummary_focus");
}
