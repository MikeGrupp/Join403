/**
 * Current logged-in user object
 * 
 * @type {string}
 */
let currentUser = "";

/**
 * Initials of the current logged-in user
 * 
 * @type {string}
 */
let userInitials = "";

/**
 * Initializes the page layout and performs necessary checks based on the provided page name
 * 
 * @async
 * @param {string} pageName - The name of the current page being loaded
 */
async function load(pageName) {
  checkUserLogin(pageName);
  initPageSpecificLayout(pageName, userInitials);
  checkLoginForPageDesign(pageName);
}

/**
 * Initializes the page-specific layout elements based on the page name and user initials
 * 
 * @param {string} pageName - The name of the current page
 * @param {string} userInitials - The initials of the current user
 */
function initPageSpecificLayout(pageName, userInitials) {
  const pagesWithDefaultHeader = ["summary", "task", "board", "contacts"];
  const pagesWithHelpHeader = ["help"];
  const pagesWithNoUserHeader = ["privacy", "legal"];
  if (pagesWithDefaultHeader.includes(pageName)) {
    initDefaultHeader(userInitials);
    initSubmenuListeners("submenu_dialog", "header_user_profile");
  } else if (pagesWithHelpHeader.includes(pageName)) {
    initHelpPageHeader(userInitials);
    initSubmenuListeners("submenu_dialog", "header_user_profile");
  } else if (pagesWithNoUserHeader.includes(pageName)) {
    initNoUserHeader();
  }
}

/**
 * Checks user login status and renders appropriate sidebar content
 * 
 * @param {string} pageName - The name of the current page
 */
function checkLoginForPageDesign(pageName) {
  let getSavedUser = localStorage.getItem('savedUser');
  if (getSavedUser) {
    renderSidebar();
    renderSidebarSummary(pageName);
  } else {
    renderSidebarLogin();
  }
}

/**
 * Initializes the default header with user profile information
 * 
 * @param {string} userInitials - The initials of the current user
 */
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

/**
 * Determines the appropriate CSS class for user initials based on their length
 * 
 * @returns {string} CSS class name for user initials sizing
 */
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

/**
 * Initializes the help page header with user information
 * 
 * @param {string} userInitials - The initials of the current user
 */
function initHelpPageHeader(userInitials) {
  let headerString = templateRenderBasicHeader();
  let fontSize = checkUserInitialsLength();
  headerString += templateRenderHeaderUser(userInitials, fontSize);
  let header = document.getElementById("header");
  header.innerHTML = headerString;
}

/**
 * Initializes the header for pages that don't require user authentication
 */
function initNoUserHeader() {
  let header = document.getElementById("header");
  header.innerHTML = templateRenderBasicHeader();
}

/**
 * Renders the main sidebar navigation for authenticated users
 */
function renderSidebar() {
  let container = document.getElementById("sidebar");
  container.innerHTML = `${templateRenderSidebar()}`;
}

/**
 * Renders the login form in the sidebar for non-authenticated users
 */
function renderSidebarLogin() {
  let container = document.getElementById("sidebar");
  container.innerHTML = `${templateRenderSidebarLogin()}`;
}

/**
 * Renders the sidebar summary section for the current page
 * 
 * @param {string} pageName - The name of the current page
 */
function renderSidebarSummary(pageName) {
  if (pageName != "help") {
    document.getElementById(pageName).innerHTML = templateRenderSidebarSummary(pageName);
    sidebarFocus(pageName);
  }
}

/**
 * Applies focus styling to the current page's sidebar item
 * 
 * @param {string} pageName - The name of the current page
 */
function sidebarFocus(pageName) {
  document.getElementById(pageName).classList.add("bgSummary_focus");
}

/**
 * Verifies user authentication and redirects to login page if necessary
 * 
 * @param {string} pageName - The name of the current page
 */
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

/**
 * Logs out the current user by removing their data from localStorage
 */
function userLogout() {
  if (localStorage.getItem('savedUser')) {
    localStorage.removeItem('savedUser');
    checkUserLogin();
  } else {
    checkUserLogin();
  }
}

/**
 * Includes external HTML content into elements with the w3-include-html attribute
 * 
 * @async
 */
async function includeHtml() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html");
      let resp = await fetch(file);
      if (resp.ok) {
          element.innerHTML = await resp.text();
      } else {
          element.innerHTML = 'Page not found';
      }
  }
}