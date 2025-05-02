// controllers/todoController.js

const Todo = require("../models/Todo");

// CREATE: Add new todo
const createTodo = async (req, res) => {
  try {
    const todo = new Todo(req.body);
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Export all functions
module.exports = {
  createTodo,
};
