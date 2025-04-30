// script/storage.js
export function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

export function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function toggleTaskComplete(taskId) {
  const tasks = getTasksFromStorage();
  const updatedTasks = tasks.map(task => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

export function deleteTaskFromStorage(taskId) {
  const tasks = getTasksFromStorage();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
