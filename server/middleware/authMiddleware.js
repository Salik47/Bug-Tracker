const { isLoggedIn } = require("../services/authService");
const { Unauthorized } = require("../errors/customErrors");

const guest = (req, res, next) => {
  if (isLoggedIn(req)) {
    next(new Unauthorized());
  }
  next();
};

const auth = (req, res, next) => {
  if (!isLoggedIn(req)) {
    return next(new Unauthorized());
  }
  next();
};

const authAdmin = (req, res, next) => {
  if (!isLoggedIn(req) || req.user.role !== "ADMIN") {
    return next(new Unauthorized());
  }
  next();
};

const authDeveloper = (req, res, next) => {
  if (!isLoggedIn(req) || req.user.role !== "DEVELOPER") {
    return next(new Unauthorized());
  }
  next();
};

const authProjectManager = (req, res, next) => {
  if (!isLoggedIn(req) || req.user.role !== "PROJECT_MANAGER") {
    return next(new Unauthorized());
  }
  next();
};

module.exports = { guest, auth, authAdmin, authDeveloper, authProjectManager };
