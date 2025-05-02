const express = require('express');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoute');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/todos', todoRoutes);

const PORT = 5100;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
