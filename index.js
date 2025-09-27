
const express = require("express");
const app = express();
require('dotenv').config()
const session = require('express-session')

const PORT = process.env.PORT || 3000

//   router setup
const router = require("./router");
const conectedDb = require("./config/db");
app.use(express.json())



// Database Connection
conectedDb()

// express session
app.use(session({
  secret: process.env.secreetsession,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))



app.use(router)


// localhost/4000
app.listen(PORT, () => {
  console.log("server is ready on Port no  " + PORT);

}) 

 
 