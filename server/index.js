const express = require("express");
const connection = require("./mongodb/connection.js");
require("dotenv").config();
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
const User = require("./Schema/userschema.js");
const Section = require("./Schema/section.js");
const Userimages = require("./Schema/userimages.js");
const mongoose = require("mongoose");
const cors = require("cors");
// import jwt token
const jwt = require("jsonwebtoken");

const SecretKey = "secretkey";

app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const users = await User.find();
    console.log(req.body)
    for (let i = 0; i < users.length; i++) {
      if (users[i].Email == req.body.Email) {
        return res.status(400).json({ error: "User already exists", status: 400 });
      }
    }

    const { Email, Password,Name } = req.body
    console.log(Email,Password)
    if (!Email || !Password) {
      return res.status(400).json({ error: "All fields are required", status: 400 });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(Password, 10); // You can adjust the salt rounds as needed

    // Create new user with encrypted password
    const user = await User.create({ Email, Password: hashedPassword,Name:Name });
    
    return res.status(200).json({ user, message: "User created", status: 200 });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const users = await User.find();

    for (let i = 0; i < users.length; i++) {
      if (users[i].Email == Email) {
        // Verify the password
        const passwordMatch = await bcrypt.compare(Password, users[i].Password);

        if (passwordMatch) {
          const section = await Section.create({
            section_token: jwt.sign({ Email: Email }, SecretKey),
            user_id: users[i]._id,
          });

          return res.status(200).json({ section, message: "Login" ,status:200});
        } else {
          return res.status(400).json({ error: "Invalid password",status:400 });
        }
      }
    }

    return res.status(400).json({ error: "Invalid user",status:400 });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});


app.post("/checkuser", async (req, res) => {
  try {
    const { section_token } = req.body;
    const section = await Section.findOne({ section_token: section_token });

    if (section) {
      return res.status(200).json({ message: "User is logged in",status:200 });
    } else {
      return res.status(400).json({ error: "Invalid user",status:400 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

);



app.post("/logout", async (req, res) => {
  try {
    const { section_token } = req.body;
    const section = await Section.findOne({ section_token: section_token });

    if (section) {
      // Attempt to delete the section
      const deletionResult = await Section.deleteOne({ _id: section._id });

      if (deletionResult.deletedCount > 0) {
        return res.status(200).json({ message: "Logout successful",status:200 });
      } else {
        return res.status(500).json({ error: "Failed to logout. Please try again." ,status:400});
      }
    } else {
      return res.status(400).json({ error: "Invalid user",status:400 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong",status:400 });
  }
});


app.post('/addimage', async (req, res) => {
  try {
    console.log(req.body)
    const { section_token, images } = req.body; // Updated to use the "images" key
    const { imageID, imagecode } = images[0]; // Extracting the values from the images array

    const section = await Section.findOne({ section_token });

    if (!section) {
      return res.status(400).json({ error: "Invalid user" });
    }

    const userimage = await Userimages.findOne({ user_id: section.user_id });

    try {
      if (userimage) {
        // User image entry already exists, add new image to the array
        userimage.images.push({ imageID, imagecode });
        await userimage.save();
      } else {
        // User image entry does not exist, create a new one
        await Userimages.create({
          user_id: section.user_id,
          images: [{ imageID, imagecode }],
        });
      }

      return res.status(200).json({ message: "Image added successfully" ,status:200});
    } catch (saveError) {
      console.error("Error saving user image:", saveError);
      return res.status(500).json({ error: "Error saving user image",status:400 });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong",status:400 });
  }
});


app.post('/removeimage', async (req, res) => {
  try {
    const { section_token, imageID } = req.body;
    const section = await Section.findOne({ section_token });

    if (!section) {
      return res.status(400).json({ error: "Invalid user" });
    }

    const userimage = await Userimages.findOne({ user_id: section.user_id });

    if (!userimage) {
      return res.status(400).json({ error: "User image not found",status:400 });
    }
    console.log(imageID)

    const imageIndex = userimage.images.findIndex((image) => image.imageID === imageID);

    if (imageIndex === -1) {
      return res.status(400).json({ error: "Image not found" ,status:400});
    }

    userimage.images.splice(imageIndex, 1);
    await userimage.save();

    return res.status(200).json({ message: "Image removed successfully", status:200   });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" ,status:400});
  }
});

// get user name using token  
app.post('/getusername', async (req, res) => {
  try {
    const { section_token } = req.body;
    console.log(req.body)
    const section = await Section.findOne({ section_token });
    if (!section) {
      return res.status(400).json({ error: "Invalid user" });
    }
    const user = await User.findOne({ _id: section.user_id });
    return res.status(200).json({ user: user.Name,status:200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong",status:400 });
  }
});



// get image list using token

app.post('/getimagelist', async (req, res) => {
  try {
    const { section_token } = req.body;
    const section = await Section.findOne({ section_token });
    if (!section) {
      return res.status(400).json({ error: "Invalid user" });
    }
    const userimage = await Userimages.findOne({ user_id: section.user_id });
    if (!userimage) {
      return res.status(400).json({ error: "User image not found" });
    }
    return res.status(200).json({ images: userimage.images,status:200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" ,status:400});
  }
}
);


connection();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});