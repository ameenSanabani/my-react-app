const mongoose = require('mongoose');

const loginInfoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'provied your name'],
    },
    userId: {
      type: String,
      required: [true, 'provied your userId'],
    },
    active: {
      type: Boolean,
      required: [true, 'provied status'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LoginInfo', loginInfoSchema);
