const nodemailer = require("nodemailer");
const auth = require("../middleware/authenticate");

require("dotenv").config();

exports.sendEmail = (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });

  const token = auth.generateToken(data);
  const mailOptions = {
    from: process.env.EMAIL,
    to: data.email,
    subject: "Reset password Link",
    html: `<h2>please click on this link to change the password</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
                `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return null;
    } else {
      const data = {
        link: process.env.CLIENT_URL + "/resetpassword/" + token,
        response: info.response
      };
      return data;
    }
  });
};
