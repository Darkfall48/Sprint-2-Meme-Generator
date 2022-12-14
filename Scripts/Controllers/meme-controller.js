'use strict'

let gCanvas
let gCtx

function onInitMeme() {
  // initMeme()
  gCanvas = document.querySelector('.meme-canvas')
  gCtx = gCanvas.getContext('2d')

  renderMeme()
}

// TODO: renders an image on the canvas and a line of text on top
function renderMeme() {
  const meme = getMeme()
  const image = getImageById(meme.selectedImgId)
  drawImgFromRemote(image)
}

function drawImgFromRemote(image) {
  const img = new Image()
  img.src = image.url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
  }
}
