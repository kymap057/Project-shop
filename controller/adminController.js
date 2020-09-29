const User = require('../models/user');

exports.loginAdmin = async (req,res,next)=>{
    try {
        let user = await User.findUser(req.body.email,req.body.password);
        if(!user){
            res.status(500).json({
                messenger: 'login fail...!'
            })   
        }
        req.session.user= {_id:user._id,name:user.email};
        // req.user= user;
        // res.status(200).json({
        //     messenger: 'login success..!!',
        //     data: user
        // });
        next();
    } catch (error) {
        req.session.user = false;
        res.status(500).json({
            messenger: 'Error...!',
            error: error
        });
    }
};
