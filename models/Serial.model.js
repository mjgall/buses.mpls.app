const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serialSchema = new Schema({
  serial: {
    type: Number,
    required: true
  },
  balance: {
    type: Number,
    required: false
  },
  dateEntered: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = User = mongoose.model('Serials', serialSchema);
