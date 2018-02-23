'use strict'
const {wire} = HyperHTMLElement
const detections = [
    'joyLikelihood',
    'sorrowLikelihood',
    'angerLikelihood',
    'surpriseLikelihood',
    'blurredLikelihood',
    'headwearLikelihood'
]
const scale = [
    'VERY_UNLIKELY',  // It is very unlikely that the image belongs to the specified vertical.
    'UNLIKELY',       // It is unlikely that the image belongs to the specified vertical.
    'POSSIBLE',       // It is possible that the image belongs to the specified vertical.
    'LIKELY',         // It is likely that the image belongs to the specified vertical.
    'VERY_LIKELY',    // It is very likely that the image belongs to the specified vertical.
]

class ResultsDisplay extends HyperHTMLElement {
    static get observedAttributes() {
        return ['data', 'url']
    }

    created() {
        this.className = 'db cf center pa3 border-box ba bw4 b--light-green bg-washed-green'
    }

    attributeChangedCallback(attr) {
        if ('data' === attr) {
            this.render()
        }
    }

    render() {
        let previewStyle = `background:url(${this.url}) center;`
        let data = JSON.parse(this.data)
        if (data.detectionConfidence) {
            return this.html`
                <div id="image-preview" class="fl w-100 w-50-ns mw5 mw6-ns">
                    <div class="aspect-ratio aspect-ratio--1x1">
                        <div class="aspect-ratio--object cover" style="${previewStyle}"></div>
                    </div>
                </div>
                <div id="image-data" class="fr w-100 w-50-ns">
                    <h4>${(data.detectionConfidence * 100).toFixed(3)}% detection confidence</h4>
                    ${detections.map(aspect => wire()`
                              <div class="dib pa2">
                                <h1 class="f4 fw2 tracked mv0 lh-title">${aspect.slice(0, -10)}</h1>
                                <p class="lh-copy">${scale.indexOf(data[aspect]) + 1}</p>
                              </div>`
            )}
                    <p class="f7">Scale is 1 - 5, unlikely to very likely</p>
                </div>`
        } else if (data.textAnnotations) {
            return this.html`
                <div id="image-preview" class="fl w-100 w-50-ns mw5 mw6-ns">
                    <div class="aspect-ratio aspect-ratio--1x1">
                        <div class="aspect-ratio--object cover" style="${previewStyle}"></div>
                    </div>
                </div>
                <div id="image-data" class="fr w-100 w-50-ns">
                    <p class="lh-copy athelas">${data.fullTextAnnotation}</p>
                </div>`
        }
    }
}

ResultsDisplay.define('results-display')
