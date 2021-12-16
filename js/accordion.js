
/* ACCORDION FAQ */
const accodrionItems = document.querySelectorAll(".accordion__item");

/* ACCORDION BOOKING */
const accordionBookingItems = document.querySelectorAll(".accordion-booking__item");

const featureAddBtns = document.querySelectorAll(".feature-add");

const featureTexts = document.querySelectorAll(".feature-title .feature-text");
const featurePrices = document.querySelectorAll(".feature-title .feature-price");
const features = document.querySelector(".features");

const arrPrices = [3200];


/* Event listeners */
featureAddBtns.forEach((btn, idx) => {

  if (btn.src.indexOf('plus') === -1) {
    features.insertAdjacentHTML("beforeend", `
        <div id="${[idx]}" class="feature-item">
        <span class="feature-price">${featureTexts[idx].textContent}</span>
        <span class="feature-price">${featurePrices[idx].textContent}</span>
        </div>
        `);
    arrPrices.push(stringToNum(featurePrices[idx].textContent));
  }



  btn.addEventListener('click', (e) => {
    /* Останавливает клик на родителе, т.е. на шапке аккордеона, позволяя кликнуть только на кнопку */
    e.stopPropagation()

    changeAddSrc(btn);

    if (btn.src.indexOf('plus') === -1) {
      features.insertAdjacentHTML("beforeend", `
          <div id = "${idx}" class="feature-item">
          <span class="feature-price">${featureTexts[idx].textContent}</span>
          <span class="feature-price">${featurePrices[idx].textContent}</span>
          </div>
          `);
      arrPrices.push(stringToNum(featurePrices[idx].textContent));

      calcSumAdd();
      console.log(totalPrice.textContent);
    } else {
      document.getElementById(`${idx}`).remove();
      arrPrices.splice(arrPrices.indexOf(stringToNum(featurePrices[idx].textContent)), 1);

      calcSumAdd();
    }

  });
});

accodrionItems.forEach(item => {
  item.addEventListener('click', () => {
    if (item.classList.contains("active")) {
      removeActiveClass(accodrionItems);
    } else {
      removeActiveClass(accodrionItems);
      item.classList.toggle("active");
    }
  });
})

accordionBookingItems.forEach(item => {
  item.addEventListener('click', () => {
    if (item.classList.contains("active")) {
      removeActiveClass(accordionBookingItems);
    } else {
      removeActiveClass(accordionBookingItems);
      item.classList.toggle("active");
    }
  });
})


/* Callback functions */
function removeActiveClass(arr) {
  arr.forEach(item => {
    item.classList.remove("active");
  });
}

function changeAddSrc(img) {
  if (img.src.indexOf('plus') === -1) {
    img.src = "./img/booking/plus.svg";
  } else {
    img.src = "./img/booking/checked.svg";
  }
}

function numToString(num) {
  let number = num;
  let thousandsLength = Math.floor((number / 1000)).toString().length;
  let str = number.toString();

  if (str.length < 4) {
    return `${str}kr`
  } else if (str[0] === '-' && str.length < 5) {
    return `-${str.slice(1)}kr`
  } else if (str[0] === '-' && str.length < 8) {
    return `-${str.slice(1, thousandsLength)}.${str.slice(thousandsLength)}kr`
  }

  return `${str.slice(0, thousandsLength)}.${str.slice(thousandsLength)}kr`


};

function stringToNum(str) {
  let string = str;
  if (string[0] === "-" && string.length === 8) {
    console.log(+`-${string.slice(1, 2)}${string.slice(3, string.length - 2)}`)
    return +`-${string.slice(1, 2)}${string.slice(3, string.length - 2)}`
  } else if (string[0] === "-") {
    return +`-${string.slice(1, string.length - 2)}`
  } else if (string.length < 6) {
    return +`${string.slice(0, string.length - 2)}`
  }
  return +`${string.slice(0, string.length - 6)}${string.slice(string.length - 5, string.length - 2)}`
}



/* Считает цены в сумму из столбика цен Чекаута */
function priceSum(featurePrice) {

  let sum = 0;
  featurePrice.forEach(price => {
    sum += stringToNum(price.textContent)
  });

  totalPrice.innerHTML = `${numToString(sum)}`
}

/* Пересчитывает сумму когда добавляешь или убираешь фичур */
function calcSumAdd() {
  const featurePrice = document.querySelectorAll(".features .feature-price:nth-child(even)");

  featurePrice.forEach((item, idx) => {
    let fullPrice = arrPrices[idx] * nightsNum * initialGuestsNum;
    item.innerHTML = `${numToString(fullPrice)}`
  });

  priceSum(featurePrice);
}