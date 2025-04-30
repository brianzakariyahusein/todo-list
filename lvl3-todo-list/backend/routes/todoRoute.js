const express = require('express');
const router = express.Router();
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');

// Route CREATE
router.post('/', createTodo);

// Route READ
router.get('/', getTodos);

// Route UPDATE
router.put('/:id', updateTodo);

// Route DELETE
router.delete('/:id', deleteTodo);

module.exports = router;
