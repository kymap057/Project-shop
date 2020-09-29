const Products = require('../models/product');
const Product = require('../models/product');

exports.getAllProduct = async (req,res,next)=>{
    try {
        const products = await Product.find();
        if(!products){
            return res.status(404).json({
                 messenger: 'Not found',
                 method: 'GET',
                 code: 404
             });
        }
        res.status(200).json({
            messenger: "successful...",
            method: 'GET',
            code: 200,
            data: products
        });
        next();
    } catch (error) {
        res.status(500).json({
            messenger:error,
            code: 500
        });
    }
};
exports.createProduct= async (req,res,next)=>{
    const newProduct = new Product(req.body);
    try {
        await newProduct.save();
        res.status(201).json({
            messenger:'successful...',
            method: 'POST',
            code:201,
            data: newProduct
        })
    } catch (err) {
        res.status(500).json({
            messenger: err,
            code: 500
        })
    }
}