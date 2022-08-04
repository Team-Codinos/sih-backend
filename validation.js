//VALIDATION
const Joi = require("joi");

const registerValidation =(body) =>{
    const registerschema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
      });

    const validate=registerschema.validate(body);
    return validate;
};

const loginValidation =(body) =>{
    const loginschema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
      });

    const validate=loginschema.validate(body);
    return validate;
};

module.exports.loginValidation=loginValidation;
module.exports.registerValidation=registerValidation;

