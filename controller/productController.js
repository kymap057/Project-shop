const Products = require('../models/product');

exports.getAllProduct = async (req,res,next)=>{
    try {
        const products = await Products.find();
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
    const newProduct = new Products(req.body);
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
};
exports.deleteProduct = async (req,res,next)=>{
    try {
        let product = await Products.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                messenger: 'product not found...!',
                code: 404
            });
        }
        await product.remove();
        res.status(200).json({
            messenger:'delete product success...!',
            code: 200
        });
        console.log('delete a product...!');
    } catch (error) {
        res.status(500).json({
            messenger: error,
            code :500
        })
    }
};