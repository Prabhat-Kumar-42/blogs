const multer = require("multer");
const path = require("path");
const fs = require("fs");

const dynamicDestination = (req, file, cb) => {
  let destination = "uploads/";
  const user = req.user;

  if (user) {
    destination += user._id + "/";
  }

  fs.mkdir(destination, { recursive: true }, (err) => {
    if (err) return cb(err);
    cb(null, destination);
  });
};

const dynamicFilename = (req, file, cb) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  cb(null, uniqueSuffix + path.extname(file.originalname));
};

const storage = multer.diskStorage({
  destination: dynamicDestination,
  filename: dynamicFilename,
});

const multerUpload = multer({ storage: storage });

module.exports = {
  multerUpload,
};
