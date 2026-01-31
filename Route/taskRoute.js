const { getTasks, createTask } = require("../Contrellor/TaskCOntreller");
const isAuthention = require("../midlware/IsAuthention");
const restrictTo = require("../midlware/RestrictTo");
const checkMember = require("../midlware/checkmemebe ");
const router = require("express").Router();

router.route("/Taskcreate").post(isAuthention , restrictTo(role="manager"),createTask);
router.route("/gettask").get(isAuthention,checkMember,getTasks);

module.exports = router;
