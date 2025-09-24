const express = require("express");

const router = express.Router();

// localhost:/4000/api/v1/auth/signup

// user signup authentication
router.post("/signup", (req, res) => {
    res.send("sing-up user")
})





module.exports = router