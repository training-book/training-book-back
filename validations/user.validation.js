const Joi = require('joi');

const loginSchema = Joi.object({
    mail: Joi.string().email().trim().required(),
    pwd: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const signupSchema = Joi.object({ 
    userName:   Joi.string().regex(/^[^\s]{3,30}$/).required(),
    lastName : Joi.string().trim().required(),
    firstName :  Joi.string().trim().required(),
    mail :  Joi.string().email().required(),
    pwd :Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(), 
    sex :  Joi.string().max(1).trim().required(),
    birthday : Joi.date().required()

})
module.exports = { loginSchema, signupSchema };