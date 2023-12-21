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

    const populatedSurvey = await Survey.populate(survey, { path: 'questions' });

    res.status(201).json({ survey: populatedSurvey});
  } catch (error) {
    console.error('Error creating survey:', error);

    const errorMessage = process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : error.message || 'An unexpected error occurred';

    res.status(500).json({ error: errorMessage });
  }
};

const getSurveys = async (req, res) => {
  try {
    const allSurveys = await Survey.find().populate('questions');

    res.status(200).json({ surveys: allSurveys });
  } catch (error) {
    console.error('Error fetching surveys:', error);

    const errorMessage =
      process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : error.message || 'An unexpected error occurred';

    res.status(500).json({ error: errorMessage });
  }
};


const getSurveyById = async (req, res) => {
  const { id } = req.params;

  try {
    const survey = await Survey.findById(id).populate('questions');
    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    res.status(200).json({ survey });
  } catch (error) {
    console.error('Error fetching survey by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateSurvey = async (req, res) => {
  const { id } = req.params;
  const { title, questions } = req.body;

  try {
    const survey = await Survey.findByIdAndUpdate(
      id,
      { title, questions },
      { new: true }
    );

    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    res.status(200).json({ survey });
  } catch (error) {
    console.error('Error updating survey:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteSurvey = async (req, res) => {
  const { id } = req.params;

  try {
    const survey = await Survey.findByIdAndDelete(id);

    if (!survey) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    res.status(204).send(); 
  } catch (error) {
    console.error('Error deleting survey:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createSurvey,
  getSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
};
