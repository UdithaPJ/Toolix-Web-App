const { CUSTOM_CODE } = require("./statusCode");
const { MongoServerError } = require("mongodb");

const TE = (err) => {
  throw err;
};

const SUCCESS = (res, codeObj, data) => {
  const { code } = codeObj;

  let response = CUSTOM_CODE._200(data);

  if (code) {
    response = CUSTOM_CODE[`_${code}`](data, codeObj);
  }

  res.status(response.httpCode).json(response);

  return response;
};

const ERROR = (res, err) => {
  try {
    if (err instanceof MongoServerError) {
      const response = CUSTOM_CODE._mongo(err);
      return res.status(response.httpCode).json(response);
    }
    return res.status(err.code || 500).json(err);
  } catch (catchErr) {
    console.log("****", catchErr);

    const response = CUSTOM_CODE._400(err);

    return res.status(response.httpCode).json(response);
  }
};

const VALIDATION_ERROR = (res, err) => {
  try {
    const error =
      err?.details?.[0]?.message ||
      err.message ||
      "Request failed with validation errors. Please check input fields and try again";
    return res.status(400).json({ code: 400, message: error });
  } catch (catchErr) {
    console.log("****", catchErr);

    const response = CUSTOM_CODE._400(err);

    return res.status(response.httpCode).json(response);
  }
};

module.exports = {
  TE,
  SUCCESS,
  ERROR,
  VALIDATION_ERROR,
};
