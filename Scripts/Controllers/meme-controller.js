'use strict'

let gCanvas
let gCtx

let gCurrentLine = 0
let gPos

// let gOffPos = {}

let gIsMoving

function onInitMeme() {
  // initMeme()
  gCanvas = document.querySelector('.meme-canvas')
  gCtx = gCanvas.getContext('2d')
  gPos = { x: gCanvas.width / 2, y: gCanvas.height / 2 }
  addEventListeners()

  renderMeme()
}

//? DONE: renders an image on the canvas and a line of text on top
function renderMeme() {
  const meme = getMeme()
  const image = getImageById(meme.selectedImgId)
  clearCanvas()
  drawImgFromRemote(image)
}

function drawImgFromRemote(image) {
  const img = new Image()
  img.src = image.url
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    drawTxt()
  }
}

function drawTxt() {
  const meme = getMeme()

  // TODO: Add Multiple Lines
  let line = meme.lines[gCurrentLine]
  const { txt, size, color, strokeColor, align } = line
  console.log(line)

  gCtx.lineWidth = 2
  gCtx.strokeStyle = strokeColor
  gCtx.fillStyle = color
  gCtx.font = size + 'px arial'
  gCtx.textAlign = align
  gCtx.textBaseline = 'middle'

  gCtx.fillText(txt, gPos.x, gPos.y) // Draws (fills) a given text at the given (x, y) position.
  gCtx.strokeText(txt, gPos.x, gPos.y) // Draws (strokes) a given text at the given (x, y) position.
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
  console.log('Canvas is cleaned')
  // console.clear()
}

function addEventListeners() {
  // let moveDetect = new Hammer(gCanvas)
  // moveDetect.add(
  //   new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 })
  // )
  // moveDetect.on('pan', (ev) => {
  //   console.log(ev)
  //   console.log(ev.offsetDirection)
  //   gPos.x = gOffPos.x
  //   gPos.y = gOffPos.y
  //   renderMeme()
  // })

  gCanvas.addEventListener('mousedown', (e) => {
    gIsMoving = true
    document.body.style.cursor = 'grabbing'
  })

  gCanvas.addEventListener('mouseup', (e) => {
    gIsMoving = false
    document.body.style.cursor = 'auto'
  })

  gCanvas.addEventListener('mousemove', (e) => {
    if (!gIsMoving) return
    const { offsetX, offsetY } = e
    // gOffPos.x = offsetX
    // gOffPos.y = offsetY
    gPos.x = offsetX
    gPos.y = offsetY
    renderMeme()
    // console.log('offsetX, offsetY:', offsetX, offsetY)
  })

  // ! Mobile not working
  // gCanvas.addEventListener('touchestart', (e) => (gIsMoving = true))
  // gCanvas.addEventListener('touchend', (e) => (gIsMoving = false))
  // gCanvas.addEventListener('touchmove', (e) => {
  //   if (!gIsMoving) return
  //   const { offsetX, offsetY } = e
  //   // gOffPos.x = offsetX
  //   // gOffPos.y = offsetY
  //   gPos.x = offsetX
  //   gPos.y = offsetY
  //   renderMeme()
  //   console.log('offsetX, offsetY:', offsetX, offsetY)
  // })

  window.addEventListener('resize', () => {
    // gStx.save() // Saves the current drawing style state using a stack.
    // ! Not Working Currently
    // resizeCanvas()
    // renderMeme()
    // gStx.restore() // Restores the drawing style state to the last element on the 'state stack' saved by save().
  })
}

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gCanvas.width = elContainer.offsetWidth - 20
}

function setTextColor(value) {
  const meme = getMeme()
  meme.lines[gCurrentLine].color = value
  renderMeme()
}

function setTextStrokeColor(value) {
  const meme = getMeme()
  meme.lines[gCurrentLine].strokeColor = value
  renderMeme()
}

function setAlignment(value) {
  const meme = getMeme()
  meme.lines[gCurrentLine].align = value
  switch (value) {
    case 'left':
      gPos.x = 0
      break
    case 'right':
      gPos.x = gPos.x = gCanvas.width
      break

    default:
      gPos.x = gCanvas.width / 2
      break
  }
  renderMeme()
}

function moveVertical(value) {
  gPos.y += value
  renderMeme()
}

function moveHorizontal(value) {
  gPos.x += value
  renderMeme()
}

function changeSize(value) {
  const meme = getMeme()
  meme.lines[gCurrentLine].size += value
  renderMeme()
}
