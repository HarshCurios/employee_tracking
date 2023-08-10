const timeSheetSchema = require("../../models/empTimeSheetSchema");
const empLeaveSchema = require("../../models/empLeaveSchema");
const empNotificationSchema = require("../../models/empNotificationSchema");

module.exports = {
  employeeDashboard: async (req, res) => {
    try {
      const today = new Date();
      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0); // Set time to midnight
      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);
      const empData = await timeSheetSchema
        .find(
          {
            createdAt: {
              $gte: startOfDay,
              $lte: endOfDay,
            },
          },
          { _id: 0, empClockIn: 1, empClockOut: 1 }
        )
        .populate({ path: "empID", select: "empName" });
      res.status(200).json({
        success: true,
        message: "Employees data fetched successfully",
        empData: empData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

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

  empLeave: async (req, res) => {
    const leaveId = req.params.id;
    const { empLeaveStatus, empLeaveMessage } = req.body;
    const leaveData = await empLeaveSchema.findById(leaveId);
  },
};
