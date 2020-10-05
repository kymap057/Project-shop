const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
 
router.get('/',userController.getAllUser);
router.post('/',userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;