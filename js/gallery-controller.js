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
    setMode('gallery')
}
