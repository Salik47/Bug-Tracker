const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: "String",
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 64,
    },
    projectManager: {
      type: ObjectId,
      ref: "userModel",
      required: false,
    },
    developers: [],
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
    admin: {
      type: ObjectId,
      ref: "userModel",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Project = mongoose.model("Project", projectSchema);
