'use strict'

function onShowGallery() {
  const elEditor = document.querySelector('.meme-section')
  const elGallery = document.querySelector('.gallery-section')
  elEditor.classList.add('hide')
  elGallery.classList.remove('hide')
}

function onDisplayEditor() {
  const elEditor = document.querySelector('.meme-section')
  const elGallery = document.querySelector('.gallery-section')
  elEditor.classList.remove('hide')
  elGallery.classList.add('hide')
}

function onTranslation(lang) {
  console.log(lang)
  setLang(lang)
  doTrans()
}
