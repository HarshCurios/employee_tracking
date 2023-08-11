const express = require("express");

const timeSheet = require("../controllers/timeSheetControllers");

const timeSheetRouter = express.Router();

timeSheetRouter.post("/clockintime/:id", timeSheet.empClockIn);
timeSheetRouter.post("/clockouttime/:id", timeSheet.empAttendance);

module.exports = timeSheetRouter;
