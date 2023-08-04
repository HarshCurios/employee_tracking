const mongoose = require("mongoose");

const empNotificationSchema = new mongoose.Schema({
  notificationTitle: {
    type: String,
    require: true,
  },
  notificationMessage: {
    type: String,
    require: true,
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
empTimeSheetSchema.set("timestamps", true);

module.exports = mongoose.model("notification", empNotificationSchema);
