const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const getFaceAnnotation = require('../../lib');
const publicDir = path.join(__dirname + '/../public');

app.use(express.static(publicDir));
app.use(bodyParser.json());


app.get('/api/fetchFaceData/', function (req, res) {
  console.log('fetching data')
  getFaceAnnotation(req.query.imageUri)
    .then(faceData => res.json(faceData));
});

app.get('/', function (req, res) {
  res.sendFile(`${publicDir}/index.html`)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
