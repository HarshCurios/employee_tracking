const express = require("express");

const leaves = require("../controllers/leavesControllers");

const leaveRouter = express.Router();

leaveRouter.post("/empleave/:id", leaves.empLeave);

module.exports = leaveRouter;
