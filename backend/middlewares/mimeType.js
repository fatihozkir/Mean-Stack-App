const multer = require("multer");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let errorMessage = new Error("Invalid Mime Type!");
    if (isValid) {
      errorMessage = null;
    }
    callback(errorMessage, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    const fullFileName = `${name}-${Date.now()}.${extension}`;
    callback(null, fullFileName);
  },
});
module.exports = storage;
