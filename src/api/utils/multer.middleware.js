const multer = require('multer');
const { validateId } = require('./validations');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/')
    },
    filename: function (req, file, cb) {

        let filename;
        const recipeId = req.params.id;

        if (validateId(recipeId)) {
            filename = recipeId;
        } else {
            filename = "invalid";
        }

        cb(null, `${filename}.jpeg`)
    }
});

const upload = multer({ storage });

const uploadImage = upload.single('image');

module.exports = { uploadImage }