// Google Vision API docs: https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate
const request = require('superagent')
const googleVisionKey = process.env.GOOGLE_VISION_DEV
const visionUrl = `https://vision.googleapis.com/v1/images:annotate?key=${googleVisionKey}`
const buildImage = require('../helpers/buildImage.js')
const buildReq = require('../helpers/buildReq.js')

// accepts image uri
// makes https request to GV
// returns a promise of text data
function getText(uri) {
    let requests = buildReq(buildImage(uri), 'TEXT_DETECTION')
    return new Promise((resolve, reject) => {
        request
            .post(visionUrl)
            .send(requests)
            .end((err, res) => {
                if (err) return reject('could not get text', err)
                let ret = res.body.responses
                resolve(ret)
            })
    })
}

module.exports = getText
