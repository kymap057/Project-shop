const express = require('express');
const adminController = require('../controller/adminController');
const auth = require('../middleware/middleware');
const router = express.Router();

router.post('/login',adminController.loginAdmin);
router.post('/logout',auth,adminController.logoutAdmin);
 module.exports = router;