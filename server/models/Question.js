const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {  // <== Rich text in HTML format
    type: String,
    required: true,
  },
  tags: [String],
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  acceptedAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
    default: null,
  },
});

module.exports = mongoose.model('Question', questionSchema);
