'use strict'

// Keyword search count map
var gKeywordSearchCountMap = {
    funny: 12,
    cat: 16,
    baby: 2,
}

function addLine() {
    if (!gElCanvas) return
    if (gMeme.lines.length >= 3) {
        alert('You can have a max of 3 lines!')
        return
    }

    const width = gElCanvas.width
    const height = gElCanvas.height

    const defaultPositions = [
        { x: width / 2, y: height * 0.25 },
        { x: width * 0.75, y: height * 0.75 },
        { x: width * 0.25, y: height * 0.75 },
    ]

    const idx = gMeme.lines.length
    gMeme.selectedLineIdx = idx
    const pos = defaultPositions[idx]

    const newLine = {
        text: 'Add Your Text',
        fontType: 'Impact',
        size: 30,
        color: 'white',
        outline: 'black',
        align: 'center',
        padding: 10,
    }

    gMeme.lines.push(newLine)
}

function setMemeImage(imgId) {
    if (!imgId) return

    const meme = getMeme()
    meme.selectedImgId = imgId
    gMemeImg = new Image()
    gMemeImg.src = `img/square-imgs/${meme.selectedImgId}.jpg`

    gMemeImg.onload = () => {
        renderMeme()
    }
}

function updateMemeText(userTxt) {
    const currIdx = gMeme.selectedLineIdx
    gMeme.lines[currIdx].text = userTxt
}

function getMeme() {
    return gMeme
}

function updateStrokeColor(strokeColor) {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    const line = meme.lines[lineIdx]
    line.outline = strokeColor
}

function updateFillColor(fillColor) {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    const line = meme.lines[lineIdx]
    line.color = fillColor
}

function changeSize(delta) {
    const meme = getMeme()
    const lineIdx = meme.selectedLineIdx
    const line = meme.lines[lineIdx]
    const newSize = line.size + delta

    if (newSize >= 5 && newSize <= 40) {
        line.size = newSize
        updateLineMetrics(line, gCtx)
        renderMeme()
    }
}

function switchFocus() {
    const meme = getMeme()
    if (meme.lines.length <= 1) return

    if (meme.selectedLineIdx === meme.lines.length - 1) {
        meme.selectedLineIdx = 0
    } else {
        meme.selectedLineIdx++
    }
}

function updateLineAlign(mode, ctx, canvasWidth) {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]

    ctx.font = `${line.size}px ${line.fontType}`
    const textWidth = ctx.measureText(line.text).width
    const boxWidth = textWidth + line.padding * 2
    const margin = 20

    if (mode === 'left') {
        line.x = margin + line.padding
        line.boxX = margin
    } else if (mode === 'center') {
        line.x = canvasWidth / 2 - textWidth / 2
        line.boxX = (canvasWidth - boxWidth) / 2
    } else if (mode === 'right') {
        line.x = canvasWidth - margin - textWidth - line.padding
        line.boxX = canvasWidth - boxWidth - margin
    }

    line.align = mode
}

function removeLine() {
    const meme = getMeme()
    const idx = meme.selectedLineIdx

    if (meme.lines.length === 0) return
    if (meme.lines.length === 1) {
        alert('You must have at least one line')
        return
    }

    meme.lines.splice(idx, 1)
    meme.selectedLineIdx = 0
}

function changeFont(newFont) {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    line.fontType = newFont

    updateLineMetrics(line, gCtx)
}

function updateLineMetrics(line, ctx) {
    ctx.font = `${line.size}px ${line.fontType}`
    ctx.textBaseline = 'bottom'

    const textWidth = ctx.measureText(line.text).width

    line.boxWidth = textWidth + line.padding * 2
    line.boxHeight = line.size + line.padding * 2

    line.boxX = line.x - line.padding
    line.boxY = line.y - line.size - line.padding
}
