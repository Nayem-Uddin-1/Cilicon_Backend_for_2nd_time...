const { default: slugify } = require("slugify")
const productModel = require("../model/productModel")
const variantModel = require("../model/variantModel")



async function addVariantController(req, res) {

    try {

        const { product, color, size, stock } = req.body



        const variant = new variantModel({
            product,
            color,
            size,
            stock,
            image: req.file && process.env.URL_PORT + "/" + req.file.filename
        })

        await variant.save()

        // ====When we update any data it's dosen't need any demo.save() to save ======
        // ====================only we need to add await before model name =============
        //  ==========example await productModel.findOneAndUpdate===============
        const updateProduct = await productModel.findOneAndUpdate(
            { _id: product },
            { $push: { variant: variant._id } },
            { new: true }
        )

        const baseSku = slugify(updateProduct.name.slice(0, 3),{
            replacement: '-',
            lower: true,
        })
        const colorPart = color ? `-${slugify(color, { lower: true })}` : "";
        const sizePart = size ? `-${slugify(size, { lower: true })}` : "";
        const sku = `${baseSku}${colorPart}${sizePart}-${Math.round(Math.random() * 10)}`;


        await variantModel.findOneAndUpdate(
            { _id: variant._id },
            { $set: { sku } },
            { new: true }
        );




        // =================succes message==============/
        return res.status(200).json({
            success: true,
            message: "variant added successfully",
            data: variant,
        })

    } catch (error) {
        return res.status(500).json({
            error,
            success: false,
            message: error.message || "variant not added"
        })
    }

}




module.exports = { addVariantController }