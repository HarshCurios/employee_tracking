const express = require("express");

const admin = require("../../employee_app/controllers/empControllers");
const { employeeDashboard } = require("../controllers/adminControllers");
const { isAdmin } = require("../../middlewares/authUser");

const adminRouter = express.Router();

adminRouter.post("/login", isAdmin, admin.empLogIn);
adminRouter.get("/empdata", employeeDashboard);

module.exports = adminRouter;
