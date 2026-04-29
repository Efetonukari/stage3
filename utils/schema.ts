import * as Joi from 'joi';

export const userLoginSchema = Joi.object({
    status: Joi.string().required(),
    status_code: Joi.number().valid(200).required(),
    message: Joi.string().required(),
    data: Joi.object({
        access_token: Joi.string().required(),
        access_token_expires_in: Joi.string().required(),
        notification_token: Joi.string().optional().allow(''),
        user: Joi.object().required().unknown(true)
    }).required()
});

export const errorSchema = Joi.object({
    code: Joi.number().required(),
    message: Joi.string().required(),
    name: Joi.string().required(),
    status: Joi.number().required()
}).unknown(true);