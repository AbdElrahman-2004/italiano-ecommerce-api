const { body, checkBody } = require("express-validator");

const validationSchema = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title must be not Empty")
      .isString()
      .withMessage("Title must be String"),
    body("description").isString().withMessage("Description must be String"),
    body("details").isObject().withMessage("Details must be Object"),
    body("price")
      .notEmpty()
      .withMessage("Price must be not Empty")
      .isNumeric()
      .withMessage("Price must be Number"),
  ];
};

module.exports = validationSchema;
