const express = require('express');
const adminController = require('../controller/adminController');
const {authAdmin} = require('../middleware/middleware');
const router = express.Router();

router.get('/:id',authAdmin,adminController.getAdminProfile);
router.post('/login',adminController.loginAdmin);
router.post('/logout',authAdmin,adminController.logoutAdmin);
router.post('/create',adminController.createAdmin);
 router.patch('/update',adminController.updateInfAdmin);

module.exports = router;