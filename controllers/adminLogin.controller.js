const asyncWrapper = require("../middlewares/asyncWrapper");
const bcrypt = require("bcryptjs");
const appError = require("../utils/appError");
const { ERROR } = require("../utils/httpStatus");
const generateJWT = require("../utils/generateJWT");

module.exports = asyncWrapper(async (req, res, next) => {
  const { password } = req.body;
  const hashedPassword = process.env.ADMIN_PASSWORD;

  const result = await bcrypt.compare(password, hashedPassword);

  if (!result) {
    const error = appError.create("Password is not correct", 401, ERROR);
    return next(error);
  } else {
    const token = generateJWT({});
    res.status(200).json({ token });
  }
});
