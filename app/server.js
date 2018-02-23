'use strict'
const bodyParser = require('body-parser')
    , express = require('express')
    , app = express()
    , path = require('path')
    , photo = require(path.join(__dirname + '/../lib'))
    , publicDir = path.join(__dirname + '/public')

app.use(express.static(publicDir))

app.use(bodyParser.json())

app.get('/api/fetchFaceData/', (req, res) => {
    let imageUri = req.query.imageUri
    photo.getFace(imageUri)
        .then(faceData => res.json(faceData))
})

app.get('/api/fetchTextData/', (req, res) => {
    let imageUri = req.query.imageUri
    photo.getText(imageUri)
        .then(textData => res.json(textData))
})

app.get('/', (req, res) => {
    res.sendfile('index.html', {root: publicDir})
})

app.listen(3000, function () {
    if (process.env === 'production') {
        console.log('photoVision app is ∆ now deployed and operational')
    } else {
        console.log('photoVision app is running on port 3000')
    }
})

module.exports = app
