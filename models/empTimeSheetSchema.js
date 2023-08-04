const mongoose = require("mongoose");

const empTimeSheetSchema = new mongoose.Schema({
  empClockIn: {
    type: String,
    require: true,
  },
  empClockOut: {
    type: String,
    require: true,
  },
  empHoursLoggedIn: {
    type: String,
    default: "0",
  },
  empClockInIP: {
    type: String,
    require: true,
  },
  empWorkingFrom: {
    type: String,
    require: true,
  },
  empWorkingDays: {
    type: String,
    default: "0",
  },
  empDaysPresent: {
    type: String,
    require: true,
  },
  empHalfDays: {
    type: String,
    default: "active",
  },
  empDaysAbsent: {
    type: String,
    require: true,
  },
  empHolidays: {
    type: String,
    default: "employee",
  },
  empDaysLate: {
    type: String,
    required: true,
  },
  empAttendanceStatus: {
    type: String,
    required: true,
  },
  isActive: {
    type: String,
    default: "true",
  },
  empID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
});
empSchema.set("timestamps", true);

module.exports = mongoose.model("timeSheet", empTimeSheetSchema);
