const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, contactController.getAllContacts);
router.post('/', contactController.createContact);

module.exports = router;