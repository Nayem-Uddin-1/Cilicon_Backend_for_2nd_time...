const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        //===VARIAND ROUTER CREATED INTO PRODUCT ROUTER=====

        color: {
            type: String,
            required: [true, "Color is required"],
            enum: ["red", "blue", "green", "black", "white", "yellow"],
        },

        size: {
            type: String,
            required: [true, "Size is required"],
            enum: ["XS", "S", "M", "L", "XL", "XXL"],
        },

        stock: {
            type: Number,
            required: [true, "Stock quantity is required"],
            min: [0, "Stock cannot be negative"],
        },

        image: 
            {
                type: String,
                required: true,
            },
        


    },
    { timestamps: true }
);

module.exports = mongoose.model("Variant", variantSchema);
