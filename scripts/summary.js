/**
 * Array to store user data
 *
 * @type {Array<Object>}
 */
let storedUser = [];

/**
 * Array to store all tasks
 *
 * @type {Array<Object>}
 */
let storedTasks = [];

/**
 * Array to store tasks with "Todo" status
 *
 * @type {Array<Object>}
 */
let todoTasks = [];

/**
 * Array to store tasks with "InProgress" status
 *
 * @type {Array<Object>}
 */
let inProgressTasks = [];

/**
 * Array to store tasks with "AwaitFeedback" status
 *
 * @type {Array<Object>}
 */
let feedbackTasks = [];

/**
 * Array to store tasks with "Done" status
 *
 * @type {Array<Object>}
 */
let doneTasks = [];

/**
 * Array to store tasks with "Urgent" priority
 *
 * @type {Array<Object>}
 */
let urgentTasks = [];

/**
 * Displays a toast message based on the 'msg' query parameter in the URL
 */
function msgRender() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");
  if (msg) {
    createToast(msg);
  }
}

/**
 * Navigates the user to the 'board.html' page
 */
function goToBoard() {
  window.location.href = "board.html";
}

/**
 * Creates a greeting message based on the current time
 *
 * @returns {string} The greeting message
 */
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

/**
 * Retrieves the user's name
 *
 * @async
 * @returns {Promise<string>} The user's name
 */
async function getUserName() {
  let userId = "users/" + currentUser.id;
  let username = await loadData(userId);
  return username.name;
}

/**
 * Renders the greeting message on the page
 *
 * @async
 */
async function renderGreeting() {
  let greetingMessage = createGreeting();
  let username = await getUserName();
  let greetingId = document.getElementById("greetingBox");

  greetingId.innerHTML = templateRenderSummaryGreeting(greetingMessage, username);
}

/**
 * Maps the JSON data of tasks to a usable format
 *
 * @param {Object} json - The JSON data of tasks
 * @returns {Array<Object>|null} An array of task objects, or null if the input is null
 */
function mapTasksJson(json) {
  if (json == null) {
    return null;
  }
  return Object.entries(json).map(([firebaseId, tasks]) => ({
    id: firebaseId,
    step: tasks.step,
    dueDate: tasks.dueDate,
    prio: tasks.prio,
  }));
}

/**
 * Sets the stored tasks array
 *
 * @param {Array<Object>} tasks - The array of tasks to store
 */
function setStoredTasks(tasks) {
  storedTasks = tasks;
}

/**
 * Renders the summary of tasks on the page
 */
function renderSummary() {
  let progressCards = document.getElementById("progressCards");
  let amountTasks = storedTasks.length;
  let amountTodo = todoTasks.length;
  let amountInProgress = inProgressTasks.length;
  let amountFeedback = feedbackTasks.length;
  let amountDone = doneTasks.length;
  let amountUrgent = urgentTasks.length;
  let deadline = getNextDeadline();

  progressCards.innerHTML = templateRenderSummary(
    amountTasks,
    amountTodo,
    amountInProgress,
    amountFeedback,
    amountDone,
    amountUrgent,
    deadline
  );
}

/**
 * Formats a date string into a readable format
 *
 * @param {string} dueDate - The date string in 'DD/MM/YYYY' format
 * @returns {string} The formatted date string in 'DD Month YYYY' format
 */
function formatDate(dueDate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let [day, month, year] = dueDate.split("/");
  month = parseInt(month, 10) - 1;
  return `${day} ${months[month]} ${year}`;
}

/**
 * Filters the stored tasks into different categories based on their status and priority
 */
function filterTasks() {
  todoTasks = storedTasks.filter((task) => task.step === "Todo");
  inProgressTasks = storedTasks.filter((task) => task.step === "InProgress");
  feedbackTasks = storedTasks.filter((task) => task.step === "AwaitFeedback");
  doneTasks = storedTasks.filter((task) => task.step === "Done");
  urgentTasks = storedTasks.filter((task) => task.prio === "Urgent" && task.step !== "Done");
}

/**
 * Retrieves the due date of the next upcoming task
 *
 * @returns {string} The formatted due date of the next upcoming task, or "No coming Deadlines!" if there are none
 */
function getNextDeadline() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let upcomingTasks = storedTasks
    .filter(task => task.step !== "Done" && task.dueDate)
    .map(task => ({ ...task, parsedDate: new Date(task.dueDate.split('/').reverse().join('-')) }))
    .filter(task => task.parsedDate >= today)
    .sort((a, b) => a.parsedDate - b.parsedDate);

  if (!upcomingTasks.length) {
    return "No coming Deadlines!";
  }

  return formatDate(upcomingTasks[0].dueDate);
}

/**
 * Creates the summary of tasks
 *
 * @async
 */
async function createSummary() {
  setStoredTasks(await loadTasks());
  filterTasks();
  renderSummary();
}

/**
 * Starts the animation for the summary section
 */
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
