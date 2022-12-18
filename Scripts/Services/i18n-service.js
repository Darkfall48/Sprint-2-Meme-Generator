'use strict'

var gCurrentLanguage = 'fr'
var gTrans = {
  title: {
    en: 'Meme Generator - By Sidney Sebban',
    fr: 'Générateur de memes - Par Sidney Sebban',
    he: 'מחולל הממים - מאת סידני סבן',
  },
  'lang-en': {
    en: 'English',
    fr: 'Anglais',
    he: 'אנגלית',
  },
  'lang-fr': {
    en: 'French',
    fr: 'Français',
    he: 'צרפתית',
  },
  'lang-he': {
    en: 'Hebrew',
    fr: 'Hébreu',
    he: 'עברית',
  },
  'main-nav-gallery': {
    en: 'Gallery',
    fr: 'Gallerie',
    he: 'גלריה',
  },
  'main-nav-memes': {
    en: 'Memes',
    fr: 'Memes',
    he: 'ממים',
  },
  'main-nav-about': {
    en: 'About',
    fr: 'À Propos',
    he: 'אודות',
  },
  'keyword-button': {
    en: 'More',
    fr: 'Plus',
    he: 'עוד',
  },
  'save-button': {
    en: 'Save',
    fr: 'Sauvegarder',
    he: 'שמור',
  },
  'publish-button': {
    en: 'Upload',
    fr: 'Téléverser',
    he: 'העלה',
  },
  'share-button': {
    en: 'Share',
    fr: 'Partager',
    he: 'שתף',
  },
  'job-title-about-section': {
    en: 'Full Stack Developer',
    fr: 'Développeur Full Stack',
    he: 'מפתח Full Stack',
  },
  'description-about-section': {
    en: `Since my childhood, I have always been passionate about new
    technologies. I started with website and video game development as
    well as arduino and robotics projects.

    I also managed a youtube channel until 2018.

    Thanks to my 3 years in the army, I was able to deepen my
    knowledge and to put it into practice. I also had the opportunity
    to learn how to work in a team and how to lead people.

    After finishing the army in 2021, I decided to undertake a
    professional training in Computer Engineering.

    And now I am learning Full Stack Development.`,
    fr: `Depuis mon enfance, j'ai toujours été passionné par les nouvelles technologies. J'ai commencé par le développement de sites web et de jeux vidéo ainsi que par des projets arduino et robotiques.
    
    J'ai également géré une chaîne YouTube jusqu'en 2018.
 
    Grâce à mes 3 années passées dans l'armée, j'ai pu approfondir mes
    connaissances et les mettre en pratique. J'ai également eu l'occasion
    d'apprendre à travailler en équipe et à diriger des personnes.

    Après avoir terminé l'armée en 2021, j'ai décidé d'entreprendre une formation professionnelle en ingénierie informatique.

    Et maintenant j'apprends à être un développeur Full Stack.`,
    he: `מאז ילדותי, תמיד התלהבתי מטכנולוגיות חדשות.
     התחלתי בפיתוח אתרים ומשחקי וידאו וכן פרויקטים של ארדואינו ורובוטיקה.
    
    ניהלתי גם ערוץ יוטיוב עד 2018.

    בזכות 3 שנות שהיתי בצבא, הצלחתי להעמיק את שלי
    ידע וליישם אותו בפועל. גם לי הייתה ההזדמנות
    ללמוד לעבוד בצוות ולהוביל אנשים.

    לאחר שסיימתי את הצבא בשנת 2021, החלטתי לעבור הכשרה מקצועית בהנדסת מחשבים.

    ועכשיו אני לומד להיות מפתח Full Stack.`,
  },
}

function setLang(lang) {
  gCurrentLanguage = lang
  lang === 'he'
    ? document.body.classList.add('rtl')
    : document.body.classList.remove('rtl')
  console.log('Current language:', gCurrentLanguage)
}

function doTrans() {
  const els = document.querySelectorAll('[data-trans]')
  // console.log(els)
  els.forEach((el) => {
    const transKey = el.dataset.trans
    const translation = getTrans(transKey)
    el.innerText = translation
  })
}

function getTrans(transKey) {
  const key = gTrans[transKey]
  //   console.log(key)
  if (!key) return 'UNKNOWN'
  var translation = key[gCurrentLanguage]
  if (!translation) translation = key.en
  return translation
}

function formatCurrency(num) {
  return new Intl.NumberFormat(gCurrentLanguage, {
    style: 'currency',
    currency: 'USD',
  }).format(num)
}
