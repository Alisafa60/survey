const Response = require('../models/response.model');
const User = require('../models/user.model');
const Survey = require('../models/survey.model');
const Question = require('../models/question.model');

const createResponse = async (req, res) => {
  const { userId, surveyId, answers } = req.body;

  if (!userId || !surveyId || !answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'Invalid request. User, survey, and answers are required.' });
  }

  try {
    const isValidAnswers = answers.every(a =>
      a.questionId && (a.selectedOptions || a.text)
    );

    if (!isValidAnswers) {
      return res.status(400).json({ error: 'Invalid answer structure in the request.' });
    }

    const user = await User.findById(userId);
    const survey = await Survey.findById(surveyId);
    if (!user || !survey) {
      return res.status(404).json({ error: 'User or survey not found' });
    }

    const questionIds = answers.map(answer => answer.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });
    if (questions.length !== questionIds.length) {
      return res.status(400).json({ error: 'Some questions do not exist' });
    }

    const response = await Response.create({ userId, surveyId, answers });

    res.status(201).json({ response });
  } catch (error) {
    console.error('Error creating response:', error);
    const errorMessage =
      process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : error.message || 'An unexpected error occurred';
    res.status(500).json({ error: errorMessage });
  }
};

const getResponsesForUser = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const responses = await Response.find({ userId }).populate('surveyId');
  
      res.status(200).json({ responses });
    } catch (error) {
      console.error('Error fetching responses for user:', error);
      const errorMessage =
        process.env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : error.message || 'An unexpected error occurred';
      res.status(500).json({ error: errorMessage });
    }
  };
  
  const resetAnswersForSurvey = async (req, res) => {
    const { surveyId } = req.params;
    const userId = req.user.id; 
  
    try {
      const response = await Response.findOneAndDelete({ userId, surveyId });
  
      if (!response) {
        return res.status(404).json({ error: 'No responses found for the specified survey.' });
      }
  
      res.status(204).send();
    } catch (error) {
      console.error('Error resetting answers:', error);
      const errorMessage =
        process.env.NODE_ENV === 'production'
          ? 'Internal Server Error'
          : error.message || 'An unexpected error occurred';
      res.status(500).json({ error: errorMessage });
    }
  };
  
module.exports = {
    createResponse,
    getResponsesForUser,
    resetAnswersForSurvey
};


