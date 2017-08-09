'use strict';

const Joi = require('joi');

module.exports = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).regex(/.*[0-9].*/).regex(/.*[a-zA-Z].*/).required()
  }
};
