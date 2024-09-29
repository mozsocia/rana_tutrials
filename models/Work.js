const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  task: { type: String, required: true },
  hours: { type: String, required: true },
  date: { type: String, required: true },
  userEmail: { type: String, required: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model('Work', workSchema);