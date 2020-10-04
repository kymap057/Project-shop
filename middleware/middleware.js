const jwt = require('jsonwebtoken'),
    User = require('../models/user');
    require('dotenv').config({ path: '../.env' });

const auth = async (req, res, next) => {
    try {
        let token = req.session.user.token;
        let key = process.env.KEY_JWT;
        let decode = jwt.verify(token, key);
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
        if (!user) {
            req.session.uer = undefined;
            return res.redirect('/login');
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        req.session.uer = undefined;
        res.redirect('/login');
    }
}

module.exports = auth;
