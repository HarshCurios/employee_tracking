const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

const empValSchema = {
  empSignUp: joi
    .object({
      empName: joi
        .string()
        .min(3)
        .max(20)
        .message({
          "string.min": "{#label} should contain at least {#limit} character",
          "string.max":
            "{#label} should not contain more than {#limit} characters",
        })
        .required(),
      empPhone: joi
        .number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .message("Invalid mobile number")
        .required(),
      empEmail: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .message("Invalid email address")
        .required(),
      empPass: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .messages({
          "password.minOfUppercase":
            "{#label} should contain at least {#min} uppercase character",
          "password.minOfSpecialCharacters":
            "{#label} should contain at least {#min} special character",
          "password.minOfLowercase":
            "{#label} should contain at least {#min} lowercase character",
          "password.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
          "password.noWhiteSpaces": "{#label} should not contain white spaces",
          "password.onlyLatinCharacters":
            "{#label} should contain only latin characters",
        })
        .required(),
      empGender: joi.string().required(),
      empCity: joi.string().required(),
      empTechnologies: joi.string().required(),
      //empRole: joi.string().required()
    })
    .unknown(true),

  empLogIn: joi
    .object({
      empEmail: joi
        .string()
        .email()
        .message("invalid email address")
        .required(),
      empPass: joi.string().required(),
    })
    .unknown(true),

  sendEmpResetPassEmail: joi
    .object({
      empEmail: joi
        .string()
        .email()
        .message("invalid email address")
        .required(),
    })
    .unknown(true),

  resetPassword: joi
    .object({
      newPassword: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .messages({
          "password.minOfUppercase":
            "{#label} should contain at least {#min} uppercase character",
          "password.minOfSpecialCharacters":
            "{#label} should contain at least {#min} special character",
          "password.minOfLowercase":
            "{#label} should contain at least {#min} lowercase character",
          "password.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
          "password.noWhiteSpaces": "{#label} should not contain white spaces",
          "password.onlyLatinCharacters":
            "{#label} should contain only latin characters",
        })
        .required()
        .label("Password"),
      confirmPassword: joi
        .any()
        .equal(joi.ref("newPassword"))
        .required()
        .label("Confirm password")
        .options({ messages: { "any.only": "{{#label}} does not match" } }),
    })
    .unknown(true),
};

module.exports = empValSchema;
