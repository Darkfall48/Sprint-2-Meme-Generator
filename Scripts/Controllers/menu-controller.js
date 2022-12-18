'use strict'

function onShowGallery() {
  const elGallery = document.querySelector('.gallery-section')
  const elEditor = document.querySelector('.meme-section')
  const elAbout = document.querySelector('.about-section')

  elGallery.classList.remove('hide')

  elEditor.classList.add('hide')
  elAbout.classList.add('hide')

  // Reset Filter
  gFilterBy = { keyword: '' }
  renderGallery()
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
  const elAbout = document.querySelector('.about-section')

  elEditor.classList.remove('hide')

  elGallery.classList.add('hide')
  elAbout.classList.add('hide')
}

function onDisplayAbout() {
  const elAbout = document.querySelector('.about-section')
  const elEditor = document.querySelector('.meme-section')
  const elGallery = document.querySelector('.gallery-section')

  elAbout.classList.remove('hide')

  elGallery.classList.add('hide')
  elEditor.classList.add('hide')
}

function onTranslation(lang) {
  // console.log(lang)
  setLang(lang)
  doTrans()
}
