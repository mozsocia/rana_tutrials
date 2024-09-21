const express = require('express');
const connectDB = require('./config/database');
const routes = require('./routes');

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Todo API!,  go to /api/todos to get started');
});
// Routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Todo API listening at http://localhost:${port}`);
});