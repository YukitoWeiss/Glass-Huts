const guestsNum = document.querySelectorAll(".date-guests");
const minusBtns = document.querySelectorAll(".minus");
const plusBtns = document.querySelectorAll(".plus");
const totalPrice = document.querySelector(".total-price");

const couponVal = document.getElementById('coupon-code');
const couponBtn = document.getElementById('coupon-btn');

let initialGuestsNum = 1;



calcSumAdd();
/* Event listeners */
plusBtns.forEach(btn => {
  btn.addEventListener('click', function () {

    initialGuestsNum++;

    changeAttribute();

    guestsNum.forEach(guestNum => {
      guestNum.innerHTML = `${initialGuestsNum}`;
    })

    calcSumAdd();

  });
})

minusBtns.forEach(btn => {
  btn.addEventListener('click', function () {

    initialGuestsNum--;

    changeAttribute();

    guestsNum.forEach(guestNum => {
      guestNum.innerHTML = `${initialGuestsNum}`;
    })

    calcSumAdd();

  });
});


couponBtn.addEventListener("click", () => {
  if (!document.querySelector(".feature-item--discount")) {
    for (let i = 10; i < 102; i += 10) {
      if (couponVal.value == i) {
        features.insertAdjacentHTML("beforeend", `
          <div id = "${i}" class="feature-item feature-item--discount">
          <span class="feature-price">${i}% discount</span>
          <span class="feature-price">${i * -20}kr</span>
          </div>
          `);
        arrPrices.push(i * -20);

        calcSumAdd();
      }
    }
  }
});


/* FUNCTIONS */
function changeAttribute() {

  if (initialGuestsNum < 2) {
    minusBtns.forEach(btn => {
      btn.setAttribute('disabled', '')
    })
  } else {
    minusBtns.forEach(btn => {
      btn.removeAttribute('disabled', '');
    })
  }

  if (initialGuestsNum > 5) {
    plusBtns.forEach(btn => {
      btn.setAttribute('disabled', '')
    })
  } else {
    plusBtns.forEach(btn => {
      btn.removeAttribute('disabled', '');
    })
  }
}


