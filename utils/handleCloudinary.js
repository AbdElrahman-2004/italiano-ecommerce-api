const cloudinary = require("cloudinary").v2;
const process = require("process");

cloudinary.config({
  cloud_name: "dlzlvlsvt",
  api_key: "846924366384599",
  api_secret: "nbcUsO39xICc531GE5sXSquH2Ck",
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
