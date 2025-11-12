'use strict'

function renderMeme() {
    const meme = getMeme()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    const img = new Image()
    img.src = ` /img/meme-imgs (square)/${gMeme.selectedImgId}.jpg`

    img.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawTextBox()
    }
}

function onAddText() {
    const userTxt = prompt('Enter your text here')
    updateMemeText(userTxt)
    renderMeme()
    console.log('gMeme:', gMeme)
}

function drawTextBox(y = 50) {
    const meme = getMeme()
    const { text, size, color, outline, fontType, align } = meme.lines[0]

    gCtx.textAlign = align || 'center'
    gCtx.font = `${size}px ${fontType || 'Impact'}`

    // Measure text width
    const textMetrics = gCtx.measureText(text)
    const textWidth = textMetrics.width

    const x = gElCanvas.width / 2
    const padding = 10
    const boxHeight = size + padding * 2
    const boxWidth = textWidth + padding * 2
    const boxX = x - boxWidth / 2
    const boxY = y - size - padding

    // Draw rectangle behind text
    gCtx.fillStyle = 'rgba(0,0,0,0.5)'
    gCtx.fillRect(boxX, boxY, boxWidth, boxHeight)

    // Draw rectangle outline
    gCtx.strokeStyle = outline || 'black'
    gCtx.lineWidth = 2
    gCtx.strokeRect(boxX, boxY, boxWidth, boxHeight)

    // Draw the text
    gCtx.fillStyle = color || 'white'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}
