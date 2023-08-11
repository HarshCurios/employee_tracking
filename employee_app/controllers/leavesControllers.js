const empLeaveSchema = require("../../models/empLeaveSchema");
const leavesLogger = require("../../utils/leavesLogger");

module.exports = {
  empLeave: async (req, res) => {
    const empId = req.params.id;
    const { startDate, endDate } = req.body;
    const leaveData = new empLeaveSchema(req.body);
    try {
      leaveData.empID = empId;
      if (leaveData.empLeaveType === "casual") {
        if (leaveData.empCasualLeave > 0) {
          await leaveData.save();
          leavesLogger.log("info", "Applied for casual leave");
          res.status(201).json({
            success: true,
            message: "Applied for casual leave",
            leaveInfo: leaveData,
          });
        }
        return res.status(401).send({
          success: false,
          message: "Your casual leaves are over , you can't apply",
        });
      } else if (leaveData.empLeaveType === "sick") {
        if (leaveData.empSickLeave > 0) {
          await leaveData.save();
          leavesLogger.log("info", "Applied for sick leave");
          res.status(201).json({
            success: true,
            message: "Applied for sick leave",
            leaveInfo: leaveData,
          });
        }
        return res.status(401).send({
          success: false,
          message: "Your sick leaves are over , you can't apply",
        });
      } else {
        await leaveData.save();
        leavesLogger.log("info", "Applied for other leave");
        res.status(201).json({
          success: true,
          message: "Applied for other leave",
          leaveInfo: leaveData,
        });
      }
      leaveData.startDate = startDate;
      leaveData.endDate = endDate;
    } catch (error) {
      leavesLogger.log("error", error.message);
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  },
};
