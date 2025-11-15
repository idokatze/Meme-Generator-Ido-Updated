'use strict'

let gElCanvas
let gCtx
let gIsDraging
let gStartPos

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            text: 'Add Your Text',
            size: 30,
            color: 'red',
            outline: 'black',
            fontType: 'Impact',
            align: 'center',

            x: 250,
            y: 60,
            padding: 10,
        },
    ],
}

function onInit() {
    renderGallery()
}

function resizeCanvas() {
    const elContainer = gElCanvas.parentElement
    gElCanvas.width = elContainer.clientWidth - 2
    gElCanvas.height = elContainer.clientHeight - 2
}

function setMode(mode, imgId = null) {
    const elGallery = document.querySelector('.gallery-container')
    const elCanvas = document.querySelector('canvas')
    const elEditor = document.querySelector('.editor-container')

    elGallery.classList.add('hidden')
    elCanvas.classList.add('hidden')
    elEditor.classList.add('hidden')

    switch (mode) {
        case 'gallery':
            elGallery.classList.remove('hidden')
            break

        case 'editor':
            elCanvas.classList.remove('hidden')
            elEditor.classList.remove('hidden')
            renderCanvas()
            if (imgId) setMemeImage(imgId)
            renderMeme()
            break

        // Todo - more modes
    }
}
