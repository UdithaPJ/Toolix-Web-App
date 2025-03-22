const Joi = require("joi");

const { VALIDATION_ERROR } = require("../../helper");

const Constants = require("../constants/borrow-constant");

const { REQUESTED, ...updateAllowedStatuses } = Constants.Status;

const borrowCreateSchema = Joi.object({
  toolId: Joi.string().required("Tool id is required"),
  dueDate: Joi.date().min(new Date()).required("Due date is required"),
});

const borrowUpdateSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(updateAllowedStatuses))
    .required(),
  dueDate: Joi.alternatives().conditional("status", {
    is: updateAllowedStatuses.APPROVED,
    then: Joi.date().min(new Date()).required(),
    otherwise: Joi.disallow(),
  }),
});

const borrowGetScheme = Joi.object({
  tool: Joi.string().optional(),
  student: Joi.string().optional(),
  status: Joi.string()
    .valid(...Object.values(Constants.Status))
    .optional(),
  approvedBy: Joi.string().optional(),
  rejectedBy: Joi.string().optional(),
  collectedBy: Joi.string().optional(),
});

const borrowGetByInstructorScheme = Joi.object({
  instructorId: Joi.string().required(),
});

const borrowCreate = async (req, res, next) => {
  try {
    await borrowCreateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const borrowUpdate = async (req, res, next) => {
  try {
    await borrowUpdateSchema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const borrowGetList = async (req, res, next) => {
  try {
    await borrowGetScheme.validateAsync(req.query);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

const borrowGetListByInstructorId = async (req, res, next) => {
  try {
    await borrowGetByInstructorScheme.validateAsync(req.query);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  borrowCreate,
  borrowUpdate,
  borrowGetList,
  borrowGetListByInstructorId,
};
