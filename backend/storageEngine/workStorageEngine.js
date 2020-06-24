const multer = require('multer')
const path = require('path')


const storageDir = path.join(__dirname, '..', 'storage/works')
// SET STORAGE ENGINE
let storage = multer.diskStorage({
  destination: storageDir,
  filename: function (req, file, cb) {
    cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname))
  }
});

// INIT UPLOAD
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('files');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  //check mimetype
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Only Images allowed");
  }
}
module.exports.upload = upload
module.exports.storageDir = storageDir