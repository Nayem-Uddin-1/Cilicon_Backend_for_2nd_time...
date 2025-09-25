const express = require("express");
const { SignInController, LoginController } = require("../../controllers/authColtrollers");

const router = express.Router();

// localhost:/4000/api/v1/auth/signup

// user signup authentication
router.post("/signup", SignInController )
router.post("/login", LoginController )





module.exports = router