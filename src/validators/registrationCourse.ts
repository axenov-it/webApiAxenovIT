import { Joi } from "express-validation";

export default {
  body: Joi.object({
    course: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string(),
    message: Joi.string(),
  }),
};
