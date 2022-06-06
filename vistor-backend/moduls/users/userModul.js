const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'provied your name'],
    },
    userId: {
      type: String,
      required: [true, 'provied your userId'],
    },
    password: {
      type: String,
      required: [true, 'provied your password'],
    },
    photo: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      required: [true, 'provied admin status'],
    },
    group: {
      type: Array,
      required: [true, 'provied user group'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
