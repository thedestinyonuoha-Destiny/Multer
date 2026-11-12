const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('only Image Allowed'))
    }
}

const limits = {
    filesize: 1024 * 1024 * 10
}

const upload = multer ({
    storage,
    fileFilter,
    limits
})
module.exports = upload;