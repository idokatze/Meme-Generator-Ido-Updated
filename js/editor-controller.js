'use strict'

function onAddTxt(elInput) {
    console.log('elInput:', elInput)
    const text = elInput.value
    updateMemeText(text)
    renderMeme()
}

function onUpdateStrokeColor(ev) {
    const strokeColor = ev.value
    updateStrokeColor(strokeColor)
    renderMeme()
}

function onUpdateFillColor(ev) {
    const fillColor = ev.value
    updateFillColor(fillColor)
    renderMeme()
}

function onDecreaseSize() {
    changeSize(-1)
    renderMeme()
}

function onIncreaseSize() {
    changeSize(1)
    renderMeme()
}

function onSwitchFocus() {
    switchFocus()
    _resetTextInput()
    renderMeme()
}

function onChangeAlign(mode) {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    updateLineAlign(mode, ctx, canvas.width)
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onChangeFont(selectElement) {
    const newFont = selectElement.value
    console.log('newFont:', newFont)
    changeFont(newFont)
    renderMeme()
}
