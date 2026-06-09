const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = async ({ name, email, subject, message }) => {
  return transporter.sendMail({
    from: `"MRI Contact Form" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    replyTo: email,
    subject: `New Contact: ${subject || "General Inquiry"}`,
    html: `
      <h3>New Contact Message</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Subject:</b> ${subject}</p>
      <p><b>Message:</b><br/>${message}</p>
    `,
  });
};

module.exports = sendMail;