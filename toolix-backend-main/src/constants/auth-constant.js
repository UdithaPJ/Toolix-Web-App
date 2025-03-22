const AuthCodes = {
  ERR_TOKEN_EXPIRED: { code: 401, message: "Access Token Expired" },

  ERR_TOKEN_INVALID: { code: 401, message: "Access Token Invalid" },

  ERR_ACCESS_DENIED: { code: 401, message: "Access Denied" },

  ERR_TOKEN_NOT_PROVIDED: { code: 401, message: "Access Token Not Provided" },
};

module.exports = { AuthCodes };
