function templateRenderBasicHeader() {
  return `
      <img class="logo_mobile" src="./assets/img/logo-mobile.svg" alt="Join logo" />
      <span class="desktop_header_title">Kanban Project Management Tool</span>
      `;
}

function templateRenderHeaderProfileContainer() {
  return `
      <div id="header_profile_container" class="header_profile_container">
        <a class="help_link" href="./help.html">
          <img class="help_img" src="./assets/img/help.svg" alt="go to help page" />
        </a>
      </div>
        `;
}

function templateRenderHeaderUser(user) {
  let templateString = ``;
  if (user != null) {
    templateString += `
    <button id="header_user_profile" class="header_user_profile registered_user" onclick="openSubmenu()">
    SM
    </button>
    `;
  } else {
    templateString += `
        <button class="header_user_profile guest" onclick="openSubmenu()">
        G
        </button>
        `;
  }
  return templateString;
}

function templateRenderSubmenu() {
  return `
      <menu id="submenu" class="submenu">
        <li class="submenu_entry toggle_help_entry">
          <a class="submenu_entry_link" href="./help.html">Help</a>
        </li>
        <li class="submenu_entry">
          <a class="submenu_entry_link" href="./legal_notice.html">Legal Notice</a>
        </li>
        <li class="submenu_entry">
          <a class="submenu_entry_link" href="./privacy.html">Privacy Policy</a>
        </li>
        <li class="submenu_entry">
          <a class="submenu_entry_link" href="#">Log out</a>
        </li>
      </menu>
        `;
}

function templateRenderSidebar() {
  return `
  <div class="logo">
  <img src="assets/img/Logo2.svg" alt="Logo" />
    </div>
    <div class="sidebar_menu">
      <div class="sidebar_links">
        <a href="index.html" class="bgSummary" id="summary1">
          <div class="summary">
            <img src="assets/img/summary.svg" alt="summary" />
            <p>Summary</p>
          </div>
        </a>
        <a href="task.html" class="bgSummary" id="summary2">
          <div class="summary">
            <img src="assets/img/addTask.svg" alt="addTask" />
            <p>Add Task</p>
          </div>
        </a>
        <a href="board.html" class="bgSummary" id="summary3">
          <div class="summary">
            <img src="assets/img/board.svg" alt="board" />
            <p>Board</p>
          </div>
        </a>
        <a href="contact.html" class="bgSummary" id="summary4">
          <div class="summary">
            <img src="assets/img/contact.svg" alt="contact" />
            <p>Contacts</p>
          </div>
        </a>
      </div>
      <div class="sidebar_subMenu">
        <a class="summary" href="privacy.html">
          <p>Privacy Policy</p>
        </a>
        <a class="summary" href="legal_notice.html">
          <p>Legal notice</p>
        </a>
      </div>
    </div>
  `;
}

function templateRenderSidebarSummary(id) {
  if (id === 1) {
    return `
      <a class="summary_focus" href="index.html">
        <img src="assets/img/summary_focus.svg" alt="summary" />
        <p>Summary</p>
      </a>
    `;
  }
  if (id === 2) {
    return `
      <a class="summary_focus" href="task.html">
        <img src="assets/img/addTask_focus.svg" alt="addTask" />
        <p>Add Task</p>
      </a>
    `;
  }
  if (id === 3) {
    return `
      <a class="summary_focus" href="board.html">
        <img src="assets/img/board_focus.svg" alt="board" />
        <p>Board</p>
      </a>
    `;
  }
  if (id === 4) {
    return `
      <a class="summary_focus" href="contact.html">
        <img src="assets/img/contact_focus.svg" alt="contact" />
        <p>Contacts</p>
      </a>
    `;
  }
}
