const express =require("express");

const router=express.Router();

// require api file from api/index.js
const apiRoute = require("./api")

// localhost/4000/api/v1

  router.use("/api/v1" , apiRoute)

  router.use((req,res)=>{
    res.status(404).json({success:false , message:"page not found"})
  })




module.exports =router