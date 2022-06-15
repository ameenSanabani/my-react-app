const moongose = require('mongoose');

const vistorSchema = moongose.Schema(
  {
    user: {
      type: moongose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'provied vistor name'],
    },
    company: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    resone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = moongose.model('Vistor', vistorSchema);
