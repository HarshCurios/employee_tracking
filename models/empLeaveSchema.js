const mongoose = require("mongoose");

const empLeaveSchema = new mongoose.Schema({
  empTotalLeave: {
    type: Number,
    require: true,
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
  empLeaveStatus: {
    type: String,
    require: true,
  },
  empLeaveMessage: {
    type: String,
    default: "0",
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

module.exports = mongoose.model("leave", empLeaveSchema);
