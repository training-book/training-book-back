const Joi = require('joi');
const pwdRegex = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,30}$');


const loginSchema = Joi.object({
    mail: Joi.string().email().trim().required(),
    password: Joi.string().pattern(pwdRegex).required(),
});


const signupSchema = Joi.object({ 
    userName:   Joi.string().regex(/^[^\s]{3,30}$/).required(),
    lastName : Joi.string().trim().required(),
    firstName :  Joi.string().trim().required(),
    mail :  Joi.string().email().required(),
    password :Joi.string().pattern(pwdRegex).required(), 
    sex :  Joi.string().max(1).trim().required(),
    birthday : Joi.date().required()
});

const changePasswordSchema = Joi.object({
    lastPassword : Joi.string().pattern(pwdRegex).required(),
    newPassword : Joi.string().pattern(pwdRegex).required()
});

module.exports = { 
    loginSchema, 
    signupSchema,
    changePasswordSchema
};