const request = require('superagent');
const button = document.getElementById('image-button');

button.addEventListener('click', function (e) {
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
      .query({imageUri: imageUri})
      .end(function (err, annotations) {
        if (err) return console.error('could not fetch faceData', err);

        // face preview
        let facePreview = document.getElementById('face-preview');
        facePreview.innerHTML = `<img src="${imageUri}" class="db" alt="submitted face preview, halle berry">`
        // append data to output container
        data = annotations.body[0];

        faceDataOutput.innerHTML = `
            <main class="mw6 center">
              <article>
                  <div class="dtc v-top pl2">
                    <h1 class="f6 f5-ns fw6 lh-title black mv0">Detection Confidence:</h1>
                    <h2 class="f6 fw4 mt2 mb2 black-60">${parseFloat(data.detectionConfidence) * 100.00}%</h2>
                  </div>
                </article>
              <article>
                  <div class="dtc v-top pl2">
                    <h1 class="f6 f5-ns fw6 lh-title black mv0">Joy:</h1>
                    <h2 class="f6 fw4 mt2 mb2 black-60">${data.joyLikelihood}</h2>
                  </div>
              </article>
              <article>
                  <div class="dtc v-top pl2">
                    <h1 class="f6 f5-ns fw6 lh-title black mv0">Sorry:</h1>
                    <h2 class="f6 fw4 mt2 mb2 black-60">${data.sorrowLikelihood}</h2>
                  </div>
              </article>
              <article>
                  <div class="dtc v-top pl2">
                    <h1 class="f6 f5-ns fw6 lh-title black mv0">Anger:</h1>
                    <h2 class="f6 fw4 mt2 mb2 black-60">${data.angerLikelihood}</h2>
                  </div>
              </article>
              <article>
                  <div class="dtc v-top pl2">
                    <h1 class="f6 f5-ns fw6 lh-title black mv0">Surprise:</h1>
                    <h2 class="f6 fw4 mt2 mb2 black-60">${data.surpriseLikelihood}</h2>
                  </div>
              </article>
              <article>
                  <div class="dtc v-top pl2">
                    <h1 class="f6 f5-ns fw6 lh-title black mv0">Blurry Image:</h1>
                    <h2 class="f6 fw4 mt2 mb2 black-60">${data.blurredLikelihood}</h2>
                  </div>
              </article>
              <article>
                  <div class="dtc v-top pl2">
                    <h1 class="f6 f5-ns fw6 lh-title black mv0">Headwear:</h1>
                    <h2 class="f6 fw4 mt2 mb2 black-60">${data.headwearLikelihood}</h2>
                  </div>
              </article>           
            </main>`

      })
  }

});
