const { default: mongoose } = require("mongoose");


const conectedDb  = async() =>{   
   const DB_URL=process.env.MONGO_DB_URL
   mongoose.connect(DB_URL)

    console.log("mongodb Connected");
    
 }



 module.exports = conectedDb