// models/Project.js
const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    title: String,

    description: String,
    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status :{
        enum :['Not Started', 'In Progress', 'Completed'],
        type: String,
        required: true,
    },

    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    },
    deadline: Date,

    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema)

module.exports = Project