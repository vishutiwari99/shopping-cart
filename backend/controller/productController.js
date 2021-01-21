const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const {
            product_id,
            title,
            price,
            description,
            countInStock,
            images,
            category,
        } = req.body;
        if (!images)
            return res.status(400).json({
                msg: "No image upload",
            });

        const product = await Product.findOne({
            product_id,
        });
        if (product)
            return res.status(400).json({
                msg: "This product already exists.",
            });

        const newProduct = new Product({
            product_id,
            title: title.toLowerCase(),
            price,
            description,
            countInStock,
            images,
            category,
        });

        await newProduct.save();
        res.json({
            msg: "Created a product",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: err.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({
            msg: "Deleted a Product",
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const {
            product_id,
            title,
            price,
            description,
            countInStock,
            images,
            category,
        } = req.body;
        if (!images)
            return res.status(400).json({
                msg: "No image upload",
            });

        await Product.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            {
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                countInStock,
                images,
                category,
            }
        );

        res.json({
            msg: "Updated a Product",
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message,
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
};
