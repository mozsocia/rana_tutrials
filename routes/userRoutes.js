const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/jwt', userController.createJWT);
router.post('/logout', userController.logout);
router.get('/', userController.getAllUsers);
router.get('/verified', verifyToken, verifyAdmin, userController.getVerifiedUsers);
router.get('/:email', userController.getUserByEmail);
router.post('/', userController.createUser);
router.patch('/:email', verifyToken, userController.updateUser);
router.patch('/verify/:email', verifyToken, userController.verifyUser);
router.get('/role/:email', verifyToken, userController.getUserRole);
router.get('/admin/:email', verifyToken, userController.isAdmin);

module.exports = router;