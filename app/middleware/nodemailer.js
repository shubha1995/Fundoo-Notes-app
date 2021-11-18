const nodemailer = require("nodemailer");
const auth = require("../middleware/authenticate");
const { logger } = require("../../logger/logger");

require("dotenv").config();

exports.sendEmail = (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });
  logger.info("Jwt Token Generate");
  const token = auth.jwtTokenGenerate(data);
  const mailOptions = {
    from: process.env.EMAIL,
    to: data.email,
    subject: "Reset password Link",
    html: `<h2>please click on this link to change the password</h2>
                <p>${process.env.CLIENT_MAIL}/resetPassword/${token}</p>
                `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return null;
    } else {
      const data = {
        link: process.env.CLIENT_MAIL + "/resetpassword/" + token,
        response: info.response
      };
      return data;
    }
  });
};
