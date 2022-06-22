const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { ObjectId } = require("mongoose");
const { BCRYPT_WORK_FACTOR, DUMMY_HASH } = require("../config/bcryptConfig");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      minlength: "3",
      maxlength: "64",
      required: true,
      trim: true,
    },
    email: {
      type: "String",
      minlength: "5",
      maxlength: "128",
      required: true,
      trim: true,
    },
    password: {
      type: "String",
      minlength: 8,
      maxlength: 1024,
      required: true,
      trim: false,
    },
    role: {
      type: String,
      enum: {
        values: ["ADMIN", "DEVELOPER", "PROJECT_MANAGER", "DEFAULT"],
        message:
          "Please choose only from the ADMIN, DEVELOPER, PROJECT_MANAGER, DEFAULT",
      },
      default: "DEFAULT",
      required: [true, "Role is required"],
      trim: true,
    },
    assignedProject: {
      type: ObjectId,
      ref: "projectModel",
      required: false,
    },
    assignedTickets: [],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, BCRYPT_WORK_FACTOR);
  }
  next();
});

userSchema.statics.comparePassword = function (plainTextPwd, hashedPwd) {
  return bcrypt.compare(plainTextPwd, hashedPwd || DUMMY_HASH);
};

module.exports = User = mongoose.model("User", userSchema);
