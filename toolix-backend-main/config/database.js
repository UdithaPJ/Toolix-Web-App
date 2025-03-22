const mongoose = require("mongoose");

const { APPLICATION } = require("./config");

const DB_URL = APPLICATION.DB_URL;

const connection = mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MONGO CONNECTION ERROR!!");
    console.log(err);
  });

module.exports = connection;
