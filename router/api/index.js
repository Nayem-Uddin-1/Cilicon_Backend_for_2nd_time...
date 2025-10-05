const express =require("express");

const router=express.Router();

 const authRoute =require("./auth")
 const categoryRoute =require("./category")
 const subcategoryRoute = require("./subCategory")
// localhost/4000/api/v1/auth
 router.use("/auth",authRoute)
 router.use("/category",categoryRoute)
 router.use("/subcategory",subcategoryRoute)





module.exports =router