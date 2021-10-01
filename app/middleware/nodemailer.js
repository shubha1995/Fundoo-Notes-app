const nodemailer = require("nodemailer");
require("dotenv").config();
const auth = require("../middleware/authenticate");

exports.sendEmail = (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.pass
    }
  });

  const token = auth.generateToken(data);
  const mailOptions = {
    from: process.env.email,
    to: data.email,
    subject: "Reset password Link",
    html: `<h2>please click on this link to change the password</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
                <p>${token}</p> `
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return (err, null);
    } else {
      const data = {
        link: process.env.CLIENT_URL + "/resetpassword/" + token,
        response: info.response
      };
      return (null, data);
    }
  });
};
