document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const titleInput = document.getElementById("todo-title");
  const descriptionInput = document.getElementById("todo-description");
  const prioritySelect = document.getElementById("todo-priority");
  const columns = document.querySelectorAll(".task-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const priority = prioritySelect.value;

    if (!title) {
      alert("Task title is required!");
      return;
    }

    const task = createTaskElement(title, description, priority);
    document.getElementById("undone").appendChild(task);

    form.reset();
  });

  columns.forEach((column) => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    column.addEventListener("drop", (e) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData("text/plain");
      const task = document.getElementById(taskId);
      column.appendChild(task);
    });
  });
});

function createTaskElement(title, description, priority) {
  const taskId = `task-${Date.now()}`;
  const task = document.createElement("div");
  task.className = "task";
  task.id = taskId;
  task.draggable = true;

  task.innerHTML = `
    <h4>${title}</h4>
    <p>${description || "No description"}</p>
    <small>Priority: ${priority}</small>
  `;

  task.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", taskId);
  });

  return task;
}