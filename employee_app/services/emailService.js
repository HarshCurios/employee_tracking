const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harshitsharma0529@gmail.com",
    pass: "nncrlnoadedqhphl",
  },
});

module.exports = {
  transporter,
};
