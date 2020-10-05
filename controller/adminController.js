const Users = require('../models/managerShop');
const User = require('../models/managerShop');


exports.loginAdmin = async (req, res, next) => {
    try {
        let user = await User.findUser(req.body.email, req.body.password);
        if (!user) {
            return res.status(404).json({
                messenger: 'login fail...!',
                code: 404
            });
        }
        let token = await user.generateAuthToken();
        res.status(200).json({
            messenger: 'login success',
            code: 200,
            data: user.toJSON(),
            token: token
        });
        console.log(user.__v, user.role)
        next();
    } catch (error) {
        res.status(500).json({
            messenger: 'login fail DB ...!',
            code: 500
        });
    }
};
module.exports.logoutAdmin = async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await req.user.save();
        res.status(200).json({
            messenger: 'logout Success..!',
            code: 200
        })
    } catch (e) {
        res.status(500).json({
            messenger: 'logout fail..!',
            code: 500
        })
    }
};
module.exports.logoutAdminAllVersion = async (req, res, next) => {
    try {
        req.user.tokens = [];
        req.session.user = undefined;
        await req.user.save();
        res.status(200).json({
            messenger: 'logout Success..!',
            code: 200
        })
    } catch (error) {
        res.status(500).json({
            messenger: 'logout fail..!',
            code: 500
        })
    }
};
exports.createAdmin = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({
            messenger: "create user successful...",
            method: "POST",
            code: 201,
            data: newUser
        });
    } catch (e) {
        res.status(500).json({
            messenger: e,
            code: 500
        })
    }
};
exports.getAdminProfile = async (req, res, next) => {
    try {
        let user = await Users.findById(req.params.id);
        if (!user) {
            return res.status.json({
                messenger: 'user not found...!',
                code: 404
            });
        }
        res.status(200).json({
            messenger:'ok...!',
            code: 200,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            messenger: error,
            code:500
        })
    }
};
exports.updateInfAdmin = async (req, res, next) => {
    console.log('...')
};