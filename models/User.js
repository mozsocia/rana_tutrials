const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'hr', 'employee'], default: 'employee' },
  bank_account_no: { type: String },
  designation: { type: String },
  photo: { type: String },
  salary: { type: Number },
  isVerified: { type: Boolean, default: false },
  isFired: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);