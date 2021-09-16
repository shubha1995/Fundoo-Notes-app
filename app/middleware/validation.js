const Joi = require('joi');
const jwt = require('jsonwebtoken');

const authUserRegister  = Joi.object({
    firstName: Joi.string().required().pattern(new RegExp('^[A-Z]{1}[a-z]{2,}')),
    lastName: Joi.string().required().pattern(new RegExp('^[A-Z]{1}[a-z]{2,}')),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required()
});

const authUserLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

module.exports = {authUserRegister, authUserLogin};