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

function onShowGallery() {
  const elEditor = document.querySelector('.meme-section')
  const elGallery = document.querySelector('.gallery-section')
  elEditor.classList.add('hide')
  elGallery.classList.remove('hide')
}
