const mongoose = require("mongoose");

const empLeaveSchema = new mongoose.Schema({
  empTotalLeave: {
    type: Number,
    default: 0
  },
  empCasualLeave: {
    type: Number,
    default: 10,
  },
  empSickLeave: {
    type: Number,
    default: 10,
  },
  empLeaveType: {
    type: String,
    default: "casual",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  empLeaveStatus: {
    type: String,
    default: "pending",
  },
  empLeaveMessage: {
    type: String,
    default: "",
  },
  isActive: {
    type: String,
    default: "true",
  },
  empID: {
    type: mongoose.Types.ObjectId,
    ref: "employee",
    required: true,
  },
});
empLeaveSchema.set("timestamps", true);

module.exports = mongoose.model("leave", empLeaveSchema);
