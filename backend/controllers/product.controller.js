const Product = require('../models/product');
const { User, Role } = require('../models/user');

// this route should be protected only admin or a seller can list the product. 
const listProduct = async (req, res) => {
    const { title, description, img, price, stock, brand, category, status, rating, seller } = req.body;

    try {
        let valid = title || description || img || price || stock || brand || category || status || rating || seller;

        if (!valid) {
            return res.status(401).json({
                success: false,
                message: "all fields required"
            })
        }

        const _seller = await User.findById({ _id: seller });

        if (_seller.role == Role.USER) {
            return res.status(401).json({
                success: false,
                message: "only seller or admin can add products"
            })
        }

        const products = await Product.find({ title, img });

        if (products) {
            return res.status(401).json({
                success: false,
                message: "product is already listed with same title, and image"
            })
        }

        const newProduct = new Product({
            title,
            description,
            img,
            price,
            stock,
            brand,
            category,
            status,
            rating,
            seller
        })

        await newProduct.save();

        return res.status(201).json({
            success: true,
            product: products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const getProducts = async (req, res) => {
    let success = false;
    const { name, price, rating, category } = req.query;
    // category : this field is useful when yoy search by the tag name

    try {
        // firstly we are finding on the basses of category
        // secondly by searching
        // and lastly by just getting all product

        let query;
        if (category) {
            const _category = category.split(" ");
            query = Product.find({ category: { $in: _category } });
        } else if (name) {
            query = Product.find({ title: { $regex: name, $options: 'i' } });
        } else {
            query = Product.find();
        }

        //  price : we will pass price as a query in url and value should be either 1 or -1.
        //        1 for sort in low to high order
        //       -1 for sort in high to low

        //  rating : we will pass rating as a query element in url and it will only contain -1. To sort in higher to lower order 

        if (price || rating) {
            if (price && rating) {
                query = query.sort({ rating: rating, price: price });
            } else if (price) {
                query = query.sort({ price: price });
            } else {
                query = query.sort({ rating: rating });
            }
        }

        const products = await query.populate({
            path: "seller",
            model: "User",
            select: ["name", "email"]
        });

        success = true;

        return res.status(201).json({
            success,
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        return res.status(201).json({
            success: true,
            product: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

const addProduct = async (req, res) => {
    const { id, title, description, img, price, stock, brand } = req.body;

    let category = req.body.category

    try {
        const seller = req.userData;
        console.log(seller)
        if (typeof (category) === 'string') {
            console.log('yes')
            category = category.split(",")
        }
        console.log(category)

        let newProduct;

        if (id !== undefined) {
            newProduct = await Product.findByIdAndUpdate({ _id: id },
                {
                    $set: {
                        title,
                        description,
                        img,
                        price,
                        stock,
                        brand,
                        category
                    }
                }
            );

            return res.status(201).json({
                success: true,
                message: "updated",
                product: newProduct,
            })
        }
        console.log(req.body)
        newProduct = new Product({
            title,
            description,
            img,
            price,
            stock,
            brand,
            category,
            seller: seller._id
        })

        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "created",
            product: newProduct,
        })
    } catch (error) {
        console.log(error.message)
        return res.status(201).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }

}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        await Product.findByIdAndDelete({ _id: id })

        return res.status(201).json({
            success: true,
            message: "deleted"
        })
    } catch (error) {
        console.log(error.message);
        return res.status(201).json({
            success: true,
            message: "internal server error"
        })
    }
}

module.exports = { listProduct, getProducts, getProductById, addProduct, deleteProduct };