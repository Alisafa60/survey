const express = require("express");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const app = express();
app.use(express.json());
require("dotenv").config();

app.get("/hello", (req, res) => {
  console.log("HELLO!!");
});

// auth route
const authRoutes = require('./routes/auth.routes');
const surveyRoutes = require('./routes/survey.routes');

// Use routes
app.use('/auth', authRoutes);
app.use('/api', surveyRoutes);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);

  connectToMongoDB();
});
