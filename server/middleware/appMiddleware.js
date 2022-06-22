const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

module.exports = (app) => {
  // body parser
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan("dev"));
};
