let cloudinary = require('cloudinary').v2;
let dotenv = require('dotenv');
dotenv.config();


cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});
console.log(process.env)

cloudinary.api.resources({ type: 'upload', prefix: 'classification_image_dataset/passport/', max_results: 1000 }, function(error, result){console.log('result',result)});




