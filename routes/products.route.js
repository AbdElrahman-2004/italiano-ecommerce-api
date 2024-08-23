const express = require("express");
const multer = require("multer");
const {
  getAllProducts,
  getSingleProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getProductImage,
} = require("../controllers/products.controller");
const validationSchema = require("../middlewares/validateSchema");
const appError = require("../utils/appError");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// const fileFilter = (req, file, cb) => {
//   const fileType = file.mimetype.split("/")[0];

//   if (fileType !== "image") {
//     const error = appError.create(
//       "This file is not supported to upload, please upload an image",
//       400,
//       FAIL
//     );
//     return cb(error, false);
//   }

//   cb(null, true);
// };
const storage = multer.diskStorage({});
const upload = multer({ storage });

router
  .route("/")
  .get(getAllProducts)
  .post(verifyToken, upload.single("images"), validationSchema(), addProduct);

router
  .route("/:productId")
  .get(getSingleProduct)
  .put(verifyToken, upload.array("images"), validationSchema(), editProduct)
  .delete(deleteProduct);

router.get("/images/:imageName", getProductImage);
module.exports = router;
