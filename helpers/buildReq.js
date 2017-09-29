// function to build Google Vision API request object

// accepts a GV image object: https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate#Image
// returns a GV request object for 'FACE_DETECTION'
const acceptedDetections = ['FACE_DETECTION', 'TEXT_DETECTION']

function buildReq(image, type) {
    let err = new Error('could not build requests object')

    if (image && (image.source || image.content) && acceptedDetections.includes(type)) {
        return {
            requests: [{
                image: image,
                features: [{
                    type,
                    maxResults: 1
                }]
            }]
        }
    } else {
        return err
    }
}

module.exports = buildReq
