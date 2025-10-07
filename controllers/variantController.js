const { default: slugify } = require("slugify")
const productModel = require("../model/productModel")
const variantModel = require("../model/variantModel")
const fs = require("fs")
const path = require("path")



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
        // ==========taking sku name from product name=============
        const baseSku = slugify(updateProduct.name.slice(0, 3), {
            replacement: '-',
            lower: true,
        })

        // ==========generate dynamic sku==========
        const colorPart = color ? `-${slugify(color, { lower: true })}` : "";
        const sizePart = size ? `-${slugify(size, { lower: true })}` : "";
        const sku = `${baseSku}${colorPart}${sizePart}-${Math.round(Math.random() * 10)}`;


        // ==========UPDATE VARIANT MODEL==========
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

async function deleteVariantController(req, res) {

  const { id } = req.params;

  const variant = await variantModel.findOneAndDelete({ _id: id })


  try {
    if (!variant) {
      return res.status(404).json({
        success: false,
        messege: "variant not found"
      })
    } else {

      if (variant.image) {
        const oldpath = path.join(__dirname, "../uploads")
        const fullimagepath = variant.image.split("/")
        const imagepath = fullimagepath[fullimagepath.length - 1]

        
        fs.unlink(`${oldpath}/${imagepath}`, async (error) => {

          if (error) {
            return res.status(500).json({
              success: false,
              message: error.message || "something is wrong"
            });
          }
          else {

            const productUpdate =await productModel.findOneAndUpdate(
              { _id: variant.product },
              { $pull: { variant: variant._id } },
              { new: true }
            )
            

            return res.status(200).json({
              success: true,
              message: "variant deleted successfully"
            });
          }
        })

      }
      else {
 const productUpdate = productModel.findOneAndUpdate(
              { _id: variant.product },
              { $pull: { variant: variant._id } },
              { new: true }
            )
            productUpdate.save()
        
        return res.status(200).json({
          success: true,

          message: "variant deleted successfully"
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
}



module.exports = { addVariantController, deleteVariantController }