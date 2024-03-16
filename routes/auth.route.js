const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();


router.post('/signup', authController.signup);
router.post('/authenticate', authController.authenticate);
router.get('/confirm/:token', authController.validateMail);

 
module.exports = router;