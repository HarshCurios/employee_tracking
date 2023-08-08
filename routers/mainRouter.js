const express = require("express");

const empRouter = require("./empRouters");
const timeSheetRouter = require("./timeSheetRouter")
const leaveRouter = require("./leavesRouter");
const notificationRouter = require("./notificationRouter")

const commonRouter = express.Router();

commonRouter.use("/employee", empRouter);
commonRouter.use("/timesheet", timeSheetRouter)
commonRouter.use("/leave", leaveRouter)
commonRouter.use("/notification", notificationRouter)

module.exports = commonRouter;
