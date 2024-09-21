const express = require('express');
const todoRoutes = require('./todoRoutes');

const router = express.Router();

router.use('/todos', todoRoutes);

// You can add more routes here as your app grows
// Example: router.use('/users', userRoutes);

module.exports = router;