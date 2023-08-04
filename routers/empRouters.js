const express = require("express");

const employee = require("../controllers/empControllers");
const {
  empSignUpValidation,
  logInEmpValidation,
  sendEmpPasswordEmailValidation,
  resetPasswordValidation,
} = require("../validations/employee/empDataVal");

const empRouter = express.Router();

empRouter.post("/create", empSignUpValidation, employee.empSignUp);
empRouter.post("/login",logInEmpValidation ,employee.empLogIn);
empRouter.post("/resetpassswordemail", sendEmpPasswordEmailValidation,
  employee.sendEmpResetPassEmail);
empRouter.post("/resetpassword/:id/:token", resetPasswordValidation,
  employee.resetPassword);

module.exports = empRouter;
