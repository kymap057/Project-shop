const pageController = require('./pageAdminController');
const adminController = require('../controller/adminController');
const auth = require('../middleware/middleware');
const express = require('express');
const router = express.Router();

router.get('/',auth,pageController.getHome)
router.get('/home',auth,pageController.getHome);
router.get('/login',pageController.getPageLogin);
router.post('/login',pageController.postLogin);
router.get('/logout',auth,pageController)
router.get('/logoutAll',auth,adminController.logoutAdminAllVersion);
module.exports = router;