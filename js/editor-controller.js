'use strict'

function onAddTxt(elInput) {
    console.log('elInput:', elInput)
    const text = elInput.value
    updateMemeText(text)
    renderMeme()
}

function onUpdateStrokeColor(ev) {
    const elStrokeColor = document.querySelector('.stroke-color').value
    updateStrokeColor(elStrokeColor)
    renderMeme()
}

function onUpdateFillColor(ev) {
    const elFillColor = document.querySelector('.fill-color').value
    updateFillColor(elFillColor)
    renderMeme()
}
