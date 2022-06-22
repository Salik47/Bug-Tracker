const { NotFound } = require('./customErrors');

module.exports = (req, res, next) => next(new NotFound());
