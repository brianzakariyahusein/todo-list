document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const titleInput = document.getElementById("todo-title");
  const descriptionInput = document.getElementById("todo-description");
  const priorityInput = document.getElementById("todo-priority");

  const statusContainers = {
    pending: document.getElementById("pending"),
    "in-progress": document.getElementById("in-progress"),
    completed: document.getElementById("completed")
  };

  const renderTask = (task) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";
    taskEl.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.description}</p>
      <small>Priority: ${task.priority}</small>
    `;
    statusContainers[task.status].appendChild(taskEl);
  };

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3000/api/tasks");
    const data = await res.json();
    data.forEach(renderTask);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const task = {
      title: titleInput.value,
      description: descriptionInput.value,
      priority: priorityInput.value,
      status: "pending"
    };

    const res = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    const newTask = await res.json();
    renderTask(newTask);
    form.reset();
  });

  fetchTasks();
});