


// signin coltroller

const userModel = require("../model/userModel");

async function SignInController(req, res) {
  const { username, email, password } = req.body


  try {


    let user = new userModel({
      username,
      email,
      password
    })

    await user.save();
    return res.status(201).json({
      message: "user created successfully",
      success: true,
      user,
    })


  } catch (error) {
    console.error("SignIn Error:", error); // Add this
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: error.message, // Optional: return the error message
    });
  }


}


function LoginController(req, res) {
  res.send("Log-in user route");
}



module.exports = { SignInController, LoginController }