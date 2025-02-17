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
 * Renders a letter divider for the contact list
 *
 * @param {string} letter - The letter to display as divider
 * @returns {string} HTML string containing the letter divider
 */
function templateRenderContactListLetter(letter) {
  return `
        <dt class="list_letter">${letter}</dt>
        <dt class="horizontal_line"></dt>
  `;
}

/**
 * Renders a single contact entry in the contact list
 *
 * @param {string} id - Unique identifier for the contact
 * @param {string} color - CSS color class for the profile badge
 * @param {string} initials - Contact's initials
 * @param {string} name - Contact's full name
 * @param {string} mail - Contact's email address
 * @returns {string} HTML string containing the contact entry
 */
function templateRenderContactListEntry(id, color, initials, name, mail) {
  return `
  <dd>
    <button id="${id}" class="contact" onclick="openContactDetails('${id}')">
      <span class="profile_badge bg_${color}">${initials}</span>
      <span class="contact_name_mail">
      <span>${name}</span>
      <span class="mail">${mail}</span>
      </span>
    </button>
  </dd>
  `;
}

/**
 * Renders the default contact details view
 *
 * @returns {string} HTML string containing the default contact details header
 */
function templateRenderContactDetailsDefault() {
  return `
        <div class="title_group">
          <div class="back_arrow">
            <img class="" src="./assets/img/arrowLeft.svg" onclick="dNone('mobile_contact_details_container')" alt="back to contacts page" />
          </div>
          <h1>Contacts</h1>
          <div class="vertical_line"></div>
          <p role="doc-subtitle">Better with a team</p>
          <div class="horizontal_blue_line"></div>
        </div>
  `;
}

/**
 * Renders detailed contact information
 *
 * @param {boolean} isMobile - Whether the view is for mobile devices
 * @param {string} contactId - Unique identifier for the contact
 * @param {string} color - CSS color class for the profile badge
 * @param {string} initials - Contact's initials
 * @param {string} name - Contact's full name
 * @param {string} mail - Contact's email address
 * @param {string} phone - Contact's phone number
 * @returns {string} HTML string containing the detailed contact information
 */
function templateRenderContactDetailsForContact(
  isMobile,
  contactId,
  color,
  initials,
  name,
  mail,
  phone
) {
  return (
    `
        <div class="contact_details">
          <div class="contact_head">
            <span class="profile_badge_large bg_${color}">${initials}</span>
            <div class="contact_manage">
              <span class="contact_name">${name}</span>` +
    templateRenderContactDetailsMenuForContact(contactId) +
    templateRenderContactDetailsMobileManageMenuButton(isMobile) +
    `</div>
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
  `
  );
}

/**
 * Renders the contact management menu
 *
 * @param {string} contactId - Unique identifier for the contact
 * @returns {string} HTML string containing the contact management menu
 */
function templateRenderContactDetailsMenuForContact(contactId) {
  return `
          <menu class="contact_manage_menu">
            <li>
              <button onclick="openEditContact('${contactId}')" class="contact_manage_button">
                <img class="menu_image" src="./assets/img/edit.svg" alt="edit the current contact">
                <img class="menu_image_hover" src="./assets/img/edit2.svg" alt="edit the current contact">
                Edit
              </button>
            </li>
            <li>
              <button onclick="deleteContactFromContacts('${contactId}')" class="contact_manage_button">
                <img class="menu_image" src="./assets/img/delete.svg" alt="delete the current contact from the List">
                <img class="menu_image_hover" src="./assets/img/delete2.svg" alt="delete the current contact from the List">
                Delete
              </button>
            </li>
          </menu>
  `;
}

/**
 * Renders the mobile menu button for contact management if on mobile
 *
 * @param {boolean} isMobile - Whether the view is for mobile devices
 * @returns {string} HTML string containing the mobile menu button or empty string
 */
function templateRenderContactDetailsMobileManageMenuButton(isMobile) {
  if (isMobile) {
    return `<button id="contact_burger_menu" class="contact_burger_menu" onclick="openSubmenu('contact_manage_submenu')">
              <img class="menu_image" src="./assets/img/moreVert.svg" alt="open options to manage the contact">
            </button>`;
  }
  return "";
}

/**
 * Renders the contact management dialog for creating or editing contacts
 *
 * @param {string} mode - Dialog mode ('create'|'edit')
 * @param {string} [contactId=''] - Contact ID for edit mode
 * @param {string} [initials=''] - Contact initials for edit mode
 * @param {string} [color='grey'] - Profile badge color
 * @returns {string} HTML string containing the contact management dialog
 */
function templateRenderContactManageDialog(
  mode,
  contactId = "",
  initials = "",
  color = "grey"
) {
  const config = {
    create: {
      title: "Add contact",
      subtitle:
        '<p class="contact_manage_dialog_subtitle" role="doc-subtitle">Tasks are better with a team!</p>',
      buttonLeftText: "Cancel",
      buttonLeftOnClick: `resetForm('contact_form'), closeContactManage()`,
      buttonLeftDesktopClass: "button_close_desktop",
      buttonRightText: "Create contact",
      buttonRightEnabled: "disabled",
      onSubmit: "addNewContact(event)",
      profileBadge: `<img src="./assets/img/personWhite.svg" alt="person icon">`,
    },
    edit: {
      title: "Edit contact",
      subtitle: "",
      buttonLeftText: "Delete",
      buttonLeftOnClick: `resetForm('contact_form'), closeContactManage(), deleteContactFromContacts('${contactId}')`,
      buttonLeftDesktopClass: "",
      buttonRightText: "Save",
      buttonRightEnabled: "",
      onSubmit: `editContact(event, '${contactId}')`,
      profileBadge: initials,
    },
  };
  const modeConfig = config[mode];
  if (!modeConfig) {
    return;
  }
  return `
    <div class="contact_manage_dialog_container">
      <button onclick="closeContactManage()" class="contact_manage_close_button">
        <img src="./assets/img/close.svg" class="contact_manage_close_icon" alt="close icon">
      </button>
      <div class="contact_manage_dialog_title_container">
        <img class="contact_manage_dialog_logo" src="./assets/img/logo2.svg" alt="">
        <h1 class="contact_manage_dialog_title">${modeConfig.title}</h1>
        ${modeConfig.subtitle}
        <div class="horizontal_blue_line"></div>
      </div>
      <div class="contact_manage_dialog_input_container">
        <span class="profile_badge_large bg_${color} contact_form_profile_badge_position">
          ${modeConfig.profileBadge}
        </span>
        <div class="contact_form_profile_container">
          <form class="contact_form_profile" id="contact_form">
            <div class="contact_form_profile_inputs">
              <input id="contact_manage_name" class="input_field input_icon_person" type="text" required maxlength="30" placeholder="Name" aria-label="Name" oninput="validateContact(true)">
              <input id="contact_manage_mail" class="input_field input_icon_mail" type="email" required maxlength="30" placeholder="Email" aria-label="Email" oninput="validateContact(true)">
              <input id="contact_manage_phone" class="input_field input_icon_call" type="tel" maxlength="30" placeholder="Phone" aria-label="Phone" oninput="validateContact(true)">
            </div>
            <pre id="log"></pre>
            <div class="contact_form_profile_buttons">
              <div class="${modeConfig.buttonLeftDesktopClass}">
                <button class="button button_close" type="reset" onclick="${modeConfig.buttonLeftOnClick}" form="contact_form">
                  ${modeConfig.buttonLeftText}
                </button>
              </div>
              <button id="submitButton" class="button button_create" type="submit" form="contact_form" onclick="${modeConfig.onSubmit}" ${modeConfig.buttonRightEnabled}>
                ${modeConfig.buttonRightText}
                <img class="button_icon" src="./assets/img/check.svg" alt="">
              </button>
            </div>
          </form>
        </div>
      </div>
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
