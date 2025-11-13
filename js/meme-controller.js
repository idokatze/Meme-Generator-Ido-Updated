'use strict'

function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    if (!gElCanvas) return
    gCtx = gElCanvas.getContext('2d')
}

function renderMeme() {
    renderCanvas()
    if (!gElCanvas || !gCtx) return

    const meme = getMeme()
    const img = new Image()
    img.src = ` /img/meme-imgs (square)/${gMeme.selectedImgId}.jpg`
    img.onload = () => {
        gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawTextBoxes()
    }
}

function drawTextBoxes(padding = 10) {
    if (!gCtx || !gMeme) return

    const meme = getMeme()
    console.log('meme:', meme)

    meme.lines.forEach((line) => {
        const { text, size, color, outline, fontType, align, x, y } = line

        gCtx.save() // save current context

        // Set font and alignment
        gCtx.font = `${size}px ${fontType}`
        gCtx.textAlign = align
        gCtx.textBaseline = 'bottom' // ensures y refers to baseline

        // Measure text width
        const textMetrics = gCtx.measureText(text)
        const textWidth = textMetrics.width
        const boxWidth = textWidth + padding * 2
        const boxHeight = size + padding * 2

        // Compute box position based on alignment
        let boxX
        if (align === 'center') boxX = x - boxWidth / 2
        else if (align === 'left') boxX = x
        else if (align === 'right') boxX = x - boxWidth

        const boxY = y - size - padding // position above baseline

        // Draw semi-transparent background
        gCtx.fillStyle = 'rgba(0,0,0,0.3)'
        gCtx.fillRect(boxX, boxY, boxWidth, boxHeight)

        // Draw rectangle outline
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 2
        gCtx.strokeRect(boxX, boxY, boxWidth, boxHeight)

        // Draw text
        gCtx.fillStyle = color
        gCtx.fillText(text, x, y)

        // Draw text outline
        gCtx.strokeStyle = outline
        gCtx.lineWidth = 2
        gCtx.strokeText(text, x, y)

        gCtx.restore() // restore previous context
    })
}

function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL('image/jpeg')
    elLink.href = dataUrl
    elLink.download = 'my-meme.jpeg'
}

function onAddLine() {
    addLine()
    drawTextBoxes()
}

function _getWidth() {
    return gElCanvas.width
}

function _getHeight() {
    return gElCanvas.height
}
