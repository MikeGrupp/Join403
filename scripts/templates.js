/**
 * Renders the basic header section with logo and title
 *
 * @returns {string} HTML string containing the mobile logo and desktop header title
 */
function templateRenderBasicHeader() {
  return `
      <img class="logo_mobile" src="./assets/img/logoMobile.svg" alt="Join logo" />
      <span class="desktop_header_title">Kanban Project Management Tool</span>
      `;
}

/**
 * Renders the header profile container with help link
 *
 * @returns {string} HTML string containing the profile container with help link
 */
function templateRenderHeaderProfileContainer() {
  return `
      <div id="header_profile_container" class="header_profile_container">
        <a class="help_link" href="./help.html">
          <img class="help_img" src="./assets/img/help.svg" alt="go to help page" />
        </a>
      </div>
        `;
}

/**
 * Renders the user profile button in the header
 *
 * @param {string} initials - The user's initials to display
 * @param {string} fontSize - CSS class name for font size
 * @returns {string} HTML string containing the user profile button
 */
function templateRenderHeaderUser(initials, fontSize) {
  return `
    <button id="header_user_profile" class="header_user_profile ${fontSize}" onclick="openSubmenu('submenu_dialog')">
    ${initials}
    </button>
    `;
}

/**
 * Renders the main sidebar navigation
 *
 * @returns {string} HTML string containing the complete sidebar with logo, navigation links and submenu
 */
function templateRenderSidebar() {
  return `
    <div class="logo">
      <img src="assets/img/logo2.svg" alt="Logo" />
    </div>
    <div class="sidebar_menu">
      <nav class="sidebar_links">
        <a href="index.html" class="bgSummary" id="summary">
          <div class="summary">
            <img src="assets/img/summary.svg" alt="summary" />
            <p>Summary</p>
          </div>
        </a>
        <a href="task.html" class="bgSummary" id="task">
          <div class="summary">
            <img src="assets/img/addTask.svg" alt="addTask" />
            <p>Add Task</p>
          </div>
        </a>
        <a href="board.html" class="bgSummary" id="board">
          <div class="summary">
            <img src="assets/img/board.svg" alt="board" />
            <p>Board</p>
          </div>
        </a>
        <a href="contacts.html" class="bgSummary" id="contacts">
          <div class="summary">
            <img src="assets/img/contacts.svg" alt="contacts" />
            <p>Contacts</p>
          </div>
        </a>
      </nav>
      <div class="sidebar_subMenu subMenu_hide">
        <div class="sidebar_submenu_background" id="privacy">
          <a class="summary" href="privacy.html">
            <p>Privacy Policy</p>
          </a>
        </div>
        <div class="sidebar_submenu_background" id="legal">
          <a class="summary" href="legalNotice.html">
            <p>Legal notice</p>
          </a>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders the focused sidebar item based on current page
 *
 * @param {string} pageName - Current page identifier ('summary'|'task'|'board'|'contacts'|'privacy'|'legal')
 * @returns {string} HTML string containing the focused sidebar item
 */
function templateRenderSidebarSummary(pageName) {
  if (pageName === "summary") {
    return `
      <div class="summary_focus">
        <img src="assets/img/summaryFocus.svg" alt="summary" />
        <p>Summary</p>
      </div>
    `;
  }
  if (pageName === "task") {
    return `
      <div class="summary_focus">
        <img src="assets/img/addTaskFocus.svg" alt="addTask" />
        <p>Add Task</p>
      </div>
    `;
  }
  if (pageName === "board") {
    return `
      <div class="summary_focus">
        <img src="assets/img/boardFocus.svg" alt="board" />
        <p>Board</p>
      </div>
    `;
  }
  if (pageName === "contacts") {
    return `
      <div class="summary_focus">
        <img src="assets/img/contactsFocus.svg" alt="contacts" />
        <p>Contacts</p>
      </div>
    `;
  }
  if (pageName === "privacy") {
    return `
      <div class="summary">
        <p>Privacy Policy</p>
      </div>
    `;
  }
  if (pageName === "legal") {
    return `
      <div class="summary">
        <p>Legal notice</p>
      </div>
    `;
  }
}

/**
 * Renders the login sidebar version
 *
 * @returns {string} HTML string containing the sidebar with login option
 */
function templateRenderSidebarLogin() {
  return `
    <div class="logo">
      <img src="assets/img/logo2.svg" alt="Logo"/>
    </div>
    <div class="sidebar_menu">
      <nav class="sidebar_links">
        <a href="login.html" class="bgSummary" id="login">
          <div class="summary">
            <img src="assets/img/login.svg" alt="summary" />
            <p>Log In</p>
          </div>
        </a>
        </div>
        <div class="sidebar_subMenu">
          <div class="sidebar_submenu_background" id="privacy">
            <a class="summary" href="privacy.html">
              <p>Privacy Policy</p>
            </a>
          </div>
          <div class="sidebar_submenu_background" id="legal">
            <a class="summary" href="legalNotice.html">
              <p>Legal notice</p>
            </a>
          </div>
        </div>
      </nav>
    </div>
  `;
}

/**
 * Renders the summary greeting section
 *
 * @param {string} greetingMessage - Time-based greeting message
 * @param {string} username - User's name
 * @returns {string} HTML string containing the greeting section
 */
function templateRenderSummaryGreeting(greetingMessage, username) {
  return `
        <span class="greeting">${greetingMessage}</span>
        <span class="username">${username}</span>
`;
}
