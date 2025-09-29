
const express = require("express");
const app = express();
require('dotenv').config()
const session = require('express-session')
const MongoStore = require('connect-mongo');


const PORT = process.env.PORT || 3000

//   router setup
const router = require("./router");
const conectedDb = require("./config/db");
const adminMiddelware = require("./middelware/adminMiddelware");
app.use(express.json())

// Database Connection
conectedDb()

// express session
app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URL }),

  secret: process.env.secreetsession,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge:24*60* 60 * 1000 },
  name:"ecom_02"
}))

app.get("/test",adminMiddelware,(req,res)=>{

  res.send(req.session.user)


})

app.use(router)


// localhost/4000
app.listen(PORT, () => {
  console.log("server is ready on Port no  " + PORT);

})


