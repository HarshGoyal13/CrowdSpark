const contactEmail = require("../config/Nodemailer");
const express = require("express");
const router = express.Router();
const Milestone = require("../schema/MileStoneSchems")

router.post("/AddUser", async (req, res) => {
    try {
        const { name, email, target, campaignTitle,description, imageURl } = req.body;
        console.log("Image Url = ",imageURl)
        // Create the user document in the database
        const data = await Milestone.create({
            name,
            email,
            target,
            campaignTitle,
            description,
            imageURl
        });
        console.log("Campaign created:", data);



        // Send confirmation email to the user
        const mail = {
            from: "CrowdFunding@gmail.com",
            to: email,
            subject: "Campaign Created Successfully - Dapp",
            html: `
                <p>Dear ${name},</p>
                <p>Your campaign titled "<strong>${campaignTitle}</strong>" has been created successfully!</p>
                <p>Target Amount: ${target} Ether</p>
                <p>Thank you for using our platform to bring your ideas to life.</p>
                <p>Best regards,</p>
                <p>The CrowdFunding DAPP</p>
            `,
        };

        contactEmail.sendMail(mail, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).send({
                    message: "Campaign created, but error sending confirmation email",
                });
            } else {
                console.log(`Confirmation email sent to ${email}:`, info.response);
                res.status(200).send({
                    message: "Campaign created successfully. Confirmation email sent to user.",
                    data,
                });
            }
        });
    } catch (error) {
        console.error("Error creating campaign:", error);
        res.status(500).send({
            message: "Error in creating campaign",
            error: error.message, // Detailed error message for debugging
        });
    }
});

module.exports = router;
