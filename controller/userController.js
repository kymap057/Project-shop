const Users = require('../models/managerShop');
const User = require('../models/user');

exports.getAllUser = async (req,res,next)=>{
    try {
        const users = await User.find();
        if(!users){
            return res.status(404).json({
                messenger: "not found ...",
                code:404
            });
        }
        res.status(200).json({
            messenger: "success...",
            code: 200,
            method: 'GET',
            data: users
        });
        next();
    } catch (error) {
        res.status(500).json({
            messenger: error,
            code :500
        });
    }
};
exports.createUser= async (req,res,next)=>{
     try {
         const newUser =  new User(req.body);
         await newUser.save();
         res.status(201).json({
             messenger: "create user successful...",
             method:"POST",
             code: 201,
             data:newUser
         });
     } catch (e) {
         res.status(500).json({
            messenger: e,
            code: 500
         })
     }
};
exports.deleteUser = async(req,res,next)=>{
    try {
        let user = await Users.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                messenger: 'user not found...!',
                code: 404
            });
        }
        await user.remove();
        res.status(200).json({
             messenger:'delete user success...!',
             code: 200
        });
        console.log('delete a user');
    } catch (error) {
        res.status(500).json({
            messenger: error,
            code: 500
        });
    }
};