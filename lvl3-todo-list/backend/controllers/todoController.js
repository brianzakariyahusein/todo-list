// controllers/todoController.js

const Todo = require("../models/Todo");

// CREATE: Add new todo
const createTodo = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const newTodo = new Todo({ title, description, status, priority, dueDate });
    const savedTodo = await newTodo.save();
    res
      .status(201)
      .json({ message: "Todo successfully created", todo: savedTodo });
  } catch (error) {
    res.status(400).json({ message: "Todo failed to add", error });
  }
};

// READ: Get all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ message: "Todo successfully retrieved", todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve todos", error });
  }
};

// UPDATE: Change todo by ID
const updateTodo = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, status, priority, dueDate },
      { new: true }
    );
    res.status(200).json({ message: "Todo successfully updated", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo", error });
  }
};

// DELETE: Delete todo by ID
const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo Succesfully delete" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error });
  }
};

// Export all functions
module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
