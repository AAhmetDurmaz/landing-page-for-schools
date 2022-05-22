const multer = require('multer');
const date = new Date().getTime();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        
        cb(null, date + file.originalname);
    },
})
const upload = multer({
    storage: storage,
})

exports.upload = upload