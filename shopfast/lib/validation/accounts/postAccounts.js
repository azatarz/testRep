'use strict';

const Joi = require('joi');

module.exports = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).regex(/.*[0-9].*/).regex(/.*[a-zA-Z].*/).required(),
    name: Joi.object().keys({
      first: Joi.string().regex(/^[a-zA-Z -]+$/).required(),
      last: Joi.string().regex(/^[a-zA-Z-]+$/).required()
    }).required()
  }
};
