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
          <a class="submenu_entry_link" href="#" onclick="userLogout()">Log out</a>
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

function templateRenderSidebarSummary(pageName) {
  if (pageName === "summary") {
    return `
      <div class="summary_focus">
        <img src="assets/img/summary_focus.svg" alt="summary" />
        <p>Summary</p>
      </div>
    `;
  }
  if (pageName === "task") {
    return `
      <div class="summary_focus">
        <img src="assets/img/addTask_focus.svg" alt="addTask" />
        <p>Add Task</p>
      </div>
    `;
  }
  if (pageName === "board") {
    return `
      <div class="summary_focus">
        <img src="assets/img/board_focus.svg" alt="board" />
        <p>Board</p>
      </div>
    `;
  }
  if (pageName === "contacts") {
    return `
      <div class="summary_focus">
        <img src="assets/img/contacts_focus.svg" alt="contacts" />
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

function templateRenderDesktopAddContactButton() {
  return `
        <button onclick="openCreateContact()" class="add_contact">Add new contact <img src="./assets/img/person_add.svg" alt="add a new contact to the List"></button>
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
    <button id="${id}" class="contact" onclick="openContactDetails('${id}')">
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
  contactId,
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
                <button onclick="openEditContact('${contactId}')" class="contact_manage_button">
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

function templateRenderContactManageDialog(mode, initials, color) {
  if(mode === "create") {
    return `
        <div class="contact_manage_dialog_container">
          <div class="contact_manage_dialog_title_container">
            <img class="contact_manage_dialog_logo" src="./assets/img/Logo2.svg" alt="">
            <h1  class="contact_manage_dialog_title">Add contact</h1>
            <p class="contact_manage_dialog_subtitle" role="doc-subtitle">Tasks are better with a team!</p>
            <div class="horizontal_blue_line"></div>
          </div>
          <div class="contact_manage_dialog_input_container">
            <button onclick="closeContactManage()" class="contact_manage_close_button">
              <img src="./assets/img/Close.svg" class="contact_manage_close_icon" alt="close icon">
            </button>
            <div class="contact_form_profile_container">
              <span class="profile_badge_large bg_grey contact_form_profile_badge_position">
                <img src="./assets/img/person_white.svg" alt="person icon">
              </span>
              <form class="contact_form_profile" id="contact_form" onsubmit="addNewContact(event)">
                  <div class="contact_form_profile_inputs">
                    <input id="contact_manage_name" class="input_field input_icon_person" type="text" required placeholder="Name" aria-label="Name">
                    <input id="contact_manage_mail" class="input_field input_icon_mail" type="email" required placeholder="Email" aria-label="Email">
                    <input  id="contact_manage_phone" class="input_field input_icon_call" type="tel" placeholder="Phone" aria-label="Phone">
                  </div>
                  <div class="contact_form_profile_buttons">
                    <button class="button button_close" type="reset" onclick="resetForm('contact_form'), closeContactManage()" form="contact_form">
                      Cancel
                      <img class="button_icon" src="./assets/img/button_cancel.svg" alt="">
                    </button>
                    <button class="button button_create" type="submit" form="contact_form">
                      Create contact
                      <img class="button_icon" src="./assets/img/check.svg" alt="">
                    </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
  `;
  } else if(mode === "edit") {
    return `
        <div class="contact_manage_dialog_container">
          <div class="contact_manage_dialog_title_container">
            <img class="contact_manage_dialog_logo" src="./assets/img/Logo2.svg" alt="">
            <h1  class="contact_manage_dialog_title">Edit contact</h1>
            <div class="horizontal_blue_line"></div>
          </div>
          <div class="contact_manage_dialog_input_container">
            <button onclick="closeContactManage()" class="contact_manage_close_button">
              <img src="./assets/img/Close.svg" class="contact_manage_close_icon" alt="close icon">
            </button>
            <div class="contact_form_profile_container">
              <span class="profile_badge_large bg_${color} contact_form_profile_badge_position">
                ${initials}
              </span>
              <form class="contact_form_profile" id="contact_form" onsubmit="addNewContact(event)">
                  <div class="contact_form_profile_inputs">
                    <input id="contact_manage_name" class="input_field input_icon_person" type="text" required placeholder="Name" aria-label="Name">
                    <input id="contact_manage_mail" class="input_field input_icon_mail" type="email" required placeholder="Email" aria-label="Email">
                    <input  id="contact_manage_phone" class="input_field input_icon_call" type="tel" placeholder="Phone" aria-label="Phone">
                  </div>
                  <div class="contact_form_profile_buttons">
                    <button class="button button_close" type="reset" onclick="resetForm('contact_form'), closeContactManage()" form="contact_form">
                      Delete
                      <img class="button_icon" src="./assets/img/button_cancel.svg" alt="">
                    </button>
                    <button class="button button_create" type="submit" form="contact_form">
                      Save
                      <img class="button_icon" src="./assets/img/check.svg" alt="">
                    </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
  `;
  }
  return;
}

function templateRenderTask(
  title,
  description,
  category,
  taskId,
  backgroundColorCategory,
  prio
) {
  return `
    <div
      class="board_task"
      draggable="true"
      ondragstart="startDragging('${taskId}')"
      id="${taskId}"
      onclick="dNone('taskDetailBg'), renderDetailTask('${taskId}')"
    >
      <div class="wrapper">
        <div
          class="board_category"
          style="--backgroundCategory: ${backgroundColorCategory}"
        >
          ${category}
        </div>
        <div class="task_headline">${title}</div>
        <div class="task_description">${description}</div>
        <div class="task_subtasks" id="subtasks${taskId}"></div>
        <div class="task_underline">
          <div class="task_accounts" id="accounts${taskId}"></div>
          <div class="task_important">
            <img src="assets/img/prio_${prio}.svg" alt="${prio}" />
          </div>
        </div>
      </div>
    </div>
  `;
}

function templateRenderSubtasks(
  subtasksInPercent,
  amountSubtasksFinished,
  amountSubtasks
) {
  return `
    <div
      class="task_progress_bar"
      style="--backgroundProgressbar: ${subtasksInPercent}%;"
    ></div>
    <div class="task_subtask_number">
      ${amountSubtasksFinished}/${amountSubtasks} Subtasks
    </div>
  `;
}

function templateRenderAssignedAccounts(initials, accountNr, color, position) {
  return `
            <div class="task_account${accountNr} bg_${color}" style="--position: -${position}px">${initials}</div>

`;
}

function templateRenderDetailTask(
  title,
  description,
  category,
  backgroundColorCategory,
  prio,
  dueDate
) {
  return ` 
  <div class="wrapper">
    <div class="task_detail_category">
      <div
        class="board_category"
        style="--backgroundCategory: ${backgroundColorCategory}"
      >
        ${category}
      </div>
      <div class="detail_task_close_button">
        <img
          src="assets/img/Close.svg"
          alt="close task"
          onclick="taskMoveBack()"
        />
      </div>
    </div>
    <div class="task_detail_headline">${title}</div>
    <div class="detail_task_information">
      <div class="detail_task_description">${description}</div>
      <div class="detail_task_due_date">
        <div class="detail_task_due_date_key">Due date:</div>
        <div class="detail_task_due_date_content">${dueDate}</div>
      </div>
      <div class="detail_task_due_date">
        <div class="detail_task_due_date_key">Priority:</div>
        <div class="detail_task_due_date_content">
          ${prio}
          <img src="assets/img/prio_${prio}.svg" alt="medium" />
        </div>
      </div>
    </div>
    <div class="task_detail_assigned_accounts">
      <div class="task_detail_assigned_accounts_key">Assigned To:</div>
      <div
        class="task_detail_assigned_accounts_content"
        id="detailAssignedAccounts"
      ></div>
    </div>
    <div class="task_detail_subtasks" id="detailSubtasks"></div>
    <div class="detail_task_edit_delete">
      <div class="detail_task_delete">
        <div class="detail_task_delete_img" id="detailTaskDeleteImg"></div>
        Delete
      </div>
      <div class="detail_task_edit">
        <div class="detail_task_edit_img" id="detailTaskEditImg"></div>
        Edit
      </div>
    </div>
  </div>`;
}

function templateRenderDetailAccounts(name, initials, backgroundColor) {
  return ` 
    <div class="task_detail_assigned_account_content">
      <div class="task_account1 bg_${backgroundColor}">${initials}</div>
      <div class="task_account_name">${name}</div>
    </div>`;
}

function templateRenderDetailSubtasks(
  title,
  status,
  checked,
  taskId,
  subtaskId
) {
  return `
    <div class="task_detail_subtask">
      <input onclick="checkSubtask('${taskId}', '${subtaskId}')" type="checkbox" ${checked}/>
      <div class="subtask_text">${title}</div>
    </div>
  `;
}
