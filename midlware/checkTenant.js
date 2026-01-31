// middleware/tenantMiddleware.js
const Project = require('../model/ProjectModel');

const tenantCheck = async (req, res, next) => {
    const {projectId } = req.admin; // from JWT payload

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'project not found.' });
        }

        req.Project= project; // attach school info to request
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = tenantCheck;
