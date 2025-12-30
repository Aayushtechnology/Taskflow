

const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const User = require("../model/usermodel");

// dotenv.config();

const databaseConnect = async () => {
    await mongoose.connect("mongodb+srv://Aayush:AaysuhTamrakar@taskflow.fhcmfpu.mongodb.net/?appName=Taskflow");
    console.log("database connected sucessfully ");



};

module.exports = databaseConnect;