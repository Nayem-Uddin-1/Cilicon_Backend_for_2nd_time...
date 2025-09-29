const express = require("express");
const { SignInController, LoginController, otpController, LogOutController, ResetPasswordController, ForgetPassword } = require("../../controllers/authColtrollers");
const session = require("express-session");
const userModel = require("../../model/userModel");
const authMiddelware = require("../../middelware/authMiddelware");

const router = express.Router();

// localhost:/4000/api/v1/auth/signup

// user signup api
router.post("/signup", SignInController)
// check otp
router.post("/checkotp", otpController)
// user login api
router.post("/login", LoginController)
// user log out api
router.post("/logout",LogOutController)
// reset password

router.post("/reset-password" , ResetPasswordController)

// forget password
router.post("/forget-password",ForgetPassword)

// Auth user 
router.get("/authuser", authMiddelware, async (req, res) => {


   try {

      const userData = await userModel.find({_id:req.session.user.id})
      res.status(200).json({ succes: true,  data:userData })


   } catch (error) {
      res.status(400).json({ succes: false, message: error.message })
   }

})

module.exports = router