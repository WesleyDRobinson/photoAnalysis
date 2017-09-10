// accepts image url or (todo -- base64 encoded image data)
// base64-encoded image string @ image.content
// URL @ image.source.imageUri
// returns promise for a Google Vision API image object: https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate#Image
function buildImage(imageUri) {
  return {
    source: {
      imageUri
    }
  };
}

module.exports = buildImage;
