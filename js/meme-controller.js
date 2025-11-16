'use strict'

let gMemeImg = new Image()

function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    if (!gElCanvas) return
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function renderMeme(isExport = false) {
    if (!gElCanvas || !gCtx || !gMemeImg.complete) return

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(gMemeImg, 0, 0, gElCanvas.width, gElCanvas.height)
    drawTextBoxes(isExport)
}

function drawTextBoxes(isExport) {
    if (!gCtx || !gMeme) return
    const meme = getMeme()
    console.log('meme:', meme)
    const selectedIdx = gMeme.selectedLineIdx
    gMeme.lines.forEach((line, idx) => {
        gCtx.save()
        gCtx.font = `${line.size}px ${line.fontType}`
        gCtx.textBaseline = 'bottom'

        ensureLineDefaults(
            line,
            idx,
            gCtx,
            gCtx.canvas.width,
            gCtx.canvas.height
        )

        const {
            text,
            size,
            color,
            outline,
            x,
            y,
            boxX,
            boxY,
            boxWidth,
            boxHeight,
        } = line

        if (!isExport && idx === selectedIdx) {
            gCtx.strokeStyle = 'yellow'
            gCtx.lineWidth = 2
            gCtx.strokeRect(boxX, boxY, boxWidth, boxHeight)
        }

        gCtx.fillStyle = color
        gCtx.fillText(text, x, y)

        gCtx.strokeStyle = outline
        gCtx.lineWidth = 2
        gCtx.strokeText(text, x, y)

        gCtx.restore()
    })
}

function onDownloadMeme(elBtn) {
    renderMeme(true)
    const dataUrl = gElCanvas.toDataURL('image/jpeg')

    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'my-meme.jpg'
    link.click()

    renderMeme()
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
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onDown(ev) {
    const pos = getEvPos(ev)
    calcLineLocations()
    const meme = getMeme()

    const hitLineIdx = meme.lines.findIndex((line) => {
        return (
            pos.x >= line.location.x &&
            pos.x <= line.location.x + line.location.width &&
            pos.y >= line.location.y &&
            pos.y <= line.location.y + line.location.height
        )
    })

    if (hitLineIdx === -1) return

    meme.selectedLineIdx = hitLineIdx
    gIsDraging = true
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    console.log('hi')

    if (!gIsDraging) return

    const pos = getEvPos(ev)
    const deltaX = pos.x - gStartPos.x
    const deltaY = pos.y - gStartPos.y

    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    line.x += deltaX
    line.y += deltaY

    gStartPos = pos
    calcLineLocations()
    renderMeme()
}

function onUp(ev) {
    gIsDraging = false
    document.body.style.cursor = 'default'
    renderMeme()
}

function calcLineLocations() {
    const meme = getMeme()

    meme.lines.forEach((line) => {
        gCtx.font = `${line.size}px ${line.fontType}`
        gCtx.textBaseline = 'bottom'

        const textWidth = gCtx.measureText(line.text).width

        const xCoord = line.x
        const yCoord = line.y - line.size

        line.location = {
            x: xCoord,
            y: yCoord,
            width: textWidth,
            height: line.size,
        }

        line.boxWidth = textWidth + line.padding * 2
        line.boxHeight = line.size + line.padding * 2
        line.boxX = line.x - line.padding
        line.boxY = line.y - line.size - line.padding
    })
}

function ensureLineDefaults(line, idx, ctx, canvasWidth, canvasHeight) {
    ctx.font = `${line.size}px ${line.fontType}`
    const textWidth = ctx.measureText(line.text).width

    if (line.y == null) {
        if (idx === 0) line.y = canvasHeight / 3
        else if (idx === 1) line.y = (canvasHeight / 3) * 2
        else line.y = canvasHeight / 2
    }

    if (line.x == null) {
        line.x = canvasWidth / 2 - textWidth / 2
    }

    if (line.boxWidth == null) line.boxWidth = textWidth + line.padding * 2
    if (line.boxHeight == null) line.boxHeight = line.size + line.padding * 2
    if (line.boxX == null) line.boxX = line.x - line.padding
    if (line.boxY == null) line.boxY = line.y - line.size - line.padding
}
