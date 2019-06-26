const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stopSchema = new Schema({
  stopId: {
    type: Number,
    required: true
  },
  dateEntered: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = User = mongoose.model('Stops', stopSchema);
