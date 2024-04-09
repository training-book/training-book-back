const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();


router.put('/changePassword', userController.changePassword);

 
module.exports = router;