const pageController = require('./pageAdminController');
const adminController = require('../controller/adminController');
const auth = require('../middleware/middleware');
const express = require('express');
const router = express.Router();

router.get('/',auth,pageController.getHome)
router.get('/home',auth,pageController.getHome);
router.get('/login',pageController.getPageLogin);
router.post('/login',adminController.loginAdmin,pageController.postLogin);
router.get('/logout',auth,adminController.logoutAdmin)
router.get('/logoutAll',auth,adminController.logoutAdminAllVersion);
module.exports = router;