const router = require("express").Router();
const User = require("../models/User")
//Importing bcrypt pakage for making hash password
const bcrypt = require('bcrypt');
//REGISTER

//CREATE USER

router.post("/register", async (req, res) => {
    try {
        console.log("Register Request Body:", req.body);

        // Rounds of salting the hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        console.log("Plain Password:", req.body.password);
        console.log("Hashed Password:", hashedPassword);

        // Making new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // Saving new user in DB
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json(err);
    }
})


//LOGIN
// first we should find user with username then we should compare wether the password of user and inputed password are same

router.post("/login", async (req, res) => {
    try {
        console.log("Login Request Body:", req.body);

        // Find user with username
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            console.log("User not found");
            return res.status(400).json("wrong credential");
        }

        console.log("Plain Password:", req.body.password);
        console.log("Hashed Password from DB:", user.password);

        // Compare password
        const validated = await bcrypt.compare(req.body.password, user.password);
        console.log("Password Validation Result:", validated);

        if (!validated) {
            console.log("Password validation failed");
            return res.status(400).json("wrong credential");
        }

        // Send information except password
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json(err);
    }
});


module.exports =router