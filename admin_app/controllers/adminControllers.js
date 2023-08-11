const timeSheetSchema = require("../../models/empTimeSheetSchema");
const empLeaveSchema = require("../../models/empLeaveSchema");
const empNotificationSchema = require("../../models/empNotificationSchema");
const adminLogger = require("../../utils/adminLogger");

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
      adminLogger.log("info", "Employees data fetched successfully");
      res.status(200).json({
        success: true,
        message: "Employees data fetched successfully",
        empData: empData,
      });
    } catch (error) {
      adminLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  empLeave: async (req, res) => {
    try {
      const { id } = req.params;
      const { empStatus } = req.body;
      const type = await empLeaveSchema.findById(id);
      const leave = await empLeaveSchema.findByIdAndUpdate(
        id,
        { empStatus },
        { new: true }
      );
      const user = await empLeaveSchema.findById(leave.id);
      if (empStatus === "accepted") {
        if (type.empLeaveType === "casual") {
          user.empCasualLeave -= 1;
        } else if (type.empLeaveType === "sick") {
          user.empSickLeave -= 1;
        }
      }
        
      await Promise.all([leave.save(), user.save()]);
      res.status(201).json({
        success: true,
        message: "Leave status update ",
        leave: leave,
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
      adminLogger.log("info", "Notification created");
      res.status(201).json({
        success: true,
        message: "Notification created",
        notification: notificationData,
      });
    } catch (error) {
      adminLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateNotification: async (req, res) => {
    no
  }
};
