document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const titleInput = document.getElementById("todo-title");
  const descriptionInput = document.getElementById("todo-description");
  const priorityInput = document.getElementById("todo-priority");

  const statusContainers = {
    pending: document.getElementById("pending"),
    "in-progress": document.getElementById("in-progress"),
    completed: document.getElementById("completed"),
  };

  const renderTask = (task) => {
    const taskEl = document.createElement("div");
    taskEl.className = "task";
    taskEl.draggable = true; // Aktifkan drag
    taskEl.dataset.id = task._id; // Simpan ID task di dataset
    taskEl.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.description}</p>
      <small>Priority: ${task.priority}</small>
    `;

    // Event listener untuk dragstart
    taskEl.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", task._id); // Simpan ID task saat drag
    });

    statusContainers[task.status].appendChild(taskEl);
  };

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5100/api/todos");
    const data = await res.json();
    Object.values(statusContainers).forEach((container) => (container.innerHTML = ""));
    data.forEach(renderTask);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const task = {
      title: titleInput.value,
      description: descriptionInput.value,
      priority: priorityInput.value,
      status: "pending",
    };

    const res = await fetch("http://localhost:5100/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const newTask = await res.json();
    renderTask(newTask);
    form.reset();
  });

  // Event listener untuk drag-and-drop
  Object.keys(statusContainers).forEach((status) => {
    const container = statusContainers[status];

    container.addEventListener("dragover", (e) => {
      e.preventDefault(); // Izinkan drop
    });

    container.addEventListener("drop", async (e) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData("text/plain"); // Ambil ID task dari drag
      console.log("Task ID:", taskId); // Log ID task
      console.log("New Status:", status); // Log status baru

      // Kirim permintaan ke backend untuk memperbarui status task
      const res = await fetch(`http://localhost:5100/api/todos/${taskId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }), // Kirim status baru berdasarkan kolom tujuan
      });

      if (res.ok) {
        console.log("Task status updated successfully");
        fetchTasks(); // Refresh task setelah status diperbarui
      } else {
        console.error("Failed to update task status");
      }
    });
  });

  fetchTasks();
});