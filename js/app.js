const currentLanguage = document.querySelector("header .selected-language img");

const languages = document.querySelectorAll("header .language-list a");





languages.forEach(lang => {
  lang.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentLanguage.src !== lang.children[0].src) {
      currentLanguage.src = lang.children[0].src;
    }
  });
});

