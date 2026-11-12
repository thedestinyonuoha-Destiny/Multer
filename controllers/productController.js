const { Product } = require('../models');
const fs = require('fs')

const addProduct = async(req, res) => {
    try {
        const { productName, price, stock } = req.body
        const file = req.file.path;

        const product = await Product.create({
            productName,
            price,
            stock,
            productImage: file
        });

        res.status(201).json({
            message: 'Product Added Successfully',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

            res.status(200).json({
                message: `The total number of products is ${products.length}`,
                data: products
            })       

    } catch (error) {
        res.status(500).json({
            messgae: error.message
        })
    } 
}


const getOneProduct = async (req,res) => {
    try {
        const id = req.params.id;
        const  oneProduct = await Product.findByPk(id);

        if (!oneProduct) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        res.status(200).json({
            message: 'Product found successfully',
            data: oneProduct
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
       const id = req.params.id;
       const { productName, stock, price } = req.body;
       
       const product = await Product.findByPk(id);

       if (!product) {
        return res.status(404).json({
            message: 'Product not found'
        })
       }

       const data = {
        price,
        productName,
        stock
       }

       if (req.file) {
        const oldFilePath = product.productImage
        fs.unlinkSync(oldFilePath),
        data.productImage = req.file.path
       }

       await product.update(data)

       res.status(200).json({
        message: 'Product Updated successfully',
        data: product
       })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteProduct = async(req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        const oldFilePath = product.productImage;
        fs.unlinkSync(oldFilePath)

        await product.destroy({where: {id}})

        res.status(200).json({
            message: 'Product deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {
    addProduct,
    getOneProduct,
    updateProduct,
    getAllProducts,
    deleteProduct
}