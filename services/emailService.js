import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (from, to, subject, text) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;
