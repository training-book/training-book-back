const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();


router.post('/changePassword', userController.changePassword);

 
module.exports = router;