const mongoose = require("mongoose");

const MileStoneSchema = new mongoose.Schema({
    name: {
        type: String, // Fixed capitalization
        required: true
    },
    email: {
        type: String, // Fixed capitalization
        required: true
    },
    target: {
        type: Number, // Fixed capitalization
        required: true
    },
    campaignTitle: {
        type: String, // Fixed capitalization
        required: true
    },
    description: {
        type: String, // Fixed capitalization
        required: true
    },
    imageURl: {
        type: String, // Fixed capitalization
        required: true
    }
});

// Correctly exporting the model
module.exports = mongoose.model("Milestone", MileStoneSchema);
