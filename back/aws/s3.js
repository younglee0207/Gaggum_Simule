// const fs = require("fs");
// const AWS = require("aws-sdk");
// const dotenv = require("dotenv");
// const config = require("../config");

// dotenv.config();

// const s3 = new AWS.S3({
//   accessKeyId: config.awsKey.accessKey,
//   secretAccessKey: config.awsKey.secretAccessKey,
// });

// const uploadFile = () => {
//   const params = {
//     Bucket: "ssafybucket",
//     Key: "image/" + "imageTest",
//     Body: fs.readFileSync("pot.jpg"),
//     ContentType: "image/png",
//   };

//   s3.upload(params, function (err, data) {
//     if (err) {
//       throw err;
//     }
//     console.log(`File uploaded successfully. ${data}`);
//   });
// };

// module.exports = {
//   uploadFile,
// };
