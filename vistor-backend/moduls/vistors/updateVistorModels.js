const moongose = require('mongoose');

const updateVistorSchema = moongose.Schema(
  {
    user: {
      type: moongose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    kind: {
      type: String,
      required: [true, 'provied vistor name'],
    },
    before: {
      type: Object,
    },
    after: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = moongose.model('UpdateVistor', updateVistorSchema);
