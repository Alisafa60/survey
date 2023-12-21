const express = require("express");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const app = express();
app.use(express.json());
require("dotenv").config();

// auth route
const authRoutes = require('./routes/auth.routes');
const surveyRoutes = require('./routes/survey.routes');
const responceRoutes = require('./routes/responce.route')

// Use routes
app.use('/auth', authRoutes);
app.use('/api', surveyRoutes);
app.use('/api', responceRoutes);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);

  connectToMongoDB();
});
