const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    type: Object,
    required: true,
    brand: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    material: {
      type: String,
    },
    lenses: {
      type: String,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
