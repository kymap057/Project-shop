const express = require('express');
const adminController = require('../controller/adminController');
const {authAdmin} = require('../middleware/middleware');
const router = express.Router();

router.post('/login',adminController.loginAdmin);
router.post('/logout',authAdmin,adminController.logoutAdmin);
router.post('/create',adminController.createAdmin);
 module.exports = router;