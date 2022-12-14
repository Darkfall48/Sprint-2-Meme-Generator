'use strict'

const SEARCHED_KEYWORDS_STORAGE_KEY = 'searchedKeyWordsDB'
const MEME_STORAGE_KEY = 'memeDB'

let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

let gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 40,
      align: 'center',
      color: 'red',
      strokeColor: 'black',
    },
  ],
}

function initMeme() {}

function openEditor() {
  onInitMeme()
}

function setMeme(imageId) {
  gMeme.selectedImgId = imageId
}

function setLineTxt(value) {
  // TODO: Add Multiple Lines
  let currentLine = 0
  gMeme.lines[currentLine].txt = value
  renderMeme()
}

function getMeme() {
  return gMeme
}

//* Not implemented yet
function _saveKeyWordsToStorage() {
  saveToStorage(SEARCHED_KEYWORDS_STORAGE_KEY, gKeywordSearchCountMap)
}
function _saveMemeToStorage() {
  saveToStorage(MEME_STORAGE_KEY, gMeme)
}
