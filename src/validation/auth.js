import Joi from 'joi';

import { emailRegexp } from '../constants/contacts.js';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});