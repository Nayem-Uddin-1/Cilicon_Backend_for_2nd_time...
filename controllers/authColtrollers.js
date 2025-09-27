// signin coltroller

const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');

const emailValidation = require("../helpers/emailValidation");
const sendMail = require('../helpers/sendMail');
const randomOTP = require("../helpers/random-otp");
const jwt = require('jsonwebtoken');



// Signin Controller
function SignInController(req, res) {
  const { username, email, password } = req.body


  try {
    // OTP from random-otp.js
    otp = randomOTP()
    // ecrypt funtion ...
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.status(400).json({ success: false, message: "something went wrong" + err })

      } else {
        // console.log(emailValidation(email));
        if (!emailValidation(email)) {
          return res.status(401).json({
            success: false,
            message: "email not valid"
          })
        }
        // send data to database user model
        let user = new userModel({
          username,
          email,
          password: hash,
          otp: otp
        })
        await user.save();

        // verify email function
        sendMail(email, otp)

        setTimeout(async () => {

          await userModel.findOneAndUpdate({ email }, { otp: null }).then((result) => {
            console.log("otp updated successfully");

          }).catch((err) => {
            console.log(err);
          });

          user.save();


        }, 600000)



        // user account creation message
        return res.status(201).json({
          message: "user created successfully",
          success: true,
          user,
        })
      }
    });




  } catch (error) {

    // Error message
    console.error("SignIn Error:", error);

    return res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }


}

// Check Otp Controller
const otpController = async (req, res) => {
  const { email, otp } = req.body

  try {

    const otpVerify = await userModel.findOne({ email })

    if (otpVerify.otp === otp) {
      otpVerify.isVerify = true
      otpVerify.otp = null
      await otpVerify.save()

      return res.status(200).json({
        success: true,
        message: "Your email is verified"
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      })
    }

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Something went wrong",
    })
  }
}

async function LoginController(req, res) {

  const { email, password } = req.body

  try {

    const existingUser = await userModel.findOne({ email })

    if (!existingUser) {
      res.status(400).json({ success: false, message: "Email Invalid" })
    }
    else {

      bcrypt.compare(password, existingUser.password, function (err, result) {


        if (!err) {
          if (result) {

                 const userData= {
                   id:existingUser._id,
                   email:existingUser.email,
                   role:existingUser.role,
                 }

                 const token = jwt.sign({ userData }, process.env.jwtsecret ,{ expiresIn: '1m' });
                  res.cookie("token",token)

            res.status(200).json({ message: "Login Successfull", data: userData ,token:token})
          } else {
            res.status(400).json({ success: false, message: "Password Invalid" })

          }
        } else {
          res.status(501).json({ success: false, message: message.err })

        }

      });





    }


  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.email || "something went wrong"
    })
  }

}



module.exports = { SignInController, LoginController, otpController }