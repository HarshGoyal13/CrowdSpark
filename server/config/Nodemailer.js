const nodemailer = require("nodemailer");
require("dotenv").config();

const contactEmail = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE || 'gmail', // Default to Gmail if MAIL_SERVICE is not set
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify the transporter is set up correctly
contactEmail.verify((error) => {
    if (error) {
        console.log("Error verifying mail transport:", error);
    } else {
        console.log("Ready to send mail");
    }
});

module.exports = contactEmail;
