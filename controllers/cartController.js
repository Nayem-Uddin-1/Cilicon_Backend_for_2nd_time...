const cartModel = require("../model/cartModel")


async function addToCartController(req, res) {

    const { variant, quantity, user, product } = req.body

    try {
        const addToCart = new cartModel({
            variant,
            quantity,
            user,
            product
        })

        await addToCart.save()

        return res.status(200).json({
            success: true,
            message: "cart added successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


async function getCartByUserIdController(req, res) {
    const { id } = req.params


    try {
        
        const getCartByUserID= await cartModel.find({user:id})
        
        return res.status(200).json({
            success: true,
            message: "cart fetch successfully",
            data:getCartByUserID
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}



module.exports = { addToCartController, getCartByUserIdController }