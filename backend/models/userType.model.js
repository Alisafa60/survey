const mongoose = require("mongoose");

const userTypeSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
        unique: true,
    },
});

const UserType = mongoose.model("UserType", userTypeSchema);
module.exports = UserType;