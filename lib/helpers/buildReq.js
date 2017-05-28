// function to build Google Vision API request object

// accepts a GV image object: https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate#Image
// returns a GV request object
function buildReq(image) {
  if (image && (image.source || image.content)) {
    return {
      requests: [{
        image: image,
        features: [{
          type: "FACE_DETECTION",
          maxResults: 1
        }]
      }]
    }
  } else {
    return new Error('could not build requests object')
  }
}

module.exports = buildReq;
