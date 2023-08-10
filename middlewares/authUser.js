const empSchema = require("../models/employSchema");

module.exports = {
  isAdmin: async (req, res, next) => {
    const empData = await empSchema.findOne({
      empRole: req.body.empRole,
    });
    if (empData.empRole === "admin") {
      next();
    } else {
      res.status(401).json({
        success: false,
        message: "User is not authorized as an admin",
      });
    }
  },

  isEmployee: async (req, res, next) => {
    const empData = await empSchema.findOne({
      empRole: req.body.empRole,
    });
    if (empData.empRole === "employee") {
      next();
    } else {
      res.status(401).json({
        success: false,
        message: "User is not authorized as an employee",
      });
    }
  },
};
