const express =require("express");

const router=express.Router();

 const authRoute =require("./auth")
// localhost/4000/api/v1/auth
 router.use("/auth",authRoute)





module.exports =router