// Load tasks when page starts
window.onload = () => {
  loadTasks();
};

function addTask() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const priority = document.getElementById("priority").value;

  if (!title || !description) {
    alert("Please fill in both title and description!");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    description,
    priority,
    status: "undone",
  };

  saveTask(task);
  renderTask(task);
  clearForm();
}

function renderTask(task) {
  const taskElement = document.createElement("div");
  taskElement.className = "task";
  taskElement.setAttribute("data-id", task.id);

  taskElement.innerHTML = `
    <h4>${task.title}</h4>
    <p>${task.description}</p>
    <small>Priority: ${task.priority}</small>
    <select onchange="updateTaskStatus(this, ${task.id})">
      <option value="undone" ${
        task.status === "undone" ? "selected" : ""
      }>Undone</option>
      <option value="in-progress" ${
        task.status === "in-progress" ? "selected" : ""
      }>In Progress</option>
      <option value="done" ${
        task.status === "done" ? "selected" : ""
      }>Done</option>
    </select>
  `;

  const column = document.getElementById(`${task.status}-tasks`);
  column.appendChild(taskElement);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(selectElement, taskId) {
  const newStatus = selectElement.value;
  const taskElement = selectElement.parentElement;

  // Move element visually
  const newColumn = document.getElementById(`${newStatus}-tasks`);
  newColumn.appendChild(taskElement);

  // Update in localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("priority").value = "Medium";
}
