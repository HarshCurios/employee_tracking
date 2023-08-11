const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harshitsharma0529@gmail.com",
    pass: "nncrlnoadedqhphl",
  },
});

const sendMailService = async (link, empEmail, subject) => {
  let value  = false
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: empEmail,
    subject: subject,
    html: `<a href=${link}>click on this for reset password`,
  });
  value = true
  const data = await value
  return {data}
};

module.exports = {
  sendMailService,
};
