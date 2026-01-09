const { getProject,  createProject } = require("../Contrellor/ProjectConterller");


const router = require("express").Router();

router.route("/projectcreate").post(createProject);

router.route("/getproject").post(getProject);

// router.route("/projectcreate").post();


module.exports = router; 