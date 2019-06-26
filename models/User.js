const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  full: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: false
  },
  stops: {
    type: Array,
    required: false
  },
  serial: {
    type: String,
    required: false
  }
});

mongoose.model('User', userSchema);
