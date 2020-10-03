const express = require('express');
const adminController = require('../controller/adminController');
const auth = require('../middleware/middleware');
const router = express.Router();

router.post('/login',adminController.loginAdmin);
 module.exports = router;