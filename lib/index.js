// Google Vision API docs: https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate

const fs = require('fs');
const path = require('path');
const request = require('superagent');

const googleVisionKey = process.env.GOOGLE_VISION_DEV;
const url = `https://vision.googleapis.com/v1/images:annotate?key=${googleVisionKey}`;

const buildReq = require('./helpers/buildReq.js');


// accepts image url or base64 encoded image data
// base64-encoded image string @ image.content
// URL @ image.source.imageUri
// returns Google Vision API image object: https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate#Image
function image(input = 'https://cldup.com/dUCZknZnZC-3000x3000.png') {
  if (input.slice(0, 4) !== 'http') return 'image func only accepts web urls of images';

  return {
    source: {
      imageUri: input
    }
  };
}

// accepts Google Vision API requests object
// makes http request to GV
// returns a promise of face annotation data
function getFaceAnnotation(requests) {
  return new Promise((resolve, reject) => {
    request
      .post(url)
      .send(requests)
      .end((err, res) => {
        if (err) return reject('could not getFaceAnnotation', err);

        let ret = res.body.responses[0].faceAnnotations;
        resolve(ret);
      });
  });
}

let imgObj = image();
let req = buildReq(imgObj);
getFaceAnnotation(req).then(val => console.log(val));
