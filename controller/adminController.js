const User = require('../models/user');

exports.loginAdmin = async (req,res,next)=>{
    try {
        let user = await User.findUser(req.email,req.password);
        if(!user){
            res.status(500).json({
                massager: 'login fail...!'
            })   
        }
        
    } catch (error) {
        
    }
};