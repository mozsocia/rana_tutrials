const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/create-payment-intent', paymentController.createPaymentIntent);
router.get('/', verifyToken, paymentController.getAllPayments);
router.get('/:email', verifyToken, paymentController.getPaymentsByEmail);
router.get('/check/:email', verifyToken, paymentController.checkPaymentExists);
router.post('/', verifyToken, paymentController.createPayment);

module.exports = router;