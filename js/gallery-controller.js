'use strict'

function renderGallery() {
    console.log('hi')
    const elGallery = document.querySelector('.gallery-container')

    let strHTMLs = gImgs
        .map(
            (img) =>
                `<img src="${img.url}" alt="gallery image" onclick="onclickedImg(${img.id})">`
        )
        .join('')

    elGallery.innerHTML = strHTMLs
}

function onclickedImg(ImgId) {
    updateMemeImg(ImgId)
    renderMeme()
}
