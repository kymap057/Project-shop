const jwt = require('jsonwebtoken'),
    Admin = require('../models/managerShop');
require('dotenv').config({ path: '../.env' });

const authClient = async (req, res, next) => {
    try {
        if (req.session.user) {
            let token = req.session.user.token;
            let key = process.env.KEY_JWT;
            let decode = jwt.verify(token, key);
            const user = await Admin.findOne({ _id: decode._id, 'tokens.token': token });
            if (!user) {
                req.session.uer = undefined;
                return res.redirect('/login');
            }
            req.token = token;
            req.user = user;
            next();
        }
        else{
            res.redirect('/login');
        }
    } catch (e) {
        console.log('middleware authentication error')
        req.user = undefined;
        req.session = undefined;
        res.redirect('/login');
    }
}
const authAdmin = async (req, res, next) => {
    try {
        // console.log(req.headers)
        let token = req.headers.authorization;
        // console.log(token)
        let key = process.env.KEY_JWT;
        let decode = jwt.verify(token, key);
        const user = await Admin.findOne({ _id: decode._id, 'tokens.token': token });
        if (!user) {
            res.status(404).json({
                messenger: 'not found user..!',
                code: 404
            })
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(500).json({
            messenger: 'authentication fail...!',
            code: 500
        })
    }
}
module.exports = {
    authClient: authClient,
    authAdmin: authAdmin
};
