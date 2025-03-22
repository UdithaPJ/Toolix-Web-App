const mongoose = require("mongoose");

const connection = require("../../config/database");

const Constants = require("../constants/borrow-constant");

const Schema = mongoose.Schema;

mongoose.connection = connection;

const borrowSchema = new Schema(
  {
    tool: { type: Schema.ObjectId, ref: "tool" },

    requestedDate: { type: Date },

    dueDate: { type: Date },

    approvedDate: { type: Date },

    rejectedDate: { type: Date },

    collectedDate: { type: Date },

    student: { type: Schema.ObjectId, ref: "user" },

    approvedBy: { type: Schema.ObjectId, ref: "user" },

    rejectedBy: { type: Schema.ObjectId, ref: "user" },

    collectedBy: { type: Schema.ObjectId, ref: "user" },

    status: {
      type: String,
      required: true,
      default: Constants.Status.REQUESTED,
      enum: Object.values(Constants.Status),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("borrow", borrowSchema);
