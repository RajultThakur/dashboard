const { Order, OrderStatus } = require('../models/order');
const Product = require('../models/product');
const { User, Role } = require('../models/user');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        // .populate(
        //     [
        //         {
        //             path: "orderItems.product",
        //             model: "Product",
        //             select: ["-author", "-category", "-seller"]
        //         }
        //     ]
        // )

        return res.status(201).json({
            success: true,
            data: orders
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params;
    try {
        await Order.findByIdAndUpdate({ _id: orderId }, { status: { $set: status } });

        return res.status(201).json({
            success: true,
            message: "status updated!"
        })
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }
}

module.exports = { getAllOrders, updateOrderStatus };