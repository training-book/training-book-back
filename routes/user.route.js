const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/authenticate', userController.authenticate);
router.get('/confirm/:token', userController.validateMail)
 
module.exports = router;