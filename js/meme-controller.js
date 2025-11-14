'use strict'

let gMemeImg = new Image()

function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    if (!gElCanvas) return
    gCtx = gElCanvas.getContext('2d')
}

function preloadMemeImage() {
    const meme = getMeme()
    gMemeImg.src = `/img/meme-imgs (square)/${meme.selectedImgId}.jpg`
    gMemeImg.onload = () => renderMeme()
}

function renderMeme() {
    renderCanvas()
    if (!gElCanvas || !gCtx || !gMemeImg.complete) return

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(gMemeImg, 0, 0, gElCanvas.width, gElCanvas.height)
    drawTextBoxes()
}

function drawTextBoxes() {
    if (!gCtx || !gMeme) return
    const selectedIdx = gMeme.selectedLineIdx

    gMeme.lines.forEach((line, idx) => {
        const { text, size, color, outline, fontType, align, x, y, padding } =
            line

        gCtx.save()
        gCtx.font = `${size}px ${fontType}`
        gCtx.textAlign = align
        gCtx.textBaseline = 'bottom'

        const textWidth = gCtx.measureText(text).width
        const boxWidth = textWidth + padding * 2
        const boxHeight = size + padding * 2

        // Compute box top-left
        let boxX = x
        if (align === 'center') boxX = x - boxWidth / 2
        else if (align === 'right') boxX = x - boxWidth
        const boxY = y - size - padding

        // Outline for selected line
        if (idx === selectedIdx) {
            gCtx.strokeStyle = 'yellow'
            gCtx.lineWidth = 2
            gCtx.strokeRect(boxX, boxY, boxWidth, boxHeight)
        }

        // Draw text
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

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    const linesPos = getLineLocations()
    console.log('pos', pos)

    const meme = getMeme()

    linesPos.forEach((line) => {
        if (
            pos.x >= line.x &&
            pos.x <= line.x + line.width &&
            pos.y >= line.y &&
            pos.y <= line.y + line.height
        ) {
            console.log('hit')
        }
    })

    // if (!isCircleClicked(pos)) return
    // console.log('onDown')

    // setCircleDrag(true)
    // //Save the pos we start from
    // gStartPos = pos
    // document.body.style.cursor = 'grabbing'
}

function getLineLocations() {
    const meme = getMeme()
    const lines = meme.lines

    const locations = lines.map((line) => {
        gCtx.font = `${line.size}px ${line.fontType}`
        gCtx.textAlign = line.align
        gCtx.textBaseline = 'bottom' // if this is how you draw the text
        const textWidth = gCtx.measureText(line.text).width
        console.log('line.x:', line.x)

        let xCoord = line.x
        if (line.align === 'center') xCoord = line.x - textWidth / 2
        else if (line.align === 'right') xCoord = line.x - textWidth
        console.log('textWidth:', textWidth)
        const yCoord = line.y - line.size

        return { x: xCoord, y: yCoord, width: textWidth, height: line.size }
    })

    return locations
}
