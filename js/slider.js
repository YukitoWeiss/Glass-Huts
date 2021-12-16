/* Setting the default slide start index */
let slideIndex = 1;

/* Calling the function that is implemented below */
showSlides(slideIndex);

/* Increase the index by 1 - show next slide: */
function nextSlide() {
  showSlides(slideIndex += 1);
}

/* Decrease the index by 1 - show the previous slide: */
function previousSlide() {
  showSlides(slideIndex -= 1);
}

/* Flip function: */
function showSlides(n) {

  let slides = document.getElementsByClassName("slider__item");
  let progressItems = document.getElementsByClassName("slider-progress__item");

  /* Cheking the number of slides: */
  if (n > slides.length) {
    slideIndex = 1;

  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  /* Loop through each slide in a for loop */
  for (let slide of slides) {
    slide.style.display = 'none';
  }
  for (let progressItem of progressItems) {
    progressItem.style.opacity = 0;
  }

  /* Making an element block: */

  slides[slideIndex - 1].style.display = "block";
  progressItems[slideIndex - 1].style.opacity = 1;
}

const previousBtn = document.querySelector('.previous'),
  nextBtn = document.querySelector('.next');

previousBtn.addEventListener('click', previousSlide);
nextBtn.addEventListener('click', nextSlide);
