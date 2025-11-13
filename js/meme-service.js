'use strict'

// The current meme being edited
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            text: 'Add Your Text',
            size: 20,
            color: 'red',
            outline: 'black',
            fontType: 'Impact',
            align: 'center',
            x: 100, // hard coded, todo fix
            y: 50, // hard coded, todo fix
        },
    ],
}

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
    gMeme.selectedLineIdx = gMeme.lines.length
    const width = _getWidth()
    const height = _getHeight()

    const defaultPositions = [
        { x: width / 2, y: height / 4 },
        { x: (width * 3) / 4, y: (height * 3) / 4 },
        { x: width / 4, y: (height * 3) / 4 },
    ]

    const newLine = { ...gMeme.lines[0] }
    newLine.text = 'Add Your Text'
    const idx = gMeme.lines.length
    newLine.x = defaultPositions[idx].x
    newLine.y = defaultPositions[idx].y

    gMeme.lines.push(newLine)
}

function updateMemeImg(ImgId) {
    gMeme.selectedImgId = ImgId
}

function updateMemeText(userTxt) {
    const currIdx = gMeme.selectedLineIdx
    gMeme.lines[currIdx].text = userTxt
}

function getMeme() {
    return gMeme
}

function updateStrokeColor(strokeColor) {
    gMeme.lines[0].outline = strokeColor
}

function updateFillColor(fillColor) {
    gMeme.lines[0].color = fillColor
}

function changeSize(delta) {
    const line = gMeme.lines[0]
    const newSize = line.size + delta

    // Optional: limit the minimum and maximum size
    if (newSize >= 5 && newSize <= 40) {
        line.size = newSize
    }
}

function switchFocus() {
    let meme = getMeme()
    if (meme.lines.length <= 1) return

    if (meme.selectedLineIdx === meme.lines.length - 1) {
        meme.selectedLineIdx = 0
    } else {
        meme.selectedLineIdx++
    }
}
