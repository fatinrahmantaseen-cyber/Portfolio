
/* ========================================================
   QUESTION 1: FORTUNE GENERATOR
   ======================================================== */

var fortunes = [
  "True wisdom comes not from knowledge, but from understanding.",
  "You will have a great day full of unexpected opportunities!",
  "Hard work will soon pay off in ways you did not anticipate.",
  "An exciting adventure is waiting for you just around the corner.",
  "Patience and persistence are your greatest strengths today.",
  "A pleasant surprise is in store for you this week.",
  "Your creativity will lead you to solve a tricky problem.",
  "Good things come to those who keep learning and exploring.",
  "Someone will appreciate your kindness more than you know.",
  "Trust the process; your dedication is shaping your future."
];

function displayRandomFortune() {
  var randomIndex = Math.floor(Math.random() * fortunes.length);
  var fortuneText = document.getElementById("fortune-text");
  fortuneText.textContent = fortunes[randomIndex];
}

function applyGreenPreset() {
  var box = document.getElementById("fortune-box");
  var text = document.getElementById("fortune-text");

  box.style.backgroundColor = "#dcfce7";
  box.style.borderColor = "#15803d";

  text.style.color = "#14532d";
  text.style.fontSize = "19px";
  text.style.fontFamily = "Georgia, serif";
}

function applyYellowPreset() {
  var box = document.getElementById("fortune-box");
  var text = document.getElementById("fortune-text");

  box.style.backgroundColor = "#fef08a";
  box.style.borderColor = "#ca8a04";

  text.style.color = "#991b1b";
  text.style.fontSize = "18px";
  text.style.fontFamily = "'Trebuchet MS', sans-serif";
}

function applyBluePreset() {
  var box = document.getElementById("fortune-box");
  var text = document.getElementById("fortune-text");

  box.style.backgroundColor = "#e0f2fe";
  box.style.borderColor = "#0284c7";

  text.style.color = "#1e3a8a";
  text.style.fontSize = "20px";
  text.style.fontFamily = "'Segoe UI', Tahoma, sans-serif";
}

function applyOrangePreset() {
  var box = document.getElementById("fortune-box");
  var text = document.getElementById("fortune-text");

  box.style.backgroundColor = "#ffedd5";
  box.style.borderColor = "#ea580c";

  text.style.color = "#7c2d12";
  text.style.fontSize = "17px";
  text.style.fontFamily = "'Courier New', monospace";
}


/* ========================================================
   QUESTION 2: STOPWATCH
   ======================================================== */

var currentTime = 0;
var timerId = null;

var INTERVAL_MS = 3000;

function stopwatchTick() {
  currentTime = currentTime + 3;

  var displayElement = document.getElementById("stopwatch-display");
  displayElement.textContent = currentTime;

  if (currentTime >= 30) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startStopwatch() {
  if (timerId !== null) {
    return;
  }

  if (currentTime >= 30) {
    return;
  }

  timerId = setInterval(stopwatchTick, INTERVAL_MS);
}

function stopStopwatch() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function resetStopwatch() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }

  currentTime = 0;

  var displayElement = document.getElementById("stopwatch-display");
  displayElement.textContent = 0;
}


/* ========================================================
   QUESTION 3: TO-DO LIST
   ======================================================== */

var tasks = [];

function saveTasksToLocalStorage() {
  var jsonString = JSON.stringify(tasks);
  localStorage.setItem("cse391_tasks_data", jsonString);
}

function loadTasksFromLocalStorage() {
  var savedData = localStorage.getItem("cse391_tasks_data");
  if (savedData !== null) {
    tasks = JSON.parse(savedData);
  }
}

function buildTaskElement(task, index) {
  var li = document.createElement("li");
  li.className = "todo-item";
  if (task.completed === true) {
    li.className = "todo-item completed";
  }

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.checked = task.completed;
  checkbox.onchange = function() {
    toggleTask(index);
  };

  var span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = task.text;

  var deleteButton = document.createElement("button");
  deleteButton.className = "btn-delete";
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function() {
    deleteTask(index);
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);

  return li;
}

function renderTasks() {
  var todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  if (tasks.length === 0) {
    var emptyMsg = document.createElement("p");
    emptyMsg.className = "empty-todo-msg";
    emptyMsg.textContent = "No tasks yet. Enter a task above and click 'Add Task'.";
    todoList.appendChild(emptyMsg);
    return;
  }

  for (var i = 0; i < tasks.length; i++) {
    var taskElement = buildTaskElement(tasks[i], i);
    todoList.appendChild(taskElement);
  }
}

function addTask() {
  var input = document.getElementById("todo-input");
  var taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task before clicking Add Task!");
    return;
  }

  var newTask = {
    text: taskText,
    completed: false
  };
  tasks.push(newTask);

  input.value = "";

  saveTasksToLocalStorage();
  renderTasks();
}

function toggleTask(index) {
  if (tasks[index].completed === true) {
    tasks[index].completed = false;
  } else {
    tasks[index].completed = true;
  }

  saveTasksToLocalStorage();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);

  saveTasksToLocalStorage();
  renderTasks();
}


/* ========================================================
   INITIALIZE ON PAGE LOAD
   ======================================================== */
window.onload = function() {
  displayRandomFortune();

  document.getElementById("btn-green").onclick = applyGreenPreset;
  document.getElementById("btn-yellow").onclick = applyYellowPreset;
  document.getElementById("btn-blue").onclick = applyBluePreset;
  document.getElementById("btn-orange").onclick = applyOrangePreset;

  document.getElementById("btn-start").onclick = startStopwatch;
  document.getElementById("btn-stop").onclick = stopStopwatch;
  document.getElementById("btn-reset").onclick = resetStopwatch;

  loadTasksFromLocalStorage();
  renderTasks();

  document.getElementById("btn-add-task").onclick = addTask;

  document.getElementById("todo-input").onkeypress = function(event) {
    if (event.key === "Enter") {
      addTask();
    }
  };
};

