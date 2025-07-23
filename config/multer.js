const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const destination = file.mimetype.includes("audio")
      ? `uploads/audio-files/${req.body.email}`
      : `uploads/profile-images/${req.body.email}`;
    fs.mkdirSync(destination, {
      recursive: true,
    });
    cb(null, destination);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
