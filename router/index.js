const express =require("express");

const router=express.Router();

// require api file from api/index.js
const apiRoute = require("./api")

// localhost/4000/api/v1

  router.use("/api/v1" , apiRoute)




module.exports =router