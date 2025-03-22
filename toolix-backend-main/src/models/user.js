//const mongoose = require('mongoose');
const mongoose = require("mongoose");

const connection = require("../../config/database");

const Constants = require("../constants/user-constant");

const Schema = mongoose.Schema;

mongoose.connection = connection;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: Object.values(Constants.Role),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
