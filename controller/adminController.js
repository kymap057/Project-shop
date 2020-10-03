const User = require('../models/user');

exports.loginAdmin = async (req,res,next)=>{
    try {
        let user = await User.findUser(req.body.email,req.body.password);
        if(!user){
            console.log('sai mk')
            return res.redirect('/login');
        }
        let token = await user.generateAuthToken();
        req.session.user = {
            data:{
                id: user._id,
                email: user.email,
                version: user.__v
            },
            token: token
        }
        console.log(user.__v, user.role)
        next();
    } catch (error) {
        
        res.redirect('/login');
        console.log('lỗi')
    }
};
module.exports.logoutAdmin = async (req,res,next)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();
        req.session.user= undefined;
        console.log(req.session.user)
        if(!req.session.user){
            res.redirect('/login');
        }
    } catch (e) {
        res.redirect('/login');
    }
}
module.exports.logoutAdminAllVersion = async (req,res,next)=>{
    try {
        req.user.tokens =[];
        req.session.user = undefined;
        await req.user.save();
        res.redirect('/login');
    } catch (error) {
        res.send(error);
    }
}
