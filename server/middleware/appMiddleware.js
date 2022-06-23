const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require('cors');

module.exports = (app) => {
  // body parser
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(cors())
};
