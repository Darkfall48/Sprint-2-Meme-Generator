'use strict'

function onInitGallery() {
  initGallery()
  renderGallery()
}

function renderGallery() {
  let images = getImages()
  let imagesHTMLs = ''
  const elGalContainer = document.querySelector('.gallery-container')

  images
    .map((image, idx) => {
      const { id, url } = image
      imagesHTMLs += `<img class="image" data-id="${id}" src="${url}" onclick="onImageClicked('${id}')" alt="${
        idx + 1
      }"/>`
    })
    .join('')

  elGalContainer.innerHTML = imagesHTMLs
}

function onImageClicked(imageId) {
  imageClicked(imageId)
}

function onUploadImg(image) {
  console.log(image)
  const path = extractFilename(image)
  console.log(doUploadImg(path))
}

function extractFilename(path) {
  if (path.substr(0, 12) == 'C:\\fakepath\\') return path.substr(12) // modern browser
  var x
  x = path.lastIndexOf('/')
  if (x >= 0)
    // Unix-based path
    return path.substr(x + 1)
  x = path.lastIndexOf('\\')
  if (x >= 0)
    // Windows-based path
    return path.substr(x + 1)
  return path // just the filename
}

function doUploadImg(imgDataUrl, onSuccess) {
  // Pack the image for delivery
  const formData = new FormData()
  formData.append('img', imgDataUrl)
  console.log('formData:', formData)
  // Send a post req with the image to the server
  fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
    .then((res) => res.text())
    .then((url) => {
      console.log('url:', url)
      onSuccess(url)
    })
}
