'use strict'
import request from 'superagent'
import ResultsDisplay from './results-display'

const {bind, wire} = HyperHTMLElement

class AppShell extends HyperHTMLElement {
    created() {
        this.className = 'db h-100 border-box ba bw5 b--light-blue bg-lightest-blue avenir tc'
        this.render()
    }

    render() {
        return this.html`
            <h1 class="pa3 mv0 fw5 lh-title dark-blue">Welcome to Photo Analysis</h1>
            <h2 class="pa3 mv0 fw4 blue">where you can retrieve facial sentiment data or optical character recognition from an image</h2>
              
            <label class="clip" for="image-uri">Image URI</label>
            <input class="db center lh-copy w-80 bn pa2 black-60 tc"
                   placeholder="hot-link to image URL (ends in .png, .jpg, etc.)" 
                   type="text"
                   name="image-uri"
                   id="image-uri">
            <!--todo -- implement file upload in library-->
            <!--<div class="mt3">-->
                <!--<label for="image-file" class="db mb2">or upload an image file</label>-->
                <!--<input class="pl4"-->
                       <!--type="file"-->
                       <!--accept="image/*"-->
                       <!--value="upload a file" -->
                       <!--id ="image-file">-->
            <!--</div>-->
                   
            <form class="flex justify-around pa3">
                <input type="submit" id="image-button-face" class="pointer dib f6 tc pv3 ph4 ph5-ns bn bg-animate bg-blue hover-bg-dark-blue white"
                    value="face data" data-api="face" data-call=faceData onclick=${this}>
                <input type="submit" class="pointer dib f6 tc pv3 ph4 ph5-ns bn bg-animate bg-blue hover-bg-dark-blue white"
                    value="text data" data-api="ocr" data-call=textData onclick=${this}>
            </form>
            <div class=""></div>`
    }

    faceData(event) {
        event.preventDefault()
        let imageUriSubmission = this.querySelector('#image-uri').value || 'https://www.biography.com/.image/t_share/MTE1ODA0OTcxODYxNjQwNzE3/halle-berry-9542339-1-402.jpg'

        if ((typeof imageUriSubmission !== 'string') || (imageUriSubmission.slice(0, 4) !== 'http')) {
            return alert('must enter a web uri (beginning with `http` of an image')
        }

        fetchFaceData(imageUriSubmission)
            .then(annotations => {
                const data = annotations.body ? JSON.stringify(annotations.body[0]) : `no faces detected 😶😢`
                bind(this.lastChild)`<results-display url="${imageUriSubmission}" data="${data}"></results-display>`
            })
            .catch(err => console.error('could not fetch faceData', err))

        async function fetchFaceData(imageUri) {
            return await request
                .get('/api/fetchFaceData/')
                .query({imageUri})
        }
    }

    textData(event) {
        event.preventDefault()
        let textUriSubmission = this.querySelector('#image-uri').value || 'https://cldup.com/aTRvsYhPXM.png'
        // return this.appendChild(wire()`<p>work in progress</p>`)

        fetchTextData(textUriSubmission)
            .then(annotations => {
                const data = annotations.body ? JSON.stringify(annotations.body[0]) : `no text detected 😶😢`
                bind(this.lastChild)`<results-display url="${textUriSubmission}" data="${data}"></results-display>`
            })
            .catch(err => console.error('could not fetch textData', err)
            )

        async function fetchTextData(imageUri) {
            return await request
                .get('/api/fetchTextData/')
                .query({imageUri})
        }
    }
}

AppShell.define('app-shell')
