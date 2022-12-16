'use strict'

const SEARCHED_KEYWORDS_STORAGE_KEY = 'searchedKeyWordsDB'
const MEME_STORAGE_KEY = 'memeDB'

let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

// let gSavedMeme = []

let gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 40,
      align: 'center',
      color: 'white',
      strokeColor: 'black',
      pos: { x: 150, y: 150 },
    },
    {
      txt: 'My cat is the best',
      size: 20,
      align: 'center',
      color: 'white',
      strokeColor: 'black',
      pos: { x: 150, y: 120 },
    },
  ],
}

function initMeme() {}

function openEditor() {
  onInitMeme()
}

function getMeme() {
  return gMeme
}

function setMeme(imageId) {
  gMeme.selectedImgId = imageId
}

function setLineTxt(value) {
  //? DONE: Add Multiple Lines
  gMeme.lines[gMeme.selectedLineIdx].txt = value
  renderMeme()
}

function switchLine() {
  gMeme.lines.length - 1 === gMeme.selectedLineIdx
    ? (gMeme.selectedLineIdx = 0)
    : gMeme.selectedLineIdx++

  renderMeme()
  drawRectAfterSeconds(1)

  // console.log('Current Line is', gMeme.selectedLineIdx)
}

function createLine() {
  let line = {
    txt: 'New Line',
    size: 20,
    align: 'center',
    color: 'red',
    strokeColor: 'black',
    pos: { x: 150, y: getRandomIntInclusive(12, 400) },
  }
  gMeme.lines.push(line)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
  if (!gMeme.lines.length || !gMeme.lines) return

  if (gMeme.lines.length > gMeme.selectedLineIdx) {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    console.log('Line', gMeme.selectedLineIdx, 'removed.')
  } else {
    gMeme.selectedLineIdx = gMeme.lines.length - 1
  }
}

//* Not implemented yet
function _saveKeyWordsToStorage() {
  saveToStorage(SEARCHED_KEYWORDS_STORAGE_KEY, gKeywordSearchCountMap)
}
function _saveMemeToStorage() {
  saveToStorage(MEME_STORAGE_KEY, gMeme)
}
