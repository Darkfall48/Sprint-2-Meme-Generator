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

function onUploadImg(ev) {
  const reader = new FileReader()
  reader.onload = (event) => {
    let img = new Image()
    img.src = event.target.result
    img.onload = () => createImageFromUser(img.src)
  }
  reader.readAsDataURL(ev.target.files[0])
}
