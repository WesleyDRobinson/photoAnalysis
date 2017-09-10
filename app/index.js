const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const faceLib = path.join(__dirname) + '/lib';
const getFaceAnnotation = require(faceLib);
const publicDir = path.join(__dirname + '/public');
app.use(express.static(publicDir));

app.use(bodyParser.json());

app.get('/api/fetchFaceData/', function (req, res) {
  console.log('fetching data')
  let imageUri = req.query.imageUri;
  getFaceAnnotation(imageUri)
    .then(faceData => res.json(faceData));
});

app.get('/', function (req, res) {
  res.sendfile('index.html', {root: publicDir});
});

app.listen(3000, function () {
  console.log('photoVision app is running on port 3000')
})

module.exports = app;
