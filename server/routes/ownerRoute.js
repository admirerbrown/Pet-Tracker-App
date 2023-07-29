const express = require("express");
const usersAuthController = require("../controllers/OwnerController");
const auth = require("../middleWares/auth");

const router = express.Router();

// various CRUD operations the user can perform base on this routes and model schema...
router.post("/signUp", usersAuthController.addNewUser);
router.post("/logIn", auth.authenticateToken, usersAuthController.logUserIn);


module.exports = router;