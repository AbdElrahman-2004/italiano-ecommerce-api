const cloudinary = require("cloudinary").v2;
const process = require("process");

cloudinary.config({
  cloud_name: "dlzlvlsvt",
  api_key: "846924366384599",
  api_secret: "nbcUsO39xICc531GE5sXSquH2Ck",
});

const uploadToCloudinary = async (path, folder) => {
  return cloudinary.uploader
    .upload(path, {
      folder,
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const removeFormCloudinary = async (public_id) => {
  await cloudinary.uploader.destroy(public_id, (err, result) => {
    console.log(err, result);
  });
};

module.exports = {
  uploadToCloudinary,
  removeFormCloudinary,
};
