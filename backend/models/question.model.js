const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500,
  },
  answerType: {
    type: String,
    enum: ["radio", "checkbox", "input"],
    required: true,
  },
  answerOptions: [String],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
