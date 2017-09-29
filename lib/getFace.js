// Google Vision API docs: https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate
const request = require('superagent')
const googleVisionKey = process.env.GOOGLE_VISION_DEV
const visionUrl = `https://vision.googleapis.com/v1/images:annotate?key=${googleVisionKey}`
const buildImage = require('../helpers/buildImage.js')
const buildReq = require('../helpers/buildReq.js')

// accepts image uri
// makes https request to GV
// returns a promise of face annotation data
function getFaceAnnotation(uri) {
    let requests = buildReq(buildImage(uri), 'FACE_DETECTION')
    return new Promise((resolve, reject) => {
        request
            .post(visionUrl)
            .send(requests)
            .end((err, res) => {
                if (err) return reject('could not getFaceAnnotation', err)
                let ret = res.body.responses[0].faceAnnotations
                resolve(ret)
            })
    })
}

module.exports = getFaceAnnotation
