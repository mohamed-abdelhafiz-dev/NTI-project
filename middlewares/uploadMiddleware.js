const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = '';
    
    const userFolder = `user_${req.user._id}`;
    const basePath = path.join(__dirname, '../uploads');
    
    if (file.fieldname === 'profilePic') {
      folder = path.join(basePath, 'profiles', userFolder);
    } else if (file.fieldname === 'audio') {
      folder = path.join(basePath, 'audio', userFolder);
    } else if (file.fieldname === 'cover') {
      folder = path.join(basePath, 'covers', userFolder);
    }
    
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = {
    profilePic: ['image/jpeg', 'image/png'],
    cover: ['image/jpeg', 'image/png'],
    audio: ['audio/mpeg', 'audio/mp4', 'audio/x-m4a']
  };
  
  if (allowed[file.fieldname] && allowed[file.fieldname].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for ${file.fieldname}`), false);
  }
};

const uploadProfilePic = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
}).single('profilePic');

const uploadAudioFiles = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 50 * 1024 * 1024,
    files: 2 
  }
}).fields([
  { name: 'audio', maxCount: 1 },
  { name: 'cover', maxCount: 1 }
]);

module.exports = {
  uploadProfilePic,
  uploadAudioFiles
};