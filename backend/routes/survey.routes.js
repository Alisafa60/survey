const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/survey.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/surveys",
  authMiddleware.authMiddleware,
  authMiddleware.adminMiddleware,
  surveyController.createSurvey
);

module.exports = router;
