const fetch = require('node-fetch');
const moment = require('moment');
const { replaceOne } = require('../../models/product');

module.exports.getPageLogin = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/')
    }
    res.render('./admin/login', {
        title: 'Login',
        messenger: req.flash('ErrorLogin')
    })
}
module.exports.getHome = (req, res, next) => {
    res.render('./admin/home', {
        title: 'Home'
    })
}
module.exports.postLogin = async (req, res, next) => {
    let data = {
        email: req.body.email,
        password: req.body.password
    };
    let host = req.headers.host;
    let url = `${host}/admin/login`
    console.log(url)
    fetch(`http://${url}`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => { return response.json(); })
        .then(data => {
            if (data.code === 200) {
                req.session.user = {
                    data: {
                        id: data.data._id,
                        email: data.data.email,
                        version: data.data.__v
                    },
                    token: data.token
                }
                req.user = data.data;
                res.redirect('/')
            }
            else {
                console.log('login fail');
                req.flash('ErrorLogin', 'password or email wrong');
                res.redirect('/login');
            }
        })
        .catch(err => {
            console.log(err);
            req.flash('ErrorLogin', 'password or email wrong');
            res.redirect('/login');
        });
}
module.exports.getLogout = (req, res, next) => {
    let host = req.headers.host;
    let url = `http://${host}/admin/logout`
    console.log(url);
    fetch(url, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'authorization': req.token
        },
    })
        .then(() => {
            console.log('user logout');
            req.session.user = undefined;
            req.user = undefined;
            req.token = undefined;
            res.redirect('/login');
        })
        .catch(err => console.log(err));
}
module.exports.getProfile = (req, res, next) => {
    let id = req.user._id;
    let host = req.headers.host;
    let url = `http://${host}/admin/${id}`
    console.log(url);
    fetch(url, {
        method: 'GET',
        headers: {
            'content-Type': 'application/json',
            'authorization': req.token
        },
    })
        .then(response => { return response.json() })
        .then(data => {
            if(!data.code===200){
                return res.redirect('/');
            }
            let userData = data.data;
            let user = {
                fistName: userData.fistName,
                lastName: userData.lastName,
                birthday: moment(userData.birthday).format('DD/MM/YYYY'),
                gender: (userData.Gender) ? 'nam' : 'nữ',
                phone: userData.phoneNumber,
                email: userData.email,
                address: `${userData.address.detail}, ${userData.address.city}`
            };
            res.render('./admin/profile', {
                title: 'Profile',
                data: user
            });
        })
        .catch(() => res.redirect('/'));
}