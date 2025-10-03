const multer = require('multer')
const path = require("path");


//========store-images=========
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {

        // get extention
        const extensionName = file.mimetype.split("/")

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + "." + extensionName[extensionName.length - 1])

        console.log("line 14 ",);

    }
})
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|jfif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only! (jpeg, jpg, png, gif)');
    }
}
const upload = multer({
    storage: storage, fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})
//========store-images=========


module.exports = upload