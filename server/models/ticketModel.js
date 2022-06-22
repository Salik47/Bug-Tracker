const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: "String",
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    description: {
      type: "String",
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 1024,
    },
    assignedDeveloper: {
      type: ObjectId,
      ref: "userModel",
      required: true,
    },
    submitter: {
      type: ObjectId,
      ref: "userModel",
      required: true,
    },
    project: {
      type: ObjectId,
      ref: "projectModel",
      required: true,
    },
    priority: {
      type: String,
      enum: {
        values: ["LOW", "MEDIUM", "HIGH"],
        message: "Please choose only from the LOW, MEDIUM, HIGH",
      },
      default: "LOW",
      required: [true, "priority of the ticket has to be set"],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["OPEN", "IN_PROGRESS", "CLOSED"],
        message: "Please choose only from the OPEN, IN_PROGRESS, CLOSED",
      },
      default: "CLOSED",
      required: [true, "status of the ticket has to be set"],
      trim: true,
    },
    type: {
      type: String,
      enum: {
        values: ["bugs/errors", "feature request", "document request"],
        message:
          "Please choose only from the bugs/errors, feature request, document request",
      },
      default: "CLOSED",
      required: [true, "status of the ticket has to be set"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = Ticket = mongoose.model("Ticket", ticketSchema);
