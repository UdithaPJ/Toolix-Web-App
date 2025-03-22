const dotenv = require("dotenv");
dotenv.config();

const ACCESS = {
  SECRET_KEY: process.env.SECRET_KEY,
};

const APPLICATION = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
};

const BODYPARSER = {
  JSON_PARSER: {
    limit: "50mb",
  },

  URLENCODED: {
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  },
};

module.exports = {
  APPLICATION,

  BODYPARSER,

  ACCESS,
};
