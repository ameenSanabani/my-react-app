const mongoose = require('mongoose');

const updatedInfoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    pefore: {
      type: Object,
    },
    after: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UpdatedInfo', updatedInfoSchema);
