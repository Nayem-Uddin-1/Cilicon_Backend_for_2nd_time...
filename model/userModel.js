const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    maxlength: [20, "Username must be less than 20 characters"],
    minlength: [6, "Username must be more than 6 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    // match: [/\S+@\S+\.\S+/, "Email format is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    // maxlength: [20, "Password must be less than 20 characters"],
    minlength: [4, "Password must be more than 4 characters"],
  },
  profilePic: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
    maxlength: [15, "Phone number must be less than 15 characters"],
    minlength: [9, "Phone number must be more than 9 characters"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerify:{
    type:Boolean,
    default:false
  },
  otp:{
    type:String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
