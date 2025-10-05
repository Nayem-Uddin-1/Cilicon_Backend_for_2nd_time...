const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
         },
  
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        subcategory:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategory"
        },
              price: {
            type: Number,
             min: [0, "Price cannot be negative"],
        },

        thumbnail: {
            type: String, // Store file path or URL
       
        }, 

    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
