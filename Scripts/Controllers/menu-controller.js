'use strict'

function onShowGallery() {
  const elEditor = document.querySelector('.meme-section')
  const elGallery = document.querySelector('.gallery-section')
  elEditor.classList.add('hide')
  elGallery.classList.remove('hide')
}

function onShowOptions() {
  const elGallery = document.querySelector('.main-nav-gallery-list')
  const elMemes = document.querySelector('.main-nav-memes-list')
  const elAbout = document.querySelector('.main-nav-about-list')
  const elLangs = document.querySelector('.dropdown-langs')

  elGallery.classList.toggle('hide')
  elMemes.classList.toggle('hide')
  elAbout.classList.toggle('hide')
  elLangs.classList.toggle('hide')
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
