// 1. Get element from HTML
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

// 2. Create event listener when form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page from refreshing

  const taskText = input.value.trim(); // Get text and remove extra spaces
  if (taskText === "") return;

  addTaskToList(taskText); // Add the task
  input.value = ""; // Clear the input
});

// Function to add task to the list
function addTaskToList(taskText) {
  const newTask = document.createElement("li");
  newTask.classList.add("todo-item");

  // Span untuk nomor (akan diupdate nanti)
  const taskNumber = document.createElement("span");
  taskNumber.classList.add("task-number");
  newTask.appendChild(taskNumber);

  // Span untuk teks tugas
  const taskContent = document.createElement("span");
  taskContent.classList.add("task-text");
  taskContent.textContent = taskText;
  newTask.appendChild(taskContent);

  // Tombol Delete
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");

  deleteButton.addEventListener("click", function () {
    newTask.remove();
    updateTaskNumbers();
  });

  newTask.appendChild(deleteButton);
  todoList.appendChild(newTask);

  updateTaskNumbers();
}

// Function untuk update nomor
function updateTaskNumbers() {
  const tasks = todoList.querySelectorAll(".todo-item");
  tasks.forEach((task, index) => {
    const numberSpan = task.querySelector(".task-number");
    numberSpan.textContent = `${index + 1}. `;
  });
}
