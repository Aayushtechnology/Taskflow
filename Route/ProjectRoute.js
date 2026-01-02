const { projectCrate, getProject, getsingleproduct } = require("../Contrellor/ProjectConterller");

const router = require("express").Router();

router.route("/projectcreate").post(projectCrate);

router.route("/getproject").post(getProject);

router.route("/projectcreate").post(getsingleproduct);


module.exports = router; 