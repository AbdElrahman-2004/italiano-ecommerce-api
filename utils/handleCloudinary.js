require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadToCloudinary = async (files, folder) => {
  let imagesData = [];
  for (file of files) {
    await cloudinary.uploader
      .upload(file, {
        folder,
      })
      .then((data) => {
        imagesData.push({ url: data.url, imgId: data.public_id });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return imagesData;
};

const removeFormCloudinary = async (imagesData) => {
  for (imgData of imagesData) {
    await cloudinary.uploader.destroy(imgData.imgId, (err, result) => {
      console.log(err, result);
    });
  }
};

module.exports = {
  uploadToCloudinary,
  removeFormCloudinary,
};
