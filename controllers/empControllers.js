const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const empSchema = require("../models/employSchema");
const empLogger = require("../utils/empLogger");
const { transporter } = require("../services/emailService");
const authService = require("../services/authService");

module.exports = {
  empSignUp: async (req, res) => {
    const empData = new empSchema(req.body);
    try {
      const isEmpExists = await authService.isExists(req.body.empEmail);
      if (isEmpExists) {
        empLogger.log(
          "error",
          "Employee already exists with this email, please log in"
        );
        res.status(409).json({
          //!conflict
          success: false,
          message: "Employee already exists with this email, please log in",
        });
      } else {
        if (empData.empGender === "male") {
          let filePath = path.join(__dirname, "..", "uploads/male.jpg");
          empData.empProfilePic = filePath;
        } else {
          let filePath = path.join(__dirname, "..", "uploads/female.jpg");
          empData.empProfilePic = filePath;
        }
        const salt = await bcrypt.genSalt(10);
        empData.empPass = await bcrypt.hash(req.body.empPass, salt);
        const employee = await empData.save();
        empLogger.log("info", "Employee's account created");
        res.status(201).json({
          success: true,
          message: "Employee's account created",
          createdEmployee: employee,
        });
      }
    } catch (error) {
      empLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  empLogIn: async (req, res) => {
    const { empEmail, empPass } = req.body;
    try {
      let { valid, token } = await authService.validateEmployee(
        empEmail,
        empPass
      );
      if (valid) {
        empLogger.log("info", "Employee logged in successfully");
        res.status(200).json({
          success: true,
          message: "Employee logged in successfully",
          accessToken: token,
        });
      } else {
        empLogger.log("error", "Email or password is not valid");
        res.status(401).json({
          //! invalid credentials esliye unauthorized wala status code
          success: false,
          message: "Email or password is not valid",
        });
      }
    } catch (error) {
      empLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  sendEmpResetPassEmail: async (req, res) => {
    let { empEmail } = req.body;
    try {
      let { empData, accessToken } = await authService.validateEmployee(
        empEmail
      );
      if (empData) {
        const link = `https://localhost:3000/employee/resetpassword/${empData._id}/${accessToken}`;
        const info = await transporter.sendMail({
          from: process.env.EMAIL,
          to: empEmail,
          subject: "Reset password email",
          html: `<a href=${link}>click on this for reset password`,
        });
        empLogger.log("info", "Email sent successfully");
        return res.status(200).json({
          success: true,
          message: "Email sent successfully",
          empId: empData._id,
          token: accessToken,
        });
      } else {
        empLogger.log("error", "Invalid email, please enter valid email");
        res.status(400).json({
          //! bad request, invalid input
          success: false,
          message: "Invalid email, please enter valid email",
        });
      }
    } catch (error) {
      empLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  resetPassword: async (req, res) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    try {
      const checkEmp = await empSchema.findById(id);
      if (checkEmp != null) {
        const secret = checkEmp._id + process.env.SECRET_KEY;
        jwt.verify(token, secret);
        if (newPassword === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
          await empSchema.findByIdAndUpdate(checkEmp._id, {
            $set: { empPass: bcryptPassword },
          });
          empLogger.log("info", "Password updated successfully");
          res.status(200).json({
            success: true,
            message: "Password Updated Successfully",
          });
        } else {
          empLogger.log(
            "error",
            "newPassword and confirmPassword does not match"
          );
          res.status(400).json({
            //! bad request
            success: false,
            message: "newPassword and confirmPassword does not match",
          });
        }
      }
    } catch (error) {
      empLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  setNewPassword: async (req, res) => {
    const empId = req.params.id;
    console.log(empId);
    const { oldPassword, newPassword, confirmPassword } = req.body;
    try {
      const empData = await empSchema.findById(empId);
      const checkPass = await bcrypt.compare(oldPassword, empData.empPass);
      if (checkPass) {
        if (newPassword === confirmPassword) {
          const salt = bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(newPassword, parseInt(salt));
          empData.empPass = hashPassword;
          empLogger.log("info", "Password updated successfully");
          res.status(200).json({
            success: true,
            message: "Password Updated Successfully",
          });
        } else {
          empLogger.log(
            "error",
            "newPassword and confirmPassword does not match"
          );
          res.status(400).json({
            //! bad request
            success: false,
            message: "newPassword and confirmPassword does not match",
          });
        }
      } else {
        empLogger.log("error", "Invalid password, please enter valid password");
        res.status(400).json({
          //! bad request, invalid input
          success: false,
          message: "Invalid password, please enter valid password",
        });
      }
    } catch (error) {
      empLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  updatePicAndAddress: async (req, res) => {
    const empId = req.params.id;
    const { empAddress } = req.body;
    try {
      const empData = await empSchema.findById(empId);
      const filePath = `/uploads/user/${req.file.filename}`;
      empData.empProfilePic = filePath;
      empData.empAddress = empAddress;
      await empData.save();
      empLogger.log("info", "Password updated successfully");
      res.status(200).json({
        success: true,
        message: "Password Updated Successfully",
      });
    } catch (error) {
      empLogger.log("error", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
