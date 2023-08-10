const empValSchema = require("./empSchemaVal");

module.exports = {
  empSignUpValidation: async (req, res, next) => {
    let isValid = await empValSchema.empSignUp.validate(req.body, {
      aboutEarly: false,
    });
    if (isValid.error) {
      res.status(400).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },

  logInEmpValidation: async (req, res, next) => {
    let isValid = await empValSchema.empLogIn.validate(req.body, {
      aboutEarly: false,
    });
    if (isValid.error) {
      res.status(400).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },

  sendEmpPasswordEmailValidation: async (req, res, next) => {
    let isValid = await empValSchema.sendEmpResetPassEmail.validate(req.body, {
      aboutEarly: false,
    });
    if (isValid.error) {
      res.status(400).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },

  resetPasswordValidation: async (req, res, next) => {
    let isValid = await empValSchema.resetPassword.validate(req.body, {
      aboutEarly: false,
    });
    if (isValid.error) {
      res.status(400).json({
        success: false,
        message: isValid.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
