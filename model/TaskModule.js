const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    filePath: {
        type: String,
    },

    status: {
        type: String,
        default: "todo"
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comletedAt: Date,

    subTasks: [{
        title: String,
        isCompleted: {
            type: Boolean,
            default: false
        }
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    }
      


}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema)

module.exports = Task

