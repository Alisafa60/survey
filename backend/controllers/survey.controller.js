const Survey = require('../models/survey.model');
const Question = require('../models/question.model'); 
const mongoose = require('mongoose');

const createSurvey = async (req, res) => {
  const { title, questions } = req.body;

  if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: 'Invalid request. Title and questions are required.' });
  }

  try {
    const isValidQuestions = questions.every(q =>
      q.questionText && q.answerType && (q.answerOptions || q.answerType === 'input')
    );

    if (!isValidQuestions) {
      return res.status(400).json({ error: 'Invalid question structure in the request.' });
    }

    const createdQuestions = await Question.create(questions);
    const questionIds = createdQuestions.map(question => question._id);

    const survey = await Survey.create({
      title,
      questions: questionIds,
    });

    res.status(201).json({ survey });
  } catch (error) {
    console.error('Error creating survey:', error);

    const errorMessage = process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : error.message || 'An unexpected error occurred';

    res.status(500).json({ error: errorMessage });
  }
};

module.exports = {
  createSurvey,
};
