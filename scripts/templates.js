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

function templateRenderHeaderUser(profileLetters) {
  let templateString = ``;
  if (profileLetters != null) {
    templateString += `
    <button id="header_user_profile" class="header_user_profile registered_user" onclick="openSubmenu()">
    ${profileLetters}
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
      </div>
      <div class="sidebar_subMenu">
        <div class="sidebar_submenu_background" id="privacy">
          <a class="summary" href="privacy.html">
            <p>Privacy Policy</p>
          </a>
        </div>
        <div class="sidebar_submenu_background" id="legal">
          <a class="summary" href="legal_notice.html">
            <p>Legal notice</p>
          </a>
        </div>
      </div>
    </div>
  `;
}

function templateRenderSidebarSummary(id) {
  if (id === "summary") {
    return `
      <a class="summary_focus" href="index.html">
        <img src="assets/img/summary_focus.svg" alt="summary" />
        <p>Summary</p>
      </a>
    `;
  }
  if (id === "task") {
    return `
      <a class="summary_focus" href="task.html">
        <img src="assets/img/addTask_focus.svg" alt="addTask" />
        <p>Add Task</p>
      </a>
    `;
  }
  if (id === "board") {
    return `
      <a class="summary_focus" href="board.html">
        <img src="assets/img/board_focus.svg" alt="board" />
        <p>Board</p>
      </a>
    `;
  }
  if (id === "contacts") {
    return `
      <a class="summary_focus" href="contacts.html">
        <img src="assets/img/contacts_focus.svg" alt="contacts" />
        <p>Contacts</p>
      </a>
    `;
  }
  if (id === "privacy") {
    return `
          <a class="summary" href="privacy.html">
            <p>Privacy Policy</p>
          </a>
    `;
  }
  if (id === "legal") {
    return `
          <a class="summary" href="legal_notice.html">
            <p>Legal notice</p>
          </a>
    `;
  }
}

function templateRenderDesktopAddContactButton() {
  return `
        <button class="add_contact">Add new contact <img src="./assets/img/person_add.svg" alt="add a new contact to the List"></button>
  `;
}

function templateRenderContactListLetter(letter) {
  return `
        <dt>${letter}</dt>
        <div class="horizontal_line"></div>
  `;
}

function templateRenderContactListEntry(id, color, profileLetters, name, mail) {
  return `
  <dd>
    <button class="contact" onclick="openContactDetails(event,'${id}')">
      <span class="profile_badge bg_${color}">${profileLetters}</span>
      <span class="contact_name_mail">
      <span>${name}</span>
      <span class="mail">${mail}</span>
      </span>
    </button>
  </dd>
  `;
}

function templateRenderContactDetailsDefault() {
  return `
        <div class="title_group">
          <h1>Contacts</h1>
          <div class="vertical_line"></div>
          <p role="doc-subtitle">Better with a team</p>
        </div>
  `;
}

function templateRenderContactDetailsForContact(
  color,
  profileLetters,
  name,
  mail,
  phone
) {
  return `
        <div class="contact_details">
          <div class="contact_head">
            <span class="profile_badge_large bg_${color}">${profileLetters}</span>
            <div class="contact_manage">
              <span class="contact_name">${name}</span>
              <menu class="contact_manage_menu">
                <button class="contact_manage_button">
                  <img class="menu_image" src="./assets/img/edit.svg" alt="edit the current contact">
                  <img class="menu_image_hover" src="./assets/img/edit2.svg" alt="edit the current contact">
                  Edit
                </button>
                <button class="contact_manage_button">
                  <img class="menu_image" src="./assets/img/delete.svg" alt="delete the current contact from the List">
                  <img class="menu_image_hover" src="./assets/img/delete2.svg" alt="delete the current contact from the List">
                  Delete
                </button>
              </menu>
            </div>
          </div>
          <div class="contact_information">
            <h2>Contact Information</h2>
          </div>
          <div class="contact_section_container">
            <label>Email</label>
            <span class="mail">${mail}</span>
          </div>
          <div class="contact_section_container">
            <label>Phone</label>
            <span>${phone}</span>
          </div>
        </div>
  `;
}

function templateRenderTask(titel, description, kategory, id) {
  return `
    <div class="board_task" id="${id}">
      <div class="wrapper">
        <div class="board_category">${kategory}</div>
        <div class="task_headline">${titel}</div>
        <div class="task_description">${description}</div>
        <div class="task_subtasks">
          <div class="task_progress_bar"></div>
          <div class="task_subtask_number">1/2 Subtasks</div>
        </div>
        <div class="task_underline">
          <div class="task_accounts">
            <div class="task_account1">AM</div>
            <div class="task_account2">WW</div>
          </div>
          <div class="task_importent">
            <img src="assets/img/Prio media.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  `;
}
