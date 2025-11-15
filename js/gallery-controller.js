'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')

    let strHTMLs = gImgs
        .map(
            (img) =>
                `<img src="${img.url}" alt="gallery image" onclick="setMode('editor', ${img.id})">`
        )
        .join('')

    elGallery.innerHTML = strHTMLs
}

function onclickedImg(imgId) {
    const elGallery = document.querySelector('.gallery-container')
    const elCanvas = document.querySelector('.canvas')
    const elEditor = document.querySelector('.editor-container')

    elGallery.classList.add('hidden')
    elCanvas.classList.remove('hidden')
    elEditor.classList.remove('hidden')
    renderCanvas()
    setMemeImage(imgId)
    renderMeme()
}
