// Default language code
var defaultLang = 'hu';

// Get the menu and description elements
var title = document.getElementById('title');
var description = document.getElementById('description');
var welcomeMessage = document.getElementById('welcome-message');

// Get the language links
var links = document.querySelectorAll('nav a');

// Set up event listeners for the links
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (event) {
        event.preventDefault();
        var lang = this.id;
        loadLanguage(lang);
    });
}

// Load the default language
loadLanguage(defaultLang);

// Load the language file for the given language code
function loadLanguage(lang) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Define the callback function
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Parse the JSON string into a JavaScript object
            var langObj = JSON.parse(xhr.responseText);
            setLanguage(lang, langObj);
        }
    };

    // Define the URL for the language file
    var url = getLangUrl(lang);

    // Send the HTTP request
    xhr.open('GET', url, true);
    xhr.send();
}

// Set the language for the menu and description
function setLanguage(lang, langObj) {
    title.innerHTML = langObj.title;
    description.innerHTML = langObj.description;
    welcomeMessage.innerHTML = langObj.welcomeMessage;
    randomText.innerHTML = langObj.randomText;
}

// Get the URL for the given language code
function getLangUrl(lang) {
    return 'lang/' + lang + '.json';
}
