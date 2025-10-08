const express =require("express");

const router=express.Router();

 const authRoute =require("./auth")
 const categoryRoute =require("./category")
 const subcategoryRoute = require("./subCategory")
 const productRoute = require("./product")
 const cartRoute =require("./cart")



// localhost/4000/api/v1/auth

// routers
 router.use("/auth",authRoute)
 router.use("/category",categoryRoute)
 router.use("/subcategory",subcategoryRoute)
 router.use("/product",productRoute)
 router.use("/cart",cartRoute)





module.exports =router