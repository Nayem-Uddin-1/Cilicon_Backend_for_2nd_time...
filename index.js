
  const express = require("express");
  const app = express();
  require('dotenv').config()
  const PORT = process.env.PORT || 3000 

  // localhost/4000
  //   router setup
  const router =require("./router")
  app.use("/", router)

  app.listen(PORT,()=>{
    console.log("server is ready on Port no  " + PORT);
    
  }) 