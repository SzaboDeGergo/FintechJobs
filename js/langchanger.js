// Function to set the language preference and redirect to the corresponding HTML file
function setLang(lang) {
    // Set a cookie with the selected language code
    document.cookie = "lang=" + lang + "; path=/";

    // Get the current page's filename
    var pageName = window.location.pathname.split("/").pop();

    // Define the language directory mappings
    var directoryMap = {
        "en": "",
        "hu": "/hu",
        "nl": "/nl"
    };

    // Get the directory for the selected language
    var directory = directoryMap[lang];

    // Redirect to the corresponding language HTML file for the current page
    setTimeout(function () {
        window.location.href = window.location.origin + directory + "/" + pageName;
    }, 10);
}

// Function to get the value of a cookie
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Function to detect the user's preferred language based on their operating system settings
function getPreferredLanguage() {
    var lang = navigator.language || navigator.userLanguage;

    // If the user's preferred language is one of the supported languages, return it
    if (lang.startsWith("en")) {
        return "en";
    } else if (lang.startsWith("hu")) {
        return "hu";
    } else if (lang.startsWith("nl")) {
        return "nl";
    }

    // Otherwise, return null
    return null;
}

// When the page loads, set the initial language based on the user's preference or the "lang" cookie
var lang = getPreferredLanguage() || getCookie("lang") || "en";
setLang(lang);

// When a language button is clicked, set the language preference and redirect to the corresponding HTML file
document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        var lang = this.getAttribute("data-lang");
        setLang(lang);
    });
});
