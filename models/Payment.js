const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  salary: { type: Number, required: true },
  name: { type: String, required: true },
  photo: { type: String },
  designation: { type: String },
  bankAccountNo: { type: String },
  role: { type: String },
  transactionId: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
  status: { type: String, default: 'completed' }
});

module.exports = mongoose.model('Payment', paymentSchema);