let getFaceAnnotations = require('../lib/index.js');
let photoPath = '../content/serious.png';

getFaceAnnotations(photoPath)
  .then(val => console.log(val));
