'use strict'

let gImgs

function initGallery() {
  _createImages()
}

function getImages() {
  return gImgs
}

function getImageById(imageId) {
  return gImgs.find((image) => image.id === imageId)
}

function imageClicked(imageId) {
  setMeme(imageId)
}

function _createImages() {
  gImgs = [
    _createImage(
      'https://github.com/Darkfall48/Sprint-2-Meme-Generator/blob/main/Images/Gallery/1.jpg?raw=true',
      ['funny', 'cat']
    ),
    _createImage(
      'https://github.com/Darkfall48/Sprint-2-Meme-Generator/blob/main/Images/Gallery/2.jpg?raw=true',
      ['funny', 'cat']
    ),
    _createImage(
      'https://github.com/Darkfall48/Sprint-2-Meme-Generator/blob/main/Images/Gallery/3.jpg?raw=true',
      ['funny', 'cat']
    ),
    _createImage(
      'https://github.com/Darkfall48/Sprint-2-Meme-Generator/blob/main/Images/Gallery/4.jpg?raw=true',
      ['funny', 'cat']
    ),
  ]
}
function _createImage(url, keywords) {
  return { id: makeId(), url, keywords }
}
