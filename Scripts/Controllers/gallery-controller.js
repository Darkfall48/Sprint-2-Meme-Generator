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
      imagesHTMLs += `<img data-id="${id}" src="${url}" onclick="onImageClicked('${id}')" alt="${
        idx + 1
      }"/>`
    })
    .join('')

  elGalContainer.innerHTML = imagesHTMLs
}

function onImageClicked(imageId) {
  imageClicked(imageId)
}
