const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, workController.getAllWorks);
router.post('/', verifyToken, workController.createWork);
router.get('/:email', verifyToken, workController.getWorkByEmail);

module.exports = router;