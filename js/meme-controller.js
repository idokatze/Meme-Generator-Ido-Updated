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
    const selectedIdx = meme.selectedLineIdx

    meme.lines.forEach((line, idx) => {
        const { text, size, color, outline, fontType, align, x, y } = line

        gCtx.save()

        // Font setup
        gCtx.font = `${size}px ${fontType}`
        gCtx.textAlign = align
        gCtx.textBaseline = 'bottom'

        // Measure text
        const textMetrics = gCtx.measureText(text)
        const textWidth = textMetrics.width
        const boxWidth = textWidth + padding * 2
        const boxHeight = size + padding * 2

        // Compute box position
        let boxX
        if (align === 'center') boxX = x - boxWidth / 2
        else if (align === 'left') boxX = x
        else if (align === 'right') boxX = x - boxWidth

        const boxY = y - size - padding

        // 🔹 Highlight selected line
        if (idx === selectedIdx) {
            gCtx.fillStyle = 'rgba(255, 255, 0, 0.25)' // soft yellow background
            gCtx.fillRect(boxX, boxY, boxWidth, boxHeight)

            gCtx.strokeStyle = 'yellow'
            gCtx.lineWidth = 3
            gCtx.strokeRect(boxX, boxY, boxWidth, boxHeight)
        } else {
            // Regular background for non-selected lines
            gCtx.fillStyle = 'rgba(0, 0, 0, 0.3)'
            gCtx.fillRect(boxX, boxY, boxWidth, boxHeight)

            gCtx.strokeStyle = 'black'
            gCtx.lineWidth = 2
            gCtx.strokeRect(boxX, boxY, boxWidth, boxHeight)
        }

        // Draw text and outline
        gCtx.fillStyle = color
        gCtx.fillText(text, x, y)

        gCtx.strokeStyle = outline
        gCtx.lineWidth = 2
        gCtx.strokeText(text, x, y)

        gCtx.restore()
    })
}

function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL('image/jpeg')
    elLink.href = dataUrl
    elLink.download = 'my-meme.jpeg'
}

function onAddLine() {
    addLine()
    _resetTextInput()
    drawTextBoxes()
}

function _getWidth() {
    return gElCanvas.width
}

function _getHeight() {
    return gElCanvas.height
}

function _resetTextInput() {
    const elInput = document.querySelector('.meme-text-input')
    const idx = gMeme.selectedLineIdx

    elInput.value = ''
    elInput.placeholder = 'Add Your Text'

    if (
        idx !== undefined &&
        gMeme.lines[idx] &&
        gMeme.lines[idx].text !== 'Add Your Text'
    ) {
        elInput.value = gMeme.lines[idx].text
    }
}
