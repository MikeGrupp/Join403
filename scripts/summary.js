let storedUser = [];

function msgRender() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get('msg');
  if (msg) {
    createToast(msg);
  }
}

function goToBoard() {
  window.location.href = 'board.html';
}

function createGreeting() {
  const d = new Date();
  let hour = d.getHours();
  let greeting = "";
  if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon,";
  } else if (hour > 18 && hour < 24) {
    greeting = "Good evening,";
  } else if (hour > 0 && hour < 4) {
    greeting = "Good evening,";
  } else if (hour >= 4 && hour < 12) {
    greeting = "Good morning,";
  }
  return greeting;
}

async function getUserName() {
  let userId = 'users/' + currentUser.id
  let username = await loadData(userId);
  return username.name;
}

async function renderGreeting() {
  let greetingMessage = createGreeting();
  let username = await getUserName();
  let greetingId = document.getElementById('greetingBox');

  console.log(greetingMessage);
  console.log(username);

  greetingId.innerHTML = templateRenderSummaryGreeting(greetingMessage, username);
}