const jwt = require('jsonwebtoken'),
    User = require('../models/user');
    require('dotenv').config({ path: '../.env' });

const auth = async (req, res, next) => {
    try {
        let token = req.session.user.token;
        console.log(token)
        let key = process.env.KEY_JWT;
        console.log(key)
        let decode = jwt.verify(token, key);
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token });
        if (!user) {
            throw new Error('....?');
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.redirect('/login');
    }
}

module.exports = auth;
