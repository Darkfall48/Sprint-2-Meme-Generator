'use strict'

const GALLERY_STORAGE_KEY = 'galleryDB'

let gImgs

function initGallery() {
  _createImages()
}

function getImages() {
  return loadFromStorage(GALLERY_STORAGE_KEY)
}

function getImageById(imageId) {
  return gImgs.find((image) => image.id === imageId)
}

function imageClicked(imageId) {
  setMeme(imageId)
  openEditor()
}

function _createImages() {
  gImgs = loadFromStorage(GALLERY_STORAGE_KEY)
  if (!gImgs || !gImgs.length) {
    gImgs = [
      _createImage('./Images/Gallery/1.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/2.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/3.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/4.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/5.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/6.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/7.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/8.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/9.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/10.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/11.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/12.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/13.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/14.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/15.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/16.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/17.jpg', ['funny', 'cat']),
      _createImage('./Images/Gallery/18.jpg', ['funny', 'cat']),
    ]
    console.log('Gallery Created')
  }
  _saveGalleryToStorage()
}
function _createImage(url, keywords) {
  return { id: makeId(), url, keywords }
}

function _saveGalleryToStorage() {
  saveToStorage(GALLERY_STORAGE_KEY, gImgs)
}
