const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTaskStatus,
} = require("../controllers/todoController");

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id/status", updateTaskStatus); // Update status task

module.exports = router;
