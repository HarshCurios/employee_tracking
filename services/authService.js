const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const empSchema = require("../models/employSchema");

module.exports = {
  isExists: async (empEmail) => {
    let value = false;
    const isEmpExits = await empSchema.findOne({
      empEmail: empEmail,
    });
    if (isEmpExits) {
      value = true;
    }
    return value;
  },

  validateEmployee: async (empEmail, empPass = 0) => {
    let valid = false;
    const empData = await empSchema.findOne({
      empEmail: empEmail,
    });
    let token = await jwt.sign({ empId: empData._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    let accessToken ;
    if (empData) {
      if (empPass != 0) {
        const hashPassword = await bcrypt.compare(empPass, empData.empPass);
        if (empData && hashPassword) {
          accessToken = token;
          valid = true;
        }
      } else {
        accessToken = token;
      }
    }
    return { valid, accessToken, empData };
  },
};
