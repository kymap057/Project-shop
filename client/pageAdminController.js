const { response } = require('express');
const fetch = require('node-fetch');



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
    if (req.session.user) {
        return res.render('./admin/home', {
            title: 'Home'
        })
    }
    res.redirect('/login')
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
    console.log(url)
    let data = {
        token: req.token
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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