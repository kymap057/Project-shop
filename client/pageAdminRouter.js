const pageController = require('./pageAdminController');
const {authClient} = require('../middleware/middleware');
const express = require('express');
const router = express.Router();

router.get('/',authClient,pageController.getHome)
router.get('/home',authClient,pageController.getHome);
router.get('/login',pageController.getPageLogin);
router.post('/login',pageController.postLogin);
router.get('/logout',authClient,pageController.getLogout);
//router.get('/logoutAll',auth,adminController.logoutAdminAllVersion);
module.exports = router;