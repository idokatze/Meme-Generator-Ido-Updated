'use strict'

let gMemeImg = new Image() // global image

function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    if (!gElCanvas) return
    gCtx = gElCanvas.getContext('2d')
}

function preloadMemeImage() {
    const meme = getMeme()
    gMemeImg.src = `/img/meme-imgs (square)/${meme.selectedImgId}.jpg`

    // Draw as soon as image is loaded
    gMemeImg.onload = () => renderMeme()
}

function renderMeme() {
    renderCanvas()
    if (!gElCanvas || !gCtx || !gMemeImg.complete) return

    // Clear canvas first
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

    // Draw the image
    gCtx.drawImage(gMemeImg, 0, 0, gElCanvas.width, gElCanvas.height)

    // Draw all text lines
    drawTextBoxes()
}

function drawTextBoxes(padding = 10) {
    if (!gCtx || !gMeme) return
    updateResponsivePositions()
    const canvasWidth = _getCanvasWidth()
    const canvasHeight = _getCanvasHeight()
    const meme = getMeme()
    const selectedIdx = meme.selectedLineIdx

    meme.lines.forEach((line, idx) => {
        const {
            text,
            sizeRatio,
            color,
            outline,
            fontType,
            align,
            xRatio,
            yRatio,
        } = line
        const x = xRatio * canvasWidth
        const y = yRatio * canvasHeight
        const textSize = line.sizeRatio * canvasHeight

        gCtx.save()
        gCtx.font = `${textSize}px ${fontType}`
        gCtx.textAlign = align
        gCtx.textBaseline = 'bottom'

        // Measure text width
        const textWidth = gCtx.measureText(text).width
        const boxWidth = textWidth + padding * 2
        const boxHeight = textSize + padding * 2

        console.log('sizeRatio:', sizeRatio)
        // Compute box position
        let boxX = x
        if (align === 'center') boxX = x - boxWidth / 2
        else if (align === 'right') boxX = x - boxWidth
        const boxY = y - textSize - padding

        // Highlight selected line with an outline box
        if (idx === selectedIdx) {
            gCtx.strokeStyle = 'yellow'
            gCtx.lineWidth = 2
            gCtx.strokeRect(boxX, boxY, boxWidth, boxHeight)
        }

        // Draw text fill
        gCtx.fillStyle = color
        gCtx.fillText(text, x, y)

        // Draw text outline
        gCtx.strokeStyle = outline
        gCtx.lineWidth = 2
        gCtx.strokeText(text, x, y)

        gCtx.restore()
        console.log('gMeme.selectedLineIdx:', gMeme.selectedLineIdx)
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
    renderMeme()
}

function _getCanvasWidth() {
    return gElCanvas.width
}

function _getCanvasHeight() {
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

function updateResponsivePositions() {
    const width = gElCanvas.width
    const height = gElCanvas.height

    gMeme.lines.forEach((line) => {
        if (line.xRatio !== undefined && line.yRatio !== undefined) {
            line.x = line.xRatio * width
            line.y = line.yRatio * height
        }
    })
}

function getLinesPos() {
    const linesPos = []
    const meme = getMeme()

    meme.lines.forEach((line) => {
        linesPos.push({ x: currLineX, y: currLineY })
    })

    return linesPos
}
