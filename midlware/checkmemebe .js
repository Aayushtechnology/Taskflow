// middlewares/checkMember.js
const tasks = require('../model/TaskModule'); // Import your tasks data

module.exports = (req, res, next) => {
    // 1. Get the requested task ID from request params/body/query
    const taskId = req.params.taskId || req.body.taskId;

    // 2. Find the task in your data source (database or local array)
    const task = tasks.findById(taskId);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }


    // 3. Check if the authenticated user is in the assignedMembers list
    if (task.assignedMembers.includes(req.userData.id)) {
        next(); // User is a selected member, proceed to the route handler
    } else {
        res.status(403).json({ message: 'Forbidden: You are not assigned to this task' });
    }
};
 

module.exports = checkMember;
