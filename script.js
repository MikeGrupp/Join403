function load(site, user) {
  renderHeader(site, user);
  renderSidebar();
}

function renderHeader(site, user) {
  let headerString = "";
  switch (site) {
    case "summary":
    case "task":
    case "board":
    case "contacts":
      headerString += templateRenderBasicHeader();
      headerString += templateRenderHeaderHelp(user);
      headerString += templateRenderHeaderUser(user);
      headerString += `</div>`;
      initSubmenu(); // TODO
      break;
    case "help":
      headerString += templateRenderBasicHeader();
      headerString += templateRenderHeaderUser(user);
      break;
    case "privacy":
    case "legal":
      headerString += templateRenderBasicHeader();
      break;
    default:
      break;
  }
  let header = document.getElementById("header");
  header.innerHTML = headerString;
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
