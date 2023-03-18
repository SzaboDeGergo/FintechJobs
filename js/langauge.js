// get the user's preferred language, or default to Hungarian
var language = window.navigator.language || 'hu';

// check if the user has selected a different language previously
var storedLanguage = localStorage.getItem('language');
if (storedLanguage) {
    language = storedLanguage;
}

// switch the language by loading the appropriate HTML file
function switchLanguage(lang) {
    // store the language preference in local storage
    localStorage.setItem('language', lang);

    // load the appropriate HTML file for the selected language
    var url = lang + '/' + window.location.pathname.split('/').pop();
    window.location.href = url;
}

// update the language button styles based on the current language
function updateLanguageButtons() {
    var buttons = document.getElementsByClassName('language-btn');
    for (var i = 0; i < buttons.length; i++) {
        var btnLang = buttons[i].getAttribute('data-lang');
        if (btnLang === language) {
            buttons[i].classList.add('active');
        } else {
            buttons[i].classList.remove('active');
        }
    }
}

// initialize the language buttons and switcher
function initLanguage() {
    // add click handlers to the language buttons
    var buttons = document.getElementsByClassName('language-btn');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            var lang = this.getAttribute('data-lang');
            switchLanguage(lang);
        });
    }

    // update the language button styles based on the current language
    updateLanguageButtons();
}

// run the language initialization code when the page loads
window.addEventListener('load', initLanguage);
