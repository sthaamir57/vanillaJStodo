const list = document.querySelector(".todo-list");
const form = document.querySelector("#task-form");
const task = document.querySelector("#task");
const card = document.querySelector(".todo-card");
const clr = document.querySelector(".clear-tasks");
const tasks = document.querySelector(".todo-item");
const title = document.querySelector("#heading");
const circle = document.querySelector(".cls-1");
const svg = document.querySelector("svg");

const today = new Date();
console.log(today);

const day = today.getDay();
const month = today.getMonth();
const date = today.getDate();
const hour = today.getHours();
let greet;

// console.log(hour);

let theme = localStorage.getItem("theme");
checkTheme(theme);

addDate();

function addDate() {
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateAppend = document.querySelector(".date");

  let p = document.createElement("p");
  p.innerHTML = `${dayNames[day]}, ${monthNames[month]} ${date}`;
  dateAppend.appendChild(p);

  chooseGreeting();

  let span = document.createElement("span");
  span.innerHTML = `Good ${greet}`;
  dateAppend.appendChild(span);
}

function chooseGreeting() {
  let greetings = ["Morning", "Afternoon", "Evening", "Night"];

  if (hour >= 0 && hour <= 11) {
    greet = greetings[0];
  }
  if (hour >= 12 && hour <= 17) {
    greet = greetings[1];
  }
  if (hour >= 18 && hour <= 20) {
    greet = greetings[2];
  }
  if (hour >= 21 && hour <= 23) {
    greet = greetings[3];
  }
}

loadAllEventFunctions();

function loadAllEventFunctions() {
  document.addEventListener("DOMContentLoaded", getTodos);
  form.addEventListener("submit", addTask);
  list.addEventListener("click", delTask);
  clr.addEventListener("click", clearAll);
  svg.addEventListener("click", btnAni);
}

function addTask(e) {
  if (task.value === "") {
    alert("DON'T BE LAZY. Add Something");
  } else {
    let item = document.createElement("div");
    item.className = "todo-item";
    let wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.innerHTML = `<i class="fa fa-circle"></i>
  <p>${task.value}</p>`;
    item.appendChild(wrapper);

    saveLocally(task.value);

    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.className = "delete-item";
    link.innerHTML = `<i class="fa fa-remove"></i>`;

    item.appendChild(link);

    list.appendChild(item);

    task.value = "";

    clr.style.visibility = "visible";

    title.textContent = "tasks";

    list.lastChild.classList.add("slide-in");

    e.preventDefault();
  }
}

function delTask(e) {
  const delTodo = e.target.parentElement.parentElement;
  if (e.target.parentElement.classList.contains("delete-item")) {
    delTodo.classList.add("slide-out");
    // delTodo.remove();

    deleteSaved(delTodo);

    delTodo.addEventListener("animationend", function (f) {
      delTodo.remove();
    });
    // console.log(delTodo.parentElement.parentElement);
    // console.log(list.innerHTML);
  }

  if (list.children.length === 1) {
    clr.style.visibility = "hidden";
    // title.style.visibility = "hidden";
    title.textContent = "";
  }
}

function clearAll() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  // localStorage.clear();
  localStorage.setItem("todos", JSON.stringify([]));

  if (list.innerHTML === "") {
    clr.style.visibility = "hidden";
    // title.style.visibility = "hidden";
    title.textContent = "";
  }
}

// console.log(document.querySelector(".todo-list").childNodes);

function saveLocally(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    let item = document.createElement("div");
    item.className = "todo-item";
    let wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.innerHTML = `<i class="fa fa-circle"></i>
  <p>${todo}</p>`;
    item.appendChild(wrapper);

    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.className = "delete-item";
    link.innerHTML = `<i class="fa fa-remove"></i>`;

    item.appendChild(link);

    list.appendChild(item);

    clr.style.visibility = "visible";

    title.textContent = "tasks";
    list.lastChild.classList.add("slide-in");
  });
}

function deleteSaved(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function btnAni() {
  circle.classList.toggle("switch-f");
  if (circle.classList.contains("switch-f")) {
    document.body.classList.replace("light", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.replace("dark", "light");
    localStorage.setItem("theme", "light");
  }
}

function checkTheme(theme) {
  if (theme === null) {
    todos = [];
  } else if (theme === "dark") {
    circle.classList.add("switch-f");
    document.body.classList.replace("light", "dark");
  }
}
