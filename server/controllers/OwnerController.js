const dotenv = require('dotenv');

const Owner = require('../models/OwnerModel');
const jwt = require('jsonwebtoken');

// Load config
dotenv.config({ path: '../config/config.env' });


// a post request to signup..
const addNewUser = async (req, res) => {
    try {
        const newUser = await Owner.create({ ...req.body });
        res.status(200).json({
            success: true,
            message: " New User account created successfully",
            newUser,
        });

    } catch (error) {
        res.status(400).send("Sorry couldn't create your account.check your connection and try again: " + error);
        console.log("couldn't create account...");
    }
}


// post request to log in...
const logUserIn = async (req, res) => {
    const { email, name } = req.body;

    try {
        const user = await Owner.findOne({ email });

        if (user) {
           
            const isMatch = name.toLowerCase() === user.name.toLowerCase();

            if (isMatch) {
                // generate jwt access Token..
                const { _id, email } = user;
                const accessToken = jwt.sign({ _id, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
                res.status(200).json({
                    success: true,
                    message: "log in successful",
                    accessToken: accessToken,
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Usernames do not match",
                });

            }
        }
        else {
            res.status(400).json({
                success: false,
                message: "Invalid email. Check your credentials or signup",
            });

        }
    } catch (error) {
        res.status(400).send("Oops error encountered: " + error);
    }
}


module.exports = {
    addNewUser,
    logUserIn,
}
