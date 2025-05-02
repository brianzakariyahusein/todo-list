const Task = require("../models/Todo");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const newTask = new Task({ title, description, priority, status });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body; // Ambil status baru dari request body
    console.log("Task ID:", req.params.id); // Log ID task
    console.log("New Status:", status); // Log status baru

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, // ID task dari parameter URL
      { status }, // Update hanya status
      { new: true } // Kembalikan task yang sudah diperbarui
    );

    if (!updatedTask) {
      console.log("Task not found");
      return res.status(404).json({ message: "Task not found" });
    }

    console.log("Task updated:", updatedTask); // Log task yang diperbarui
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error("Error updating task status:", err.message); // Log error
    res.status(500).json({ message: err.message });
  }
};
