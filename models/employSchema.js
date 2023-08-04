const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  empName: {
    type: String,
    require: true,
  },
  empPhone: {
    type: Number,
    require: true,
  },
  empEmail: {
    type: String,
    require: true,
  },
  empPass: {
    type: String,
    require: true,
  },
  empGender: {
    type: String,
    require: true,
  },
  empCity: {
    type: String,
    require: true,
  },
  empAddress: {
    type: String,
    default: "",
  },
  empWorkingStatus: {
    type: String,
    default: "working",
  },
  empTechnologies: {
    type: String,
    require: true,
  },
  empRole: {
    type: String,
    default: "employee",
  },
  empProfilePic: {
    type: String,
  },
  isActive: {
    type: String,
    default: "true",
  },
});
empSchema.set("timestamps", true);

module.exports = mongoose.model("employee", empSchema);
