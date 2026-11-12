const express = require('express')
const router = express.Router()

const { addProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct} = require('../controllers/productController.js')
const upload = require('../middlewares/multer')

router.post('/product', upload.single('productImage'), addProduct)

router.get('/allproducts', getAllProducts)

router.get('/product/:id', getOneProduct)

router.patch('/product/:id', upload.single('productImage'), updateProduct)

router.delete('/deleteproduct/:id', upload.single('productImage'), deleteProduct)

module.exports = router