(function () {
  "use strict";

  const storageKey = "abnCodeLanguage";
  // Translations live in i18n/en.json and i18n/ar.json. js/translations.js is generated from them
  // (node scripts/i18n.mjs build) and must load before this file.
  const translations = window.PORTFOLIO_TRANSLATIONS || { en: {}, ar: {} };

  let currentLanguage = "en";

  function translate(key) {
    const languageTranslations = translations[currentLanguage];
    if (!Object.prototype.hasOwnProperty.call(languageTranslations, key)) {
      console.error("Missing " + currentLanguage + " translation for: " + key);
      return key;
    }
    return languageTranslations[key];
  }

  function applyLanguage(language) {
    currentLanguage = language === "ar" ? "ar" : "en";
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const key = element.getAttribute("data-i18n");
      const value = translate(key);
      const attributes = element.getAttribute("data-i18n-attr");

      if (attributes) {
        attributes.split(",").forEach(function (attribute) {
          const attributeName = attribute.trim();
          const attributeKey = element.getAttribute("data-i18n-" + attributeName);
          element.setAttribute(attributeName, attributeKey ? translate(attributeKey) : value);
        });
      }
      if (!attributes || element.hasAttribute("data-i18n-text")) {
        element.textContent = value;
      }
    });

    const languageButton = document.getElementById("languageToggle");
    if (languageButton) {
      languageButton.setAttribute(
        "aria-label",
        translate(currentLanguage === "en" ? "language.switchToArabic" : "language.switchToEnglish")
      );
      languageButton.querySelector("span").textContent = translate(
        currentLanguage === "en" ? "language.buttonArabic" : "language.buttonEnglish"
      );
    }

    document.querySelectorAll(".social-links a[data-placement]").forEach(function (link) {
      link.setAttribute("data-placement", currentLanguage === "ar" ? "right" : "left");
    });

    document.dispatchEvent(new CustomEvent("portfolio:languagechange", {
      detail: { language: currentLanguage }
    }));
  }

  function readSavedLanguage() {
    try {
      const savedLanguage = window.localStorage.getItem(storageKey);
      return savedLanguage === "ar" || savedLanguage === "en" ? savedLanguage : "en";
    } catch (error) {
      console.warn("Unable to read the saved language preference.", error);
      return "en";
    }
  }

  function saveLanguage(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {
      console.warn("Unable to save the language preference.", error);
    }
  }

  window.portfolioLanguage = {
    translate: translate,
    getCurrentLanguage: function () {
      return currentLanguage;
    }
  };

  if (window.PORTFOLIO_TRANSLATIONS) {
    applyLanguage(readSavedLanguage());
  } else {
    // translations.js failed to load: leave the English text already in the HTML untouched
    console.error("js/translations.js did not load; language switching is disabled.");
  }

  const languageButton = document.getElementById("languageToggle");
  if (languageButton) {
    languageButton.addEventListener("click", function () {
      const nextLanguage = currentLanguage === "en" ? "ar" : "en";
      applyLanguage(nextLanguage);
      saveLanguage(nextLanguage);
    });
  }
})();
