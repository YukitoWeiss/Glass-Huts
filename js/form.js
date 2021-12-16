const currentLanguagePhone = document.querySelector("form .selected-language img");
const languagesPhone = document.querySelectorAll("form .language-list a");
const cardChoiceSelect = document.getElementById("card-choice");
const cardChoiceLabel = document.querySelector(".payment-label");
const agreementBtn = document.querySelector(".agreement img");
const submitBtn = document.getElementById("btn-submit");


languagesPhone.forEach(lang => {
  lang.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentLanguagePhone.src !== lang.children[0].src) {
      currentLanguagePhone.src = lang.children[0].src;
    }
  });
});

/* Remove label from select element after selected option */
cardChoiceSelect.addEventListener('click', () => {
  if (cardChoiceSelect.value) {
    cardChoiceLabel.style.display = "none";
  }
});

agreementBtn.addEventListener("click", () => {
  changeAddSrc(agreementBtn)
});

function changeAddSrc(img) {
  if (img.src.indexOf('plus') === -1) {
    img.src = "./img/booking/plus.svg";
  } else {
    img.src = "./img/booking/checked.svg";
  }
}

submitBtn.addEventListener("click", () => {
  if (agreementBtn.src.indexOf('checked') > -1) {
    alert('Thank you for choosing us. We wish you comfy rest.')
  } else {
    alert('Please, check "Terms & Conditions button" before submit.')
  }
})