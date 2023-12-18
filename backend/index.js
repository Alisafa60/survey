const express = require("express");
const { connectToMongoDB } = require("./configs/mongoDb.configs");
const app = express();
app.use(express.json());
require("dotenv").config();

app.get("/hello", (req, res) => {
  console.log("HELLO!!");
});

// auth route
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.listen(8000, () => {
  console.log("Server listining on PORT: ", 8000);

  //   db.connect((err) => {
  //     if (err) {
  //       console.log("Error connecting to db: ", err);
  //     } else {
  //       console.log("Connected to MySQL DB...");
  //     }
  //   });

  connectToMongoDB();
});
