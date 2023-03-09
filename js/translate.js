const languageButtons = document.querySelectorAll('[data-lang]');

// Set the default language
let currentLanguage = 'hu';

// Load the translations
const loadTranslations = async (lang) => {
  const response = await fetch(`translations/${lang}.json`);
  const data = await response.json();
  return data;
};

// Translate a single element
const translateElement = (element, translations) => {
  const key = element.dataset.translate;
  const translation = translations[key];
  if (translation) {
    element.textContent = translation;
  }
};

// Translate all elements with the "data-translate" attribute
const translatePage = (translations) => {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach((element) => translateElement(element, translations));
};

// Switch to a different language
const switchLanguage = async (lang) => {
  if (lang === currentLanguage) {
    return;
  }
  const translations = await loadTranslations(lang);
  translatePage(translations);
  currentLanguage = lang;
  setActiveLanguageButton(lang);
};

// Set the active state on the language button for the current language
const setActiveLanguageButton = (lang) => {
  // Remove the active class from all language buttons
  languageButtons.forEach((button) => {
    button.classList.remove('active');
  });
  // Find the button for the current language and add the active class
  const activeButton = document.querySelector(`[data-lang="${lang}"]`);
  activeButton.classList.add('active');
};

// Add click event listeners to the language buttons
languageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const lang = button.dataset.lang;
    switchLanguage(lang);
  });
});

// Load the translations for the default language
loadTranslations(currentLanguage).then((translations) => {
  translatePage(translations);
  setActiveLanguageButton(currentLanguage);
});