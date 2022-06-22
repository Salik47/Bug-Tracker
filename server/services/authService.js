const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config/keys");
const { AUTH_MAX_AGE_IN_SECONDS } = require("../config/authConfig");

const login = (req, res, user) => {
  const { _id, name, role } = user;

  const token = jwt.sign({ userId: _id, name, role }, JWT_PRIVATE_KEY, {
    expiresIn: AUTH_MAX_AGE_IN_SECONDS,
  });

  res.cookie("http_jwt", token, {
    httpOnly: true,
    maxAge: AUTH_MAX_AGE_IN_SECONDS * 1000,
    sameSite: true,
  });

  res.cookie("jwt", token, {
    maxAge: AUTH_MAX_AGE_IN_SECONDS * 1000,
    sameSite: true,
  });
};

const logout = (req, res) => {
  res.cookie("http_jwt", "", { httpOnly: true, maxAge: 1, sameSite: true });
  res.cookie("jwt", "", { maxAge: 1, sameSite: true });
};

const isLoggedIn = (req) => {
  const token = req.cookies.http_jwt;

  try {
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    req.user = decoded;
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { login, logout, isLoggedIn };
