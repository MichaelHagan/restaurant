const cloudinary = require('cloudinary').v2;

cloudinary.config({
cloud_name: process.env.CLOUDINARY_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
})

cloudinary.api.create_upload_preset ({
    name: 'test_preset',
    tags: 'testing, new, tests',
    folder: "Tests"
}).then(uploadResult => console.log(uploadResult) )
    .catch(error => console.error(error));
    

module.exports = { cloudinary };