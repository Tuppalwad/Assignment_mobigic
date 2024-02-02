const mongoos = require("mongoose");

const userschama = mongoos.Schema(
  {
    Name : {
      type: String,
      required: true,
    },

    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const User = mongoos.model("User", userschama);
module.exports = User;
