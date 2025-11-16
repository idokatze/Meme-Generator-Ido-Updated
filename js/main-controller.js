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
            color: 'white',
            outline: 'black',
            fontType: 'Impact',
            align: 'center',
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
    const mainContainer = document.querySelector('.main-container')

    elGallery.classList.add('hidden')
    elCanvas.classList.add('hidden')
    elEditor.classList.add('hidden')
    mainContainer.classList.add('hidden')

    switch (mode) {
        case 'gallery':
            elGallery.classList.remove('hidden')
            elCanvas.classList.add('hidden')
            elEditor.classList.add('hidden')
            mainContainer.classList.add('hidden')
            break

        case 'editor':
            mainContainer.classList.remove('hidden')
            elCanvas.classList.remove('hidden')
            elEditor.classList.remove('hidden')
            renderCanvas()
            if (imgId) setMemeImage(imgId)
            renderMeme()
            break
    }
}
