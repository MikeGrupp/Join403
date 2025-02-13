let storedUser = [];
let storedTasks = [];
let todoTasks = [];
let inProgressTasks = [];
let feedbackTasks = [];
let doneTasks = [];
let urgentTask = [];

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
  } else if (hour >= 18 && hour < 24) {
    greeting = "Good evening,";
  } else if (hour >= 0 && hour < 4) {
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

  greetingId.innerHTML = templateRenderSummaryGreeting(greetingMessage, username);
}

function mapTasksJson(json) {
  if (json == null) {
    return null;
  }
  return Object.entries(json).map(([firebaseId, tasks]) => ({
    id: firebaseId,
    step: tasks.step,
    dueDate: tasks.dueDate,
    prio: tasks.prio
  }));
}

function setStoredTasks(tasks) {
  storedTasks = tasks;
}

function renderSummary() {
  let progressCards = document.getElementById('progressCards');
  let amountTasks = storedTasks.length;
  let amountTodo = todoTasks.length;
  let amountInProgress = inProgressTasks.length;
  let amountFeedback = feedbackTasks.length;
  let amountDone = doneTasks.length;
  let amountUrgent = urgentTask.length;
  let deadline = findDeadline();

  progressCards.innerHTML = templateRenderSummary(
    amountTasks,
    amountTodo,
    amountInProgress,
    amountFeedback,
    amountDone,
    amountUrgent,
    deadline
  )
}

function findDeadline() {
  let deadlineTask = storedTasks.find(task => task.step !== "Done");

  if (!deadlineTask) {
    return "No coming Deadlines!";
  }

  return formatDate(deadlineTask.dueDate);
}

function formatDate(dueDate) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let [day, month, year] = dueDate.split('/');
  month = parseInt(month, 10) - 1;
  return `${day} ${months[month]} ${year}`;
}

function filterTasks() {
  todoTasks = storedTasks.filter(task => task.step === "Todo");
  inProgressTasks = storedTasks.filter(task => task.step === "InProgress");
  feedbackTasks = storedTasks.filter(task => task.step === "AwaitFeedback");
  doneTasks = storedTasks.filter(task => task.step === "Done");
  urgentTask = storedTasks.filter(task => task.prio === "Urgent");

  storedTasks.sort((a, b) => {
    if (!a.dueDate || !b.dueDate) return 0;

    let dateA = new Date(a.dueDate.split('/').reverse().join('-'));
    let dateB = new Date(b.dueDate.split('/').reverse().join('-'));

    return dateA - dateB;
  });
}


async function createSummary() {
  setStoredTasks(await loadTasks());
  filterTasks();
  renderSummary();
}

function startAnimation() {
  let progressCard = document.getElementById("progressCards");
  let sumTitle = document.getElementById("sumTitle");

  setTimeout(() => {
    progressCard.classList.remove("hidden");
    progressCard.classList.add("show");
    sumTitle.classList.remove("hidden");
    sumTitle.classList.add("show");
  }, 2000);
}