const express = require('express')
const {listProduct, getProducts, getProductById, addProduct, deleteProduct} = require("../controllers/product.controller");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/list", listProduct);
router.post("/addProduct", addProduct)
router.delete("/delete/:id", deleteProduct)

module.exports = router;