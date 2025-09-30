const mongoose = require("mongoose");



const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    image:{
       type:String,
       required:true
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
   
  },
  { timestamps: true }
);

 
module.exports = mongoose.model("Category",categorySchema)