const empLeaveSchema = require("../../models/empLeaveSchema");

module.exports = {
  empLeave: async (req, res) => {
    const empId = req.params.id;
    const leaveData = new empLeaveSchema(req.body);
    try {
      leaveData.empID = empId;
      await leaveData.save();
      if (leaveData.empLeaveType === "casual") {
        res.status(201).json({
          success: true,
          message: "Applied for casual leave",
          leaveInfo: leaveData,
        });
      } else if (leaveData.empLeaveType === "sick") {
        res.status(201).json({
          success: true,
          message: "Applied for sick leave",
          leaveInfo: leaveData,
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Applied for other leave",
          leaveInfo: leaveData,
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error!",
        error: error.message,
      });
    }
  },
};
