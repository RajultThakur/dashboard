const express = require('express')
const { getAllOrders, updateOrderStatus} = require('../controllers/order.controller');
const router = express.Router();

router.get("/", getAllOrders);
router.post("/:orderId/update", updateOrderStatus);

module.exports = router;