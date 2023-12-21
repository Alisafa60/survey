const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  surveyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey', required: true },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      selectedOptions: [{ type: String }],
      text: { type: String },
    },
  ],
  completed: { type: Boolean, default: false },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
