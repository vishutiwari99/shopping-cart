const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchemas = new mongoose.Schema({
    product_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    pic: {
        type: Object,
        required: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    }
})

const Product = mongoose.model('product', productSchemas);

module.exports = Product