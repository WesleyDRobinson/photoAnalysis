// accepts image url or base64 encoded image data
// base64-encoded image string @ image.content
// URL @ image.source.imageUri
// returns promise for a Google Vision API image object: https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate#Image
function buildImage(imageUri = 'https://cldup.com/dUCZknZnZC-3000x3000.png') {
  if (imageUri.slice(0, 4) !== 'http') return 'image func only accepts web uris of images';
  return {
    source: {
      imageUri
    }
  };
}

module.exports = buildImage;
