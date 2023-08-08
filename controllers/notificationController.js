const empNotificationSchema = require("../models/empNotificationSchema");

module.exports = {
  createNotification: async (req, res) => {
    const empId = req.params.id;
    const notificationData = new empNotificationSchema(req.body);
    try {
      notificationData.empID = empId;
      await notificationData.save();
      res.status(201).json({
        success: true,
        message: "Notification created",
        notification: notificationData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
