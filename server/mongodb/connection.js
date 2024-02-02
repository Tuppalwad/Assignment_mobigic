const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {

    const URL= process.env.MONGODB_URL;
    console.log(URL)
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection failed");
    }
}
module.exports = connection;
