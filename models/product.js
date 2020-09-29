const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    trademark: {
        type: String,
        required: true,
        default: "none"
    },
    dayAdd: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
    },
    details: {
        madeIn: {
            type: String,
            trim: true
        },
        color: {// màu của mặt
            type: String
        },
        quality: {// chất lượng tính bằng sao
            type: String
        },
        function: {
            type: String,
            required: true
        },
        machine: {
            type: String
        },
        size:{
            type:String
        },
        description:{
            type:String
        }
    },
    img: [{
        path: {
            type: String,
            require: true
        }
    }],
}, {
    timestamps: true
});

const Products = mongoose.model('Product-shop', ProductSchema);
module.exports = Products;