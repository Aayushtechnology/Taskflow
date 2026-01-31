const Task = require("../model/TaskModule")


exports.createTask = async (req, res) => {

    const { title, description, status, projectId, assignedTo, filePath } = req.body;

    if (!title || !description || !status || !projectId || !assignedTo || !filePath) {
        return res.status(400).json({
            message: "Please provide Title, Description, projectId , assginId,filePath "
        });
    }
    const taskExists = await Task.findOne({ title });
    if (taskExists) {
        return res.status(400).json({
            message: "Task already exists"
        });
    }
    const task = await Task.create({
        title,
        description,
        status,
        projectId,
        filePath,
        assignedTo,
        tenant: req.tenantId
    });

    return res.status(201).json({
        message: "Task  created successfully",
        task
    });
}
exports.getTasks = async (req, res) => {
    const tasks = await Task.findAll()
    if (tasks.length === 0) {
        res.status(400).json({
            message: "Task is not found"
        })
    } else {
        res.status(200).json({
            message: "Task  fetch successfully",
            data: tasks,
            // review: productReviews
        })
    }
}



exports.putTask = async (req, res) => {
    try {
        const { title, description, status, projectId, assignedTo, filePath } = req.body;
        if (!title || !description || !status || !projectId || !assignedTo || !filePath) {
            return res.status(400).json({ status: false, msg: "title, description, status, projectId, assignedTo, filePath of task not found" });
        }

        if (!validateObjectId(req.params.id)) {
            return res.status(400).json({ status: false, msg: "Task id not valid" });
        }

        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(400).json({ status: false, msg: "Task with given id not found" });
        }

        // if (task.user != req.user.id) {
        //     return res.status(403).json({ status: false, msg: "You can't update task of another user" });
        // }

        task = await Task.findByIdAndUpdate(req.params.id, { title, description, status, projectId, assignedTo, filePath }, { new: true });
        res.status(200).json({ task, status: true, msg: "Task updated successfully.." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}


exports.deleteTask = async (req, res) => {
    try {
        if (!validateObjectId(req.params.id)) {
            return res.status(400).json({ status: false, msg: "Task id not valid" });
        }

        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(400).json({ status: false, msg: "Task with given id not found" });
        }

        if (task.user != req.user.id) {
            return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: true, msg: "Task deleted successfully.." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}
