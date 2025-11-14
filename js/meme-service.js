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
        size: 30, // pixel size
        color: 'red',
        outline: 'black',
        align: 'center',
        x: pos.x,
        y: pos.y,
        padding: 10,
    }

    gMeme.lines.push(newLine)
}

function updateMemeImg(imgId) {
    gMeme.selectedImgId = imgId
    gMemeImg = new Image()
    gMemeImg.src = `/img/meme-imgs (square)/${imgId}.jpg`
    gMemeImg.onload = () => renderMeme()
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

    // Optional: limit the minimum and maximum size
    if (newSize >= 5 && newSize <= 40) {
        line.size = newSize
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
