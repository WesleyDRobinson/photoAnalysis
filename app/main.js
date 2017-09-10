const request = require('superagent');
const submit = document.getElementById('image-submit');

submit.addEventListener('click', function (e) {
  e.preventDefault();

  let imageUriSubmission = document.getElementById('image-uri').value;
  if ((typeof imageUriSubmission !== 'string') || (imageUriSubmission.slice(0, 4) !== 'http')) {
    return alert('must enter a web uri (beginning with `http` of an image');
  }

  // grab output container
  let faceDataOutput = document.getElementById('face-data-output');
  // add loading info
  faceDataOutput.innerText = 'fetching data!';

  fetchData(imageUriSubmission);

  // for testing use content/response.json
  // use for production
  function fetchData(imageUri) {
    // make requests
    request
      .get('/api/fetchFaceData/')
      .query({ imageUri: imageUri})
      .end(function (err, annotations) {
        if (err) return console.error('could not fetch faceData', err);

        // append data to output container
        data = annotations.body[0]
        console.log(data)
        faceDataOutput.innerHTML = `
    <pre class="code">
          "detectionConfidence": ${data.detectionConfidence},
          "joyLikelihood": "${data.joyLikelihood}",
          "sorrowLikelihood": "${data.sorrowLikelihood}",
          "angerLikelihood": "${data.angerLikelihood}",
          "surpriseLikelihood": "${data.surpriseLikelihood}",
          "blurredLikelihood": "${data.blurredLikelihood}",
          "headwearLikelihood": "${data.headwearLikelihood}"
    </pre>
`
      })
  }

});
