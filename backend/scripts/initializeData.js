const express = require("express");
const { connectToMongoDB } = require("../configs/mongoDb.configs");
const app = express();
app.use(express.json());
require("dotenv").config();
const initializeUserTypes = require("./initializeUserTypes");
const mongoose = require("mongoose");
const initializeAdmin = require("./initializeAdmin");

const initializeData = async () => {
  try {
    connectToMongoDB();
    await initializeUserTypes();
    await initializeAdmin();

    console.log("Data initialization completed successfully.");
  } catch (error) {
    console.error("Error initializing data:", error);
  } finally {
    
    mongoose.connection.close();
  }
};

// Run the initialization script
initializeData();
