const API_URL = "http://localhost:5000/api/todos";

// Select elements
const todoForm = document.getElementById("todo-form");
const todoTitle = document.getElementById("todo-title");
const todoDescription = document.getElementById("todo-description");
const todoStatus = document.getElementById("todo-status");
const todoPriority = document.getElementById("todo-priority");
const todoList = document.getElementById("todo-list");

// Fetch and display todos
async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    todoList.innerHTML = "";
    if (Array.isArray(data.todos)) {
      data.todos.forEach((todo) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div>
            <strong>${todo.title}</strong>
            <p>${todo.description || "No description"}</p>
            <span>Status: ${todo.status} | Priority: ${todo.priority}</span>
          </div>
          <button onclick="deleteTodo('${todo._id}')">Delete</button>
        `;
        todoList.appendChild(li);
      });
    } else {
      console.error("Invalid data format: todos is not an array");
    }
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }
}

// Add a new todo
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTodo = {
    title: todoTitle.value,
    description: todoDescription.value,
    status: todoStatus.value,
    priority: todoPriority.value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    if (response.ok) {
      fetchTodos(); // Refresh the list
      todoForm.reset(); // Clear the form
    } else {
      console.error("Failed to add todo");
    }
  } catch (error) {
    console.error("Error adding todo:", error);
  }
});

// Delete a todo
async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchTodos(); // Refresh the list
    } else {
      console.error("Failed to delete todo");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

// Initial fetch
fetchTodos();
