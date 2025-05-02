const express = require('express');
const router = express.Router();
const { createTodo } = require('../controllers/todoController');

// Create Task
router.post('/', createTodo);

module.exports = router;
