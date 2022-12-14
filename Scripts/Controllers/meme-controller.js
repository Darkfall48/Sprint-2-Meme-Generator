'use strict'

let gCanvas
let gCtx

let gPos

let isRendered
let isSized

let gIsMoving

function onInitMeme() {
  onDisplayEditor()
  isRendered = false
  isSized = false
  gCanvas = document.querySelector('.meme-canvas')
  gCtx = gCanvas.getContext('2d')
  addEventListeners()

  renderMeme()

  drawRectAfterSeconds(1)

  updateInputLine()
}

function getCanvas() {
  return gCanvas
}

//? DONE: renders an image on the canvas and a line of text on top
function renderMeme() {
  if (!isSized) {
    //? DONE: Reset Canvas Size
    gCanvas.height = 450
    gCanvas.width = 450
  }
  const meme = getMeme()
  const image = getImageById(meme.selectedImgId)

  drawImgFromRemote(image)
}

function drawImgFromRemote(image) {
  const img = new Image()
  img.src = image.url
  // img.crossOrigin = 'anonymous'
  if (!isSized) {
    //? DONE: Set New canvas size based on ratio picture
    const { height, width } = img
    // console.log('Image: Height', height, 'Width', width)
    // console.log('Canvas: Height', gCanvas.height, 'Width', gCanvas.width)
    // gCanvas.width = 200
    gCanvas.height = (gCanvas.height * height) / width
    // console.log('New Canvas: Height', gCanvas.height, 'Width', gCanvas.width)
    isSized = true
  }
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
  // console.log('Canvas is cleaned')
  // console.clear()
}

function addEventListeners() {
  gCanvas.addEventListener('mousedown', (e) => {
    if (!isRendered) return
    gIsMoving = true
    drawRect()
    document.body.style.cursor = 'grabbing'
  })

  gCanvas.addEventListener('mouseup', (e) => {
    if (!isRendered) return
    gIsMoving = false
    drawRect()
    document.body.style.cursor = 'auto'
  })

  gCanvas.addEventListener('mousemove', (e) => {
    if (!isRendered) return
    if (!gIsMoving) return
    const meme = getMeme()
    const { offsetX, offsetY } = e

    meme.lines[meme.selectedLineIdx].pos.x = offsetX
    meme.lines[meme.selectedLineIdx].pos.y = offsetY
    renderMeme()
    // console.log('offsetX, offsetY:', offsetX, offsetY)
  })

  // ! Mobile not working
  // gCanvas.addEventListener('touchstart', (e) => {
  //   e.preventDefault()
  //   gIsMoving = true
  // })
  // gCanvas.addEventListener('touchend', (e) => {
  //   e.preventDefault()
  //   gIsMoving = false
  // })
  // gCanvas.addEventListener('touchmove', (e) => {
  //   e.preventDefault()
  //   if (!isRendered) return
  //   if (!gIsMoving) return
  //   const meme = getMeme()
  //   const { offsetX, offsetY } = e

  //   meme.lines[meme.selectedLineIdx].pos.x = offsetX
  //   meme.lines[meme.selectedLineIdx].pos.y = offsetY

  //   renderMeme()
  //   console.log('offsetX, offsetY:', offsetX, offsetY)
  // })
}

function drawRect() {
  const meme = getMeme()
  let lineIdx = meme.selectedLineIdx
  let y = meme.lines[lineIdx].pos.y
  let ySize = meme.lines[lineIdx].size
  gCtx.strokeStyle = 'black'
  gCtx.strokeRect(0, y - ySize / 2, gCanvas.width, ySize)
}

function drawRectAfterSeconds(sec) {
  setTimeout(() => {
    drawRect()
  }, sec)
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
  drawRectAfterSeconds(1)
}

function moveVertical(value) {
  if (!isRendered) return
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].pos.y += value
  renderMeme()
  drawRectAfterSeconds(1)
}

function moveHorizontal(value) {
  if (!isRendered) return
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].pos.x += value
  renderMeme()
  drawRectAfterSeconds(1)
}

function changeSize(value) {
  if (!isRendered) return
  const meme = getMeme()
  meme.lines[meme.selectedLineIdx].size += value
  renderMeme()
  drawRectAfterSeconds(1)
}

function onAddLine() {
  if (!isRendered) return
  createLine()
  renderMeme()
  drawRectAfterSeconds(1)
  updateInputLine()
}

function updateInputLine() {
  const elInput = document.getElementById('text-input-editor')
  const currentMeme = getMeme()

  // TODO: If "New Line" put Place Holder
  let lineValue = currentMeme.lines[currentMeme.selectedLineIdx].txt

  elInput.value = lineValue
}

function onDeleteLine() {
  if (!isRendered) return
  deleteLine()
  renderMeme()
  drawRectAfterSeconds(1)
  updateInputLine()
}

//? Resolved: ! Not working, Github Cross Origin not allowed
// ! KNOWN ISSUE: After first download, you need to download it twice to get an updated image
function downloadMeme(elLink) {
  if (!isRendered) return
  renderMeme()

  //? SetTimeout is here because we need to wait for 'renderMeme()' function to finish, to prevent rect to be print.
  setTimeout(() => {
    const data = gCanvas.toDataURL()
    elLink.href = data
    console.log(data)
  }, 1)

  // ! Until Issue is find, this is a temporary solution
  // setTimeout(() => {
  //   window.location.reload()
  // }, 8000)
}

//! KNOWN ISSUE: Rect is printed, renderMeme() have no time to finish
//? DONE: Use the new Web Share API to share your meme
async function shareMeme() {
  if (!isRendered) return
  renderMeme()

  const data = gCanvas.toDataURL()
  const blob = await (await fetch(data)).blob()
  const filesArray = [
    new File([blob], 'My Picasso.png', {
      title: 'My Picasso',
      copyright: 'Sidney Sebban',
      url: 'https://github.com/Darkfall48/Sprint-2-Meme-Generator',
      type: blob.type,
      lastModified: new Date().getTime(),
    }),
  ]
  const shareData = {
    files: filesArray,
  }

  try {
    await navigator.share(shareData)
    console.warn('MDN shared successfully')
  } catch (err) {
    console.error(`Error: ${err}`)
  }
}
