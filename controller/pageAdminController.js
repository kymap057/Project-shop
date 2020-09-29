const User = require('../models/user');

module.exports.getPageLogin = (req,res,next)=>{
    res.render('./admin/login',{
        title: 'Login'
    })
}
module.exports.postLogin = async(req,res,next)=>{
    console.log(req.session);
    res.redirect('/');
}