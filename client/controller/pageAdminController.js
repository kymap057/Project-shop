const fetch = require('node-fetch');
const moment = require('moment');

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
module.exports.getProfile = (req,res,next)=>{
    let user = {
        fistName: req.user.fistName,
        lastName: req.user.lastName,
        birthday: moment(req.user.birthday).format('DD/MM/YYYY'),
        gender: (req.user.Gender)?'nam':'nữ',
        phone: req.user.phoneNumber,
        email: req.user.email,
        address: `${req.user.address.detail}, ${req.user.address.city}`
    }
    res.render('./admin/profile',{
        title: 'Profile',
        data: user
    })
}