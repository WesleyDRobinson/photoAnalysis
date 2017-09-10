const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const getFaceAnnotation = require(path.join(__dirname) + '/..' + '/lib/index.js');
const publicDir = path.join(__dirname + '/public');

app.use(express.static(publicDir));
app.use(bodyParser.json());

app.get('/api/fetchFaceData/', function (req, res) {
  console.log('fetching data')
  getFaceAnnotation(req.query.imageUri)
    .then(faceData => res.json(faceData));
});

app.get('/', function (req, res) {
  res.sendfile('index.html', {root: publicDir});
});

app.listen(3000, function () {
  console.log('photoVision app is running on port 3000')
})
