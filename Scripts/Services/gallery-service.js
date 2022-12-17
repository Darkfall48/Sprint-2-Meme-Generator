'use strict'

const GALLERY_STORAGE_KEY = 'galleryDB'

let gImgs
let gFilterBy = { keyword: '' }

function initGallery() {
  _createImages()
}

function getImages() {
  const images = loadFromStorage(GALLERY_STORAGE_KEY)
  if (!gFilterBy.keyword) return images

  const filtredImages = images.filter((image) =>
    image.keywords.includes(gFilterBy.keyword)
  )

  if (!filtredImages.length || !filtredImages) return images
  else return filtredImages
}

function setFilter(value) {
  gFilterBy.keyword = value.toLowerCase()
  renderGallery()
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
      _createImage('./Images/Gallery/Fixed/1.jpg', ['politic', 'trump']),
      _createImage('./Images/Gallery/Fixed/2.jpg', ['animal', 'dog']),
      _createImage('./Images/Gallery/Fixed/3.jpg', ['animal', 'dog', 'baby']),
      _createImage('./Images/Gallery/Fixed/4.jpg', ['animal', 'cat']),
      _createImage('./Images/Gallery/Fixed/5.jpg', ['kid', 'baby', 'power']),
      _createImage('./Images/Gallery/Fixed/6.jpg', ['crazy']),
      _createImage('./Images/Gallery/Fixed/7.jpg', ['funny', 'baby']),
      _createImage('./Images/Gallery/Fixed/8.jpg', ['pensive', 'actor']),
      _createImage('./Images/Gallery/Fixed/10.jpg', [
        'politic',
        'obama',
        'barak',
      ]),
      _createImage('./Images/Gallery/Fixed/11.jpg', ['love']),
      _createImage('./Images/Gallery/Fixed/12.jpg', ['funny']),
      _createImage('./Images/Gallery/Fixed/13.jpg', ['actor', 'di', 'caprio']),
      _createImage('./Images/Gallery/Fixed/14.jpg', ['movie', 'matrix']),
      _createImage('./Images/Gallery/Fixed/15.jpg', ['movie', 'lord', 'ring']),
      _createImage('./Images/Gallery/Fixed/16.jpg', ['movie', 'star', 'space']),
      _createImage('./Images/Gallery/Fixed/17.jpg', [
        'politic',
        'vladimir',
        'putin',
      ]),
      _createImage('./Images/Gallery/Fixed/18.jpg', ['movie', 'toys']),
      _createImage('./Images/Gallery/Various/9.jpg', ['funny', 'baby', 'kid']),
      _createImage('./Images/Gallery/Various/2.jpg', ['movie', 'toys']),
      _createImage('./Images/Gallery/Various/004.jpg', ['movie', 'toys']),
      _createImage('./Images/Gallery/Various/leo.jpg', ['movie', 'toys']),
      _createImage('./Images/Gallery/Shows/1.webp', [
        'adam',
        'wednesday',
        'spooky',
      ]),
      _createImage('./Images/Gallery/Anime/1.jpg', ['anime']),
      _createImage('./Images/Gallery/Anime/2.png', ['anime']),
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
