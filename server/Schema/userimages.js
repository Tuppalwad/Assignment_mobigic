// userimages.model.js
const mongoose = require("mongoose");

const userimagesSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    images: [{
        imageID: {
            type: String,
            required: true,
        },
        imagecode: {
            type: String,
            required: true,
        },
    }],
}, { timestamps: true });

const Userimages = mongoose.model("Userimages", userimagesSchema);

module.exports = Userimages;
