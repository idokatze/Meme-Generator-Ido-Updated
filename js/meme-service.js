'use strict'

// The current meme being edited
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            text: 'I sometimes eat Falafel',
            size: 20,
            color: 'red',
            outline: 'black',
            fontType: 'Impact',
            align: 'center',
        },
    ],
}

// Keyword search count map
var gKeywordSearchCountMap = {
    funny: 12,
    cat: 16,
    baby: 2,
}

function updateMemeImg(ImgId) {
    gMeme.selectedImgId = ImgId
}

function updateMemeText(userTxt) {
    gMeme.lines[0].text = userTxt
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
