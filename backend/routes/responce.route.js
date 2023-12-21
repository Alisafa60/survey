const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const responseController = require("../controllers/responce.controller");

router.post('/responses', authMiddleware, responseController.createResponse);
router.get('/responses/user/:userId', authMiddleware, responseController.getResponsesForUser);
router.post('/responses/reset/:surveyId', authMiddleware, responseController.resetAnswersForSurvey);

module.exports = router;

