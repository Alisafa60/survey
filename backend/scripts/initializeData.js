const express = require("express");
const { connectToMongoDB } = require("../configs/mongoDb.configs");
const app = express();
app.use(express.json());
require("dotenv").config();
const initializeUserTypes = require("./initializeUserTypes");
const mongoose = require("mongoose");
const initializeAdmin = require("./initializeAdmin");

const adminsData = [
    {
      username: 'sara12',
      password: 'aliali',
      firstName: 'Sara',
      lastName: 'Safa',
      profilePicture: 'img.url',
    },
    {
      username: 'ali',
      password: 'aliali',
      firstName: 'ali',
      lastName: 'safa',
      profilePicture: 'img.url',
    },
  ];

const initializeData = async () => {
  try {
    connectToMongoDB();
    await initializeUserTypes();
    await initializeAdmin(adminsData);

    console.log("Data initialization completed successfully.");
  } catch (error) {
    console.error("Error initializing data:", error);
  } finally {
    
    mongoose.connection.close();
  }
};

// Run the initialization script
initializeData();
