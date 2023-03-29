const fs = require("fs");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const config = require("../config");

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: config.awsKey.accessKey,
  secretAccessKey: config.awsKey.secretAccessKey,
});

const uploadFile = (name, base64) => {
    //const base64Data = new Buffer.from(imgfile.re)
    const base64Data = new Buffer.from(base64.replace("", ""), 'base64');
    const type = base64.split(';')[0].split('/')[1];
    const params = {
    Bucket: "ssafybucket",
    Key: "image/" + name,
    Body: base64Data,
    ContentType: `image/${type}`,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data}`);
  });
};

module.exports = {
  uploadFile,
};
