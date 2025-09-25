
const express = require("express");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000

// localhost/4000
//   router setup
const router = require("./router");
const conectedDb = require("./config/db");
app.use(express.json())

app.use(router)

// Database Connection
conectedDb()


app.listen(PORT, () => {
  console.log("server is ready on Port no  " + PORT);

}) 