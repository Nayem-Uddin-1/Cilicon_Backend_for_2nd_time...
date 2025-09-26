// signin coltroller

const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');

const emailValidation = require("../helpers/emailValidation");
const sendMail =require('../helpers/sendMail')

function SignInController(req, res) {
  const { username, email, password } = req.body


  try {

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        return res.status(400).json({ success: false, message: "something went wrong" + err })

      } else {
        
        // console.log(emailValidation(email));
        if(!emailValidation(email)){
          return res.status(401).json({
            success:false,
            message:"email not valid"
          })
        }
        // send data to user model
        let user = new userModel({
          username,
          email,
          password: hash,
        })

        await user.save();

        // verify email
        sendMail(email)



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


function LoginController(req, res) {
  res.send("Log-in user route");
}



module.exports = { SignInController, LoginController }