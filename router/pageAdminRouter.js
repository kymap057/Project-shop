const pageController = require('../controller/pageAdminController');
const adminController = require('../controller/adminController');
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    if(req.session.user){
       return res.send('oke login')
    }
    res.redirect('/login')
})
router.get('/login',pageController.getPageLogin);
router.post('/login',adminController.loginAdmin,pageController.postLogin);


module.exports = router;