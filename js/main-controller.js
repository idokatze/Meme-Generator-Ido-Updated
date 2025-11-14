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
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gIsDraging = false
    gStartPos = { x: 0, y: 0 }
    resizeCanvas()
    renderGallery()
    preloadMemeImage()
    // addCanvasEventListeners();

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function resizeCanvas() {
    const elContainer = gElCanvas.parentElement
    gElCanvas.width = elContainer.clientWidth - 2
    gElCanvas.height = elContainer.clientHeight - 2
}
