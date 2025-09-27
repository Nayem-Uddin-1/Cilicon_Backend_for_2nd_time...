const express = require("express");
const { SignInController, LoginController, otpController } = require("../../controllers/authColtrollers");
const session = require("express-session");

const router = express.Router();

// localhost:/4000/api/v1/auth/signup

// user signup api
router.post("/signup", SignInController )

// check otp
router.post("/checkotp",otpController)

// user login api
router.post("/login", LoginController )


router.get("/authuser",(req,res)=>{
   res.send(req.session.user)
   console.log(req.session.user);
   
   
})

module.exports = router