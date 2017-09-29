const request = require('superagent')
const faceFetchButton = document.getElementById('image-button-face')
const textFetchButton = document.getElementById('image-button-text')

faceFetchButton.addEventListener('click', faceButtonHandler)
textFetchButton.addEventListener('click', textButtonHandler)

function textButtonHandler(e) {
    e.preventDefault()

    // grab submission
    let imageUriSubmission = document.getElementById('image-uri').value

    // check for image
    if ((typeof imageUriSubmission !== 'string') || (imageUriSubmission.slice(0, 4) !== 'http')) {
        return alert('must enter a web uri (beginning with `http` of an image')
    }

    // add image preview and loading notice
    let imagePreview = document.getElementById('image-preview')
    imagePreview.innerHTML = `<img src="${imageUriSubmission}" class="db" alt="submitted image preview">`
    let faceDataOutput = document.getElementById('image-data')
    faceDataOutput.innerHTML = `<p>fetching data!</p>`

    fetchData(imageUriSubmission)

    function fetchData(imageUri) {
        request
            .get('/api/fetchTextData/')
            .query({imageUri})
            .end((err, annotations) => {
                if (err) return console.error('could not fetch textData', err)

                data = annotations.body[0]

                // todo -- disentangle from fetchData
                faceDataOutput.innerHTML = data.fullTextAnnotation ? `<p>${data.fullTextAnnotation.text}</p>` : `<p>no text detected 😶😢</p>`
            })
    }
}

function faceButtonHandler(e) {
    e.preventDefault()
    let imageUriSubmission = document.getElementById('image-uri').value
    if ((typeof imageUriSubmission !== 'string') || (imageUriSubmission.slice(0, 4) !== 'http')) {
        return alert('must enter a web uri (beginning with `http` of an image')
    }

    // add image preview and loading notice
    let imagePreview = document.getElementById('image-preview')
    imagePreview.innerHTML = `<img src="${imageUriSubmission}" class="db" alt="submitted image preview">`
    let faceDataOutput = document.getElementById('image-data')
    faceDataOutput.innerHTML = `<p>fetching data!</p>`

    fetchData(imageUriSubmission)

    function fetchData(imageUri) {
        // make requests
        request
            .get('/api/fetchFaceData/')
            .query({imageUri})
            .end((err, annotations) => {
                if (err) return console.error('could not fetch faceData', err)
                if (annotations.body === null) return faceDataOutput.innerHTML = `<p>no faces detected 😶😢</p>`

                data = annotations.body[0]

                // todo -- disentangle from fetchData
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
                    <h1 class="f6 f5-ns fw6 lh-title black mv0">Sorrow:</h1>
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
}
