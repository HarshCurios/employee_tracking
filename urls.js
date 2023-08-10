const express = require("express");

const empRouter = require("./employee_app/routers/empRouters");
const timeSheetRouter = require("./employee_app/routers/timeSheetRouter")
const leaveRouter = require("./employee_app/routers/leavesRouter");
const adminRouter = require("./admin_app/routers/adminRouters")

const mainRouter = express.Router();

mainRouter.use("/employee", empRouter);
mainRouter.use("/timesheet", timeSheetRouter)
mainRouter.use("/leave", leaveRouter)
mainRouter.use("/admin", adminRouter)

module.exports = mainRouter;
