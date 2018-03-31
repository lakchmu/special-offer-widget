const AWS = require('aws-sdk');
const fs = require('fs');
const mime = require('mime');
const config = require('../aws-upload.conf.js');

function upload(prefix, s3obj) {
  fs.readdirSync(`${config.source}/${prefix}`).forEach((filename) => {
    if (fs.lstatSync(`${config.source}/${prefix}${filename}`).isDirectory()) {
      upload(`${filename}/`);
    } else {
      const params = {
        Body: fs.createReadStream(`${config.source}/${prefix}${filename}`),
        Key: prefix + filename,
        ContentType: mime.getType(`${config.source}/${prefix}${filename}`),
      };

      if (prefix === 'images/' || prefix === 'styles/') {
        params.CacheControl = 'max-age=604800';
      }

      s3obj
        .upload(params)
        .on('httpUploadProgress', evt => console.log(evt)) // eslint-disable-line no-console
        .send((err, data) => console.log(err, data)); // eslint-disable-line no-console
    }
  });
}

const s3obj = new AWS.S3({ params: { Bucket: config.bucketName } });
upload('', s3obj);

// s3obj.listObjects({
//   Bucket: config.bucketName,
// }, (err, data) => {
//   if (data.Contents.length === 0) {
//     upload('');
//   } else {
//     s3obj.deleteObjects({
//       Bucket: config.bucketName,
//       Delete: {
//         Objects: data.Contents.map((el) => {
//           return { Key: el.Key };
//         }),
//       },
//     }, (error) => {
//       if (error == null) {
//         upload('');
//       }
//     });
//   }
// });
