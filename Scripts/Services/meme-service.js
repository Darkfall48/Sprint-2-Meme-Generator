'use strict'

let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

let gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      align: 'left',
      color: 'red',
    },
  ],
}

function initMeme() {}

function openEditor() {
  onInitMeme()
}

function setMeme(imageId) {
  gMeme.selectedImgId = imageId
  openEditor()
}

function getMeme() {
  return gMeme
}
