// Success code creator
const resSuccess = (data, htCode, cc = null) => {
  return {
    httpCode: htCode,
    type: "SUCCESS",
    code: cc?.code ? cc.code : htCode,
    message: cc?.message ? cc.message : "ok",
    success: true,
    data: data,
  };
};

// Error code creator
const resError = (err, type, htCode) => {
  return {
    httpCode: htCode,
    type: type,
    code: htCode,
    ...err,
    success: false,
  };
};

const mongoError = (e) => {
  let message;
  switch (e.code) {
    case 11000:
      const dupKey = Object.keys(e.keyPattern||{})?.[0] || 'Some value'
      message = `'${dupKey}' you have entered is already exists.`
      break;
    default:
      message = "Unable to persist data on Database."
      break;
  }
  return { message };
};

const CUSTOM_CODE = {
  _200: (data, cc = null) => ({ ...resSuccess(data, 200, cc) }),

  _201: (data, cc = null) => ({ ...resSuccess(data, 201, cc) }),

  _400: (e) => ({
    ...resError(e ? e : "bad request", "BAD_REQUEST", 400),
  }),

  _401: (e) => ({
    ...resError(e ? e : "unauthorized", "UNAUTHORIZED", 401),
  }),

  _404: (e) => ({
    ...resError(e ? e : "not found", "NOT_FOUND", 404),
  }),

  _500: (e) => ({
    ...resError(e ? e : "server error", "INTERNAL_SERVER_ERROR", 500),
  }),

  _mongo: (e) => ({
    ...resError(mongoError(e), "DB_ERROR", 500),
  }),
};

module.exports = {
  CUSTOM_CODE,
};
