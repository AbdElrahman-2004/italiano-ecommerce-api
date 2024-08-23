const asyncWrapper = require("../middlewares/asyncWrapper");
const Product = require("../models/product.model");
const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatus");
const appError = require("../utils/appError");
const { validationResult } = require("express-validator");
const path = require("path");
const { uploadToCloudinary } = require("../storage/storage");

const getAllProducts = asyncWrapper(async (req, res, next) => {
  const query = req.query;
  const page = query.page || 1;
  const limit = query.limit || 16;
  const skip = (page - 1) * limit;

  const numberOfProducts = await Product.countDocuments({});
  const totalPages = Math.ceil(numberOfProducts / limit);

  const products = await Product.find({}, { __v: false })
    .limit(limit)
    .skip(skip);

  res.status(200).json({
    status: SUCCESS,
    data: { products, totalPages },
  });
});

const getSingleProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId, { __v: false });

  if (!product) {
    const error = appError.create("Product doesn't exist", 404, FAIL);
    return next(error);
  }

  res.status(200).json({
    status: SUCCESS,
    data: product,
  });
});

const addProduct = asyncWrapper(async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = appError.create(result.array(), 400, FAIL);
    return next(error);
  }
  // const files = req.files.map((file) => file.filename);
  console.log(req.file);
  const data = await uploadToCloudinary(req.file.path, "product-images");
  console.log("data", data);

  const newProduct = await new Product({ ...req.body, images: data.url });
  newProduct.save();

  res.status(201).json({
    status: SUCCESS,
    data: {
      products: newProduct,
    },
  });
});

const editProduct = asyncWrapper(async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = appError.create(result.array(), 400, FAIL);
    return next(error);
  }

  const productId = req.params.productId;
  const editedProduct = await Product.findByIdAndUpdate(
    productId,
    { $set: req.body },
    { new: true, select: { __v: false } }
  );

  if (!editedProduct) {
    const error = appError.create("Product doesn't exist", 404, FAIL);
    return next(error);
  }

  res.status(200).json({
    status: SUCCESS,
    data: { products: editedProduct },
  });
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
  const productId = req.params.productId;
  const result = await Product.deleteOne({ _id: productId });

  if (result.deletedCount === 0) {
    const error = appError.create("This product doesn't exist", 404, ERROR);
    return next(error);
  }
  res.status(200).json({
    status: SUCCESS,
    data: null,
  });
});

const getProductImage = asyncWrapper(async (req, res, next) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "..", "uploads", imageName);
  res.sendFile(imagePath);
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getProductImage,
};

exports.config = {
  api: {
    bodyParser: false,
  },
};
