// script/app.js
import { addTaskToDOM, loadTasksFromStorageAndRender } from "./taskHandler.js";
import { saveTaskToStorage, getTasksFromStorage } from "./storage.js";
import { updateProgress } from "./progress.js";

// DOM elements
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");

document.addEventListener("DOMContentLoaded", () => {
  loadTasksFromStorageAndRender(getTasksFromStorage);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  addTaskToDOM(task);
  saveTaskToStorage(task);
  updateProgress();
  input.value = "";
});
