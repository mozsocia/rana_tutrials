const express = require('express');
const userRoutes = require('./userRoutes');
const workRoutes = require('./workRoutes');
const paymentRoutes = require('./paymentRoutes');
const reviewRoutes = require('./reviewRoutes');
const contactRoutes = require('./contactRoutes');

const router = express.Router();

// Register all routes
router.use('/users', userRoutes);
router.use('/works', workRoutes);
router.use('/payments', paymentRoutes);
router.use('/reviews', reviewRoutes);
router.use('/contacts', contactRoutes);

module.exports = router;