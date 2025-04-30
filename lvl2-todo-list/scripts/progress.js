// script/progress.js
import { getTasksFromStorage } from "./storage.js";

const progressFill = document.querySelector(".progress-fill");
const progressText = document.querySelector("#progress-text");

export function updateProgress() {
  const tasks = getTasksFromStorage();
  if (tasks.length === 0) {
    progressFill.style.width = "0%";
    progressText.textContent = "0% Completed";
    return;
  }

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `${progress}% Completed`;
}
