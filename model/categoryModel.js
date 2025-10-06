const mongoose = require("mongoose");



const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    subcategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory"
      }
    ],
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ]


  },
  { timestamps: true }
);


module.exports = mongoose.model("Category", categorySchema)