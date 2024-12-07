function load() {
  renderSidebar();
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
