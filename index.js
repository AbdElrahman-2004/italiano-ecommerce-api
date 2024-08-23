const express = require("express");
const productRouter = require("./routes/products.route");
const adminLoginRouter = require("./routes/adminLogin.route");
require("dotenv").config();
const mongoose = require("mongoose");
const { ERROR } = require("./utils/httpStatus");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/products", productRouter);
app.use("/images", express.static("uploads"));
app.use("/admin-login", adminLoginRouter);

const port = process.env.PORT;
const url = process.env.MONGO_DB_URI;

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB Server Started");
  })
  .catch((err) => console.log(err));

app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: ERROR,
    message: "This resourse is not found",
    code: 404,
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || ERROR,
    message: err.message || "Something went wrong !",
    code: err.statusCode || 500,
    data: null,
  });
});

app.listen(port, () => {
  console.log("Listening On Port 3000");
});
