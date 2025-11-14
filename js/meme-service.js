'use strict'

// The current meme being edited
// var gMeme = {
//     selectedImgId: 5,
//     selectedLineIdx: 0,
//     lines: [
//         {
//             text: 'Add Your Text',
//             size: 20,
//             color: 'red',
//             outline: 'black',
//             fontType: 'Impact',
//             align: 'center',

//             // Relative positions (ratios of canvas width/height)
//             xRatio: 0.5,
//             yRatio: 0.25,

//             // Absolute positions (pixels)
//             x: 100,
//             y: 50,

//             // Bounding box (pixels) — optional, for hover/click detection
//             width: 0, // to be calculated dynamically
//             height: 0, // to be calculated dynamically
//             padding: 10, // optional padding around text for box
//         },
//     ],
// }

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            // Base info
            text: 'Add Your Text', 
            sizeRatio: 0.05, 
            color: 'red', 
            outline: 'black',
            fontType: 'Impact', 
            align: 'center', 

            // Relative positions for dynamic canvas
            xRatio: 0.5,
            yRatio: 0.25,

            // Relative text box dimensions
            widthRatio: 0.4, 
            heightRatio: 0.1, 

            paddingRatio: 0.02,
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
    const width = _getCanvasWidth()
    const height = _getCanvasHeight()

    const defaultPositions = [
        { xRatio: 0.5, yRatio: 0.25 },
        { xRatio: 0.75, yRatio: 0.75 },
        { xRatio: 0.25, yRatio: 0.75 },
    ]

    const idx = gMeme.lines.length
    gMeme.selectedLineIdx = idx
    const pos = defaultPositions[idx]
    const newLine = { ...gMeme.lines[0] }

    newLine.xRatio = pos.xRatio
    newLine.yRatio = pos.yRatio
    newLine.x = pos.xRatio * width
    newLine.y = pos.yRatio * height
    newLine.text = 'Add Your Text'

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
