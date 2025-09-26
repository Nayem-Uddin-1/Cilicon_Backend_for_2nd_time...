const nodemailer = require("nodemailer");
const AUTH_EMAIL = process.env.AUTH_EMAIL
const AUTH_PASS = process.env.AUTH_PASS

async function sendMail(email,otp) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: AUTH_EMAIL,
            pass: AUTH_PASS,
        },
    });
   
        const info = await transporter.sendMail({
            from: AUTH_EMAIL,
            to: email,
            subject: "Email Verification Cdoe",
            text: "Hello world?", // plain‑text body
            html: `<b> Your email verification code is ${otp} </b>`, // HTML body
        });     
        
          


}



  module.exports = sendMail