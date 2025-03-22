const mongoose = require("mongoose");

const connection = require("../../config/database");

const Schema = mongoose.Schema;

mongoose.connection = connection;

const toolSchema = new Schema(
  {
    name: { type: String, required: true },

    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
      enum: [true, false],
    },

    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
      enum: [true, false],
    },

    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tool", toolSchema);
