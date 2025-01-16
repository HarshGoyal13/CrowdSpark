const contactEmail = require("../config/Nodemailer");
const express = require("express");

const router = express.Router();

router.post('/contactUs', (req, res) => {
    const { name, email, message, subject } = req.body;  // Extract subject from the body
    const mail = {
        from: name,
        to: process.env.RECEIVER_EMAIL,
        subject: "Contact Form CrowdFunding - Dapp",
        html: `<p>Name: ${name}</p>
               <p>Email: ${email}</p>
               <p>Message: ${message}</p>
               <p>Subject: ${subject}</p>`,
    };

    // Send email to receiver
    contactEmail.sendMail(mail, (error, info) => {
        if (error) {
            console.error("Error sending email: ", error);
            res.status(400).send({
                message: "Error in sending mail",
              });
        } else {
            console.log('Email sent to receiver: ' + info.response);
            res.status(201).send({
                success:true,
                message: "Mail Sent  Successfully",
              });
        }

        // Send confirmation email to the user
        const mailTouser = {
            from: "CrowdFunding@gmail.com",
            to: email,
            subject: "Contact Form Query Received - Dapp",
            html: `<p>Name: ${name}</p>
                   <p>Email: ${email}</p>
                   <p>Message: ${message}</p>
                   <p>Subject: ${subject}</p>
                   <p>Your message has been received. We will get back to you soon.</p>`,
        };

        contactEmail.sendMail(mailTouser, (error) => {
            if (error) {
                console.error("Error sending email to user: ", error);
                res.status(400).send({
                    message: "Error In Mail sent to user",
                  });
            } else {
                console.log('Confirmation email sent to user');
                res.status(201).send({
                    success : true,
                    message: "Mail Sent to User Successfully",
                  });
            }
        });
    });
});

module.exports = router;
