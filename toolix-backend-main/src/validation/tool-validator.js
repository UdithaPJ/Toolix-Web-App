const Joi = require("joi");

const { VALIDATION_ERROR } = require("../../helper");

const toolCreateSchema = Joi.object({
  name: Joi.string().required("Tool name is required"),
  description: Joi.string().optional().allow(null, ""),
  quantity: Joi.number()
    .min(1, "Quantity is over than 1")
    .required("Quantity is required"),
});

const toolUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional().allow(null,""),
});

const toolCreate = async (req, res, next) => {
  try {
    await toolCreateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const toolUpdate = async (req, res, next) => {
  try {
    await toolUpdateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  toolCreate,
  toolUpdate,
};
