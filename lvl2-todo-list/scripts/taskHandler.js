// script/taskHandler.js
import { toggleTaskComplete, deleteTaskFromStorage } from "./storage.js";
import { updateProgress } from "./progress.js";

const todoList = document.querySelector("#todo-list");

export function addTaskToDOM(task) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = task.text;
  if (task.completed) {
    span.classList.add("completed");
  }

  span.addEventListener("click", () => {
    span.classList.toggle("completed");
    toggleTaskComplete(task.id);
    updateProgress();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-button";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    deleteTaskFromStorage(task.id);
    updateProgress();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

export function loadTasksFromStorageAndRender(getTasksFromStorage) {
  const tasks = getTasksFromStorage();
  tasks.forEach(addTaskToDOM);
  updateProgress();
}
