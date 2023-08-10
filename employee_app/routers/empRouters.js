const express = require("express");

const employee = require("../controllers/empControllers");
const {
  empSignUpValidation,
  logInEmpValidation,
  sendEmpPasswordEmailValidation,
  resetPasswordValidation,
} = require("../validations/employee/empDataVal");
const {empUpload} = require("../middlewares/empImageStorage");
const {isEmployee} = require("../../middlewares/authUser")

const empRouter = express.Router();

empRouter.post("/create", empSignUpValidation, employee.empSignUp);
empRouter.post("/login", isEmployee, logInEmpValidation ,employee.empLogIn);
empRouter.post("/resetpassswordemail", sendEmpPasswordEmailValidation,
  employee.sendEmpResetPassEmail);
empRouter.post("/resetpassword/:id/:token", resetPasswordValidation,
  employee.resetPassword);
empRouter.post("/setnewpassword/:id", employee.setNewPassword );
empRouter.post("/")

module.exports = empRouter;
