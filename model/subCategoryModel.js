

const mongoose = require('mongoose');


const subSchema = new mongoose.Schema({

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
    description: {
        type: String,
        default: "",
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]





}, { timestamps: true });


module.exports = mongoose.model("Subcategory", subSchema)