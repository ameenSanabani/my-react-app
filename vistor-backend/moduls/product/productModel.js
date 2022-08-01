const mongoose = require('mongoose');

const productSchma = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'provied your product'],
    },
    active: {
      type: Boolean,
    },
    display: {
      type: Boolean,
      required: [true, 'provied status display'],
    },
    category: {
      type: String,
      // required: [true, 'provied your category'],
    },
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
    units: {
      type: String,
      required: [true, 'provied your units'],
    },
    specialCode: {
      type: Number,
    },
    barcode: {
      type: Number,
    },
    explanation: {
      type: String,
    },
    content: {
      type: String,
    },
    documents: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchma);
