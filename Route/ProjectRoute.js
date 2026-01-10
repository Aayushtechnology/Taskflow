const { getProject,  createProject } = require("../Contrellor/ProjectConterller");
const isAuthention  = require("../midlware/IsAuthention");
const restrictTo = require("../midlware/RestrictTo");

const router = require("express").Router();
// restrictTo
router.route("/projectcreate").post(isAuthention , restrictTo(role="manager") ,createProject);

router.route("/getproject").post(getProject);

// router.route("/projectcreate").post();


module.exports = router; 