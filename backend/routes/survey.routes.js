const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/survey.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/surveys', authMiddleware.authMiddleware, authMiddleware.adminMiddleware, surveyController.createSurvey);
router.get('/surveys', authMiddleware.authMiddleware, surveyController.getSurveys);
router.get('/surveys/:id', authMiddleware.authMiddleware, surveyController.getSurveyById);
router.put('/surveys/:id', authMiddleware.authMiddleware, authMiddleware.adminMiddleware, surveyController.updateSurvey);
router.delete('/surveys/:id', authMiddleware.authMiddleware, authMiddleware.adminMiddleware, surveyController.deleteSurvey);

module.exports = router;
