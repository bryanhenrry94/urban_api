const Product = require('../models/Product.js');

const createProduct = async (req, res) => {
    try {
        const { body } = req;

        const product = new Product(body);
        await product.save();

        res.status(201).json({ status: 'ok', message: 'Product created successfully', data: product });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error creating product: ${err.message}`, data: null });
    }
};

const getProducts = async (_, res) => {
    try {
        const people = await Product.find();
        res.status(201).json({ status: 'ok', message: 'People found successfully', data: people });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding people: ${err.message}`, data: null });
    }
};

const getProduct = async (req, res) => {
    try {
        const { _id } = req.params;

        const product = await Product.findById({ _id });
        res.status(201).json({ status: 'ok', message: 'Product found successfully', data: product });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error finding product: ${err.message}`, data: null });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { _id } = req.params;
        const { body } = req;

        const product = await Product.findByIdAndUpdate(_id, body, { new: true });

        res.status(200).json({ status: 'ok', message: 'Product updated successfully', data: product });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error updating product: ${err.message}`, data: null });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { _id } = req.params;

        await Product.findByIdAndDelete(_id);

        res.status(200).json({ status: 'ok', message: 'Product deleted successfully', data: null });
    } catch (err) {
        res.status(400).json({ status: 'error', message: `Error deleting product: ${err.message}`, data: null });
    }
};

module.exports = { createProduct, getProducts, getProduct, updateProduct, deleteProduct };