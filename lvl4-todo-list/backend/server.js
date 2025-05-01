const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoute = require('./routes/todoRoute');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Simple Route / Route
app.get('/', (req, res) => {
  res.send('Server running + MongoDB connected');
});

app.use ('/api/todos', todoRoute);

// running server
const PORT = 5100;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
