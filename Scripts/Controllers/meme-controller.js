'use strict'

let gCanvas
let gCtx

let gPos

let isRendered

// let gOffPos = {}

let gIsMoving

function onInitMeme() {
  isRendered = false
  // initMeme()
  gCanvas = document.querySelector('.meme-canvas')
  gCtx = gCanvas.getContext('2d')
  // gPos = { x: gCanvas.width / 2, y: gCanvas.height / 2 }
  addEventListeners()

  renderMeme()
}

//? DONE: renders an image on the canvas and a line of text on top
function renderMeme() {
  const meme = getMeme()
  const image = getImageById(meme.selectedImgId)
  drawImgFromRemote(image)
}

function drawImgFromRemote(image) {
  const img = new Image()
  img.src = image.url
  // img.crossOrigin = 'anonymous'
  img.onload = () => {
    isRendered = true
    clearCanvas()
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    drawTxt()
  }
}

function drawTxt() {
  if (!isRendered) return
  const meme = getMeme()

  //? DONE: Add Multiple Lines
  let lines = meme.lines
  lines.forEach((line) => {
    const { txt, size, color, strokeColor, align, pos } = line
    const { x, y } = pos
    // console.log(line)

    gCtx.lineWidth = 2
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = color
    gCtx.font = size + 'px impact'
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
  })
}

function clearCanvas() {
  if (!isRendered) return
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
    if (!isRendered) return
    gIsMoving = true
    document.body.style.cursor = 'grabbing'
  })

  gCanvas.addEventListener('mouseup', (e) => {
    if (!isRendered) return
    gIsMoving = false
    document.body.style.cursor = 'auto'
  })

  gCanvas.addEventListener('mousemove', (e) => {
    if (!isRendered) return
    if (!gIsMoving) return
    const meme = getMeme()
    const { offsetX, offsetY } = e
    // gOffPos.x = offsetX
    // gOffPos.y = offsetY
    // gPos.x = offsetX
    // gPos.y = offsetY
    meme.lines[meme.selectedLineIdx].pos.x = offsetX
    meme.lines[meme.selectedLineIdx].pos.y = offsetY
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
  if (!isRendered) return
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].color = value
  renderMeme()
}

function setTextStrokeColor(value) {
  if (!isRendered) return
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].strokeColor = value
  renderMeme()
}

function setAlignment(value) {
  if (!isRendered) return
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].align = value
  switch (value) {
    case 'left':
      meme.lines[meme.selectedLineIdx].pos.x = 0
      break
    case 'right':
      meme.lines[meme.selectedLineIdx].pos.x = gCanvas.width
      break

    default:
      meme.lines[meme.selectedLineIdx].pos.x = gCanvas.width / 2
      break
  }
  renderMeme()
}

function moveVertical(value) {
  if (!isRendered) return
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].pos.y += value
  renderMeme()
}

function moveHorizontal(value) {
  if (!isRendered) return
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].pos.x += value
  renderMeme()
}

function changeSize(value) {
  if (!isRendered) return
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].size += value
  renderMeme()
}

function onAddLine() {
  if (!isRendered) return
  createLine()
  renderMeme()
}

function onDeleteLine() {
  if (!isRendered) return
  deleteLine()
  renderMeme()
}

//? Resolved: ! Not working, Github Cross Origin not allowed
function downloadMeme(elLink) {
  if (!isRendered) return
  const data = gCanvas.toDataURL()
  elLink.href = data
  console.log(data)
}
