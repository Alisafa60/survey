const express = require("express");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const app = express();
app.use(express.json());
require("dotenv").config();

// auth route
const authRoutes = require('./routes/auth.routes');
const surveyRoutes = require('./routes/survey.routes');
const responseRoutes = require('./routes/response.routes')
const imageRoutes = require('./routes/image.routes');

// Use routes
app.use('/auth', authRoutes);
app.use('/api', surveyRoutes);
app.use('/api', responseRoutes);
app.use('/api', imageRoutes);
module.exports = app;
app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);

  connectToMongoDB();
});
