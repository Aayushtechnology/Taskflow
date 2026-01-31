const { getProject, createProject } = require("../Contrellor/ProjectConterller");
const tenantCheck = require("../midlware/checkTenant");
const isAuthention = require("../midlware/IsAuthention");
const restrictTo = require("../midlware/RestrictTo");
;
const router = require("express").Router()
    
router.route("/projectcreate").post(isAuthention,tenantCheck, restrictTo(role = "manager"), createProject);

router.route("/getproject").post(isAuthention ,tenantCheck,getProject);

// router.route("/projectcreate").post();


module.exports = router; 