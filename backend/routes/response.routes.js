const express = require('express');
const router = express.Router();
const {authMiddleware} = require("../middlewares/auth.middleware");
const {  createResponse, getResponsesForUser, resetAnswersForSurvey} = require("../controllers/response.controller");

router.post('/responses', authMiddleware, createResponse);
router.get('/responses/user/:userId', authMiddleware, getResponsesForUser);
router.post('/responses/reset/:surveyId', authMiddleware, resetAnswersForSurvey);

module.exports = router;

