const hutImgs = document.querySelectorAll(".hut-imgs");
const hutInfos = document.querySelectorAll(".hut-info");

hutImgs.forEach((hutImg) => {

  // SLIDER
  const previousBtn = hutImg.querySelector('.previous');
  const nextBtn = hutImg.querySelector('.next');

  // Setting the default slide start index

  let slideIndex = 1;

  // Calling the function that is implemented below
  showSlides(slideIndex);

  // Increase the index by 1 - show next slide:
  function nextSlide() {
    if (slideIndex === 5) {
      return
    }
    showSlides(slideIndex += 1);
  }

  // Decrease the index by 1 - show the previous slide:
  function previousSlide() {
    if (slideIndex === 1) {
      return
    }
    showSlides(slideIndex -= 1);
  }

  //Flip function:
  function showSlides(n) {

    let slides = hutImg.getElementsByClassName("slider__item");
    let progressItems = hutImg.getElementsByClassName("slider-progress__item--hut");

    // Cheking the number of slides:
    if (n === slides.length) {
      hutImg.querySelector('.next img').src = "./img/hut/slider/arrow-right-disabled.svg";
    } else {
      hutImg.querySelector('.next img').src = "./img/hut/slider/arrow-right.svg";
    }

    if (n === 1) {
      hutImg.querySelector('.previous img').src = "./img/hut/slider/arrow-left-disabled.svg";
    } else {
      hutImg.querySelector('.previous img').src = "./img/hut/slider/arrow-left.svg";
    }

    if (n > 1 && n < slides.length) {

    }

    //Loop through each slide in a for loop
    for (let slide of slides) {
      slide.style.display = 'none';
    }
    for (let progressItem of progressItems) {
      progressItem.style.opacity = 0;
    }

    // Making an element block: 

    slides[slideIndex - 1].style.display = "block";
    progressItems[slideIndex - 1].style.opacity = 1;
  }

  previousBtn.addEventListener('click', previousSlide);
  nextBtn.addEventListener('click', nextSlide);
});

/* Link text change */
hutInfos.forEach(hutInfo => {
  const infoLinks = hutInfo.querySelectorAll(".generic-content__link");
  const infoTexts = hutInfo.querySelectorAll(".generic-content__text");

  infoLinks.forEach((infoLink, idx) => {
    infoLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (infoLink.classList.contains("active")) {
        return;
      } else {
        addInvisibleClass(infoTexts);
        clearActiveClass(infoLinks);
        infoLink.classList.add("active");
        infoTexts[idx].classList.remove("invisible");
      }
    });

    function clearActiveClass(arr) {
      arr.forEach(item => {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
        }
      });
    }

    function addInvisibleClass(arr) {
      arr.forEach(item => {
        if (!item.classList.contains("invisible")) {
          item.classList.add("invisible");
        }
      });
    }
  });

});