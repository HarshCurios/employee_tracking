const moment = require("moment");

const timeSheetLogger = require("../../utils/timeSheetLogger");
const empTimeSheetSchema = require("../../models/empTimeSheetSchema");
const ipService = require("../services/ipService");

module.exports = {
  empClockIn: async (req, res) => {
    const empId = req.params.id;
    try {
      const clockInTime = new empTimeSheetSchema(req.body);
      const { empClockInIP } = await ipService.ipAddress();
      clockInTime.empClockInIP = empClockInIP;
      clockInTime.empClockIn = moment().format("YYYY-MM-DD HH:mm:ss");
      clockInTime.empID = empId;
      const attendanceTime = moment("10:15:00", "HH:mm:ss");
      const clockIn = moment(clockInTime.empClockIn, "YYYY-MM-DD HH:mm:ss");
      if (clockIn.isAfter(attendanceTime)) {
        clockInTime.empDaysLate = "Late";
      }
      await clockInTime.save();
      res.status(201).json({
        success: true,

        message: "Employee clock in time",
        info: clockInTime,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  empAttendance: async (req, res) => {
    try {
      const timeSheetId = req.params.id;
      const clockOutTime = await empTimeSheetSchema.findByIdAndUpdate(
        timeSheetId,
        { empClockOut: moment().format("YYYY-MM-DD HH:mm:ss") },
        { new: true }
      );
      const clockIn = moment(clockOutTime.empClockIn, "YYYY-MM-DD HH:mm:ss");
      const clockOut = moment(clockOutTime.empClockOut, "YYYY-MM-DD HH:mm:ss");
      const hoursWorked = clockOut.diff(clockIn, "hours"); // ! Taking difference between clockIn and clockOut in hours .s
      if (hoursWorked >= 8) {
        clockOutTime.empAttendanceStatus = "present";
        clockOutTime.empDaysPresent = "present";
      } else if (hoursWorked < 8) {
        clockOutTime.empAttendanceStatus = "half day";
        clockOutTime.empHalfDays = "half day";
      } else {
        clockOutTime.empAttendanceStatus = "absent";
        clockOutTime.empDaysAbsent = "absent";
      }
      clockOutTime.empHoursLoggedIn = `${hoursWorked} hours`;
      timeSheetLogger.log("info", "Employee status updated");
      res.status(200).json({
        success: true,
        message: "Employee status updated",
        info: clockOutTime,
      });
    } catch (error) {
      timeSheetLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
