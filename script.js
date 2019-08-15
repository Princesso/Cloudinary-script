const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const express = require('express');
const fs = require("fs");

dotenv.config();

const app = express();

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

const writeFile = async (data) => {
  fs.writeFile("yellow_fever_cards.csv", data, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
}

app.get('/', async (req, res)=> {
  let passports = await cloudinary.api.resources({ type: 'upload', prefix: 'classification_image_dataset/passport/', max_results: 1000 }, function(error, result){console.log('result',result)});
  let visa = await cloudinary.api.resources({ type: 'upload', prefix: 'classification_image_dataset/visa/', max_results: 1000 }, function(error, result){console.log('result',result)});
  let yellowcards = await cloudinary.api.resources({ type: 'upload', prefix: 'classification_image_dataset/yellow_fever_card/', max_results: 1000 }, function(error, result){console.log('result',result)});
  let passportUrls = passports.resources || []
  let visaUrls = visa.resources || []
  let yellowFeverUrls = yellowcards.resources || []

  let urlList = await passportUrls.map((purl) => purl.url+',passport');

  let visaList = await visaUrls.map((purl) => purl.url)
  let yellowList = await yellowFeverUrls.map((purl) => purl.url)
  const csv = yellowList.join("\n");
  await writeFile(csv)
  console.log("======================>",csv);
  // res.send(passportUrls)
})

app.listen(3000, ()=>{
  console.log('listening at port 3000')
})




