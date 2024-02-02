const mongoos = require("mongoose");

const sectionSchema = mongoos.Schema(
    {
        section_token: {
        type: String,
        required: true,
        },
        user_id: {
        type: String,
        required: true,
        },
    },
    { timestamps: true }
    );

const Section = mongoos.model("Section", sectionSchema);

module.exports = Section;