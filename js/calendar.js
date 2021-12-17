const calendarDatesBtns = document.querySelectorAll(".date-calendar-btn");
const modal = document.getElementById("calendar-modal");
const closeBtn = document.getElementsByClassName("close-btn")[0];
const calendarCloseBtn = document.getElementsByClassName("calendar-btn--close")[0];
const clearDatesBtn = document.getElementsByClassName("calendar-btn--clear")[0];
const nights = document.querySelector(".nights")

const dateFrom = document.getElementsByClassName("date-from")[0];
const dateTo = document.getElementsByClassName("date-to")[0];
const calendarDateFrom = document.getElementById("check-in");
const calendarDateTo = document.getElementById("check-out");
const calendarInputBtn = document.querySelector(".calendar-input .btn");


let nightsNum = 1;



/* Event listeners */
calendarDatesBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modal.style.display = "block";
  })
})

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  /* Если это не модал-контент, то закрываем */
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

calendarCloseBtn.addEventListener("click", () => {
  modal.style.display = "none";
})

/* CALENDAR */
const date = new Date();
const dateNext = new Date(date.getFullYear(), date.getMonth() + 1, 1);
let idxRangeNights;

function renderCalendar() {
  const weekDaysIdx = [6, 0, 1, 2, 3, 4, 5];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  date.setDate(1);

  const month = date.getMonth();
  const monthDaysCurrent = document.querySelector("#current-month .days");
  const monthDaysNext = document.querySelector("#next-month .days");
  const firstDayIdxCurrent = weekDaysIdx[date.getDay()];
  const firstDayIdxNext = weekDaysIdx[dateNext.getDay()];

  const currentMonthLastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const nextMonthLastDay = new Date(
    dateNext.getFullYear(),
    dateNext.getMonth() + 1,
    0
  ).getDate();

  /* Отображение количества дней */
  let daysCurrent = "";
  let daysNext = "";

  /* Правильное позиционирование первого числа месяца под днем */
  for (let x = firstDayIdxCurrent; x > 0; x--) {
    daysCurrent += `<div></div>`;
  }

  for (let y = firstDayIdxNext; y > 0; y--) {
    daysNext += `<div></div>`
  }

  for (let i = 1; i <= currentMonthLastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getFullYear() === new Date().getFullYear() &&
      date.getMonth() === new Date().getMonth()
    ) {
      daysCurrent += `<div class="day today">${i}</div>`;
      dateFrom.innerHTML = `${new Date().getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      dateTo.innerHTML = `${new Date().getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`
    } else if (
      i < new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    ) {
      daysCurrent += `<div class="strike">${i}</div>`;
    } else {
      daysCurrent += `<div class="day">${i}</div>`;
    }
  }
  monthDaysCurrent.innerHTML = daysCurrent;

  for (let j = 1; j <= nextMonthLastDay; j++) {
    daysNext += `<div class="day">${j}</div>`;
  }
  monthDaysNext.innerHTML = daysNext;

  /* Отображение названия месяца в заголовке */
  document.querySelector("#current-month h2").innerHTML = `${months[monthRepeat(month)]} ${date.getFullYear()}`;

  document.querySelector("#next-month h2").innerHTML = `${months[monthRepeat(month + 1)]} ${dateNext.getFullYear()}`;

  function monthRepeat(idx) {
    if (idx > 11) {
      return (idx = 0);
    } else {
      return idx;
    }
  }

  const days = document.querySelectorAll(".day");
  const idxRange = [];


  /* Event listeners */
  days.forEach((day, idx) => {
    day.addEventListener("click", (e) => {
      /* Удаляет псевдоклассы по бокам крайних дат если по ним кликают */
      if (idxRange.length === 2 && e.target.classList.contains("day--active")) {
        for (let i = 0; i < days.length; i++) {
          days[i].classList.remove("day--range");
          days[idxRange[0]].classList.remove("day--active-start");
          days[idxRange[1]].classList.remove("day--active-finish");
        }
        nightsNum = 1;
        calcSumAdd();
      }

      if (idxRange.length < 2) {
        if (day.classList.contains("day--active")) {
          day.classList.remove("day--active");
          idxRange.splice(idxRange.indexOf(idx), 1);
          nightsNum = 1;
          calcSumAdd();

        } else {
          day.classList.add("day--active");
          /* console.log(day.textContent) */
          /*           console.log(days[idx].parentElement.parentElement.id) */
          idxRange.push(idx);
          idxRange.sort((a, b) => a - b);
        }
      } else if (day.classList.contains("day--active")) {
        day.classList.remove("day--active");
        idxRange.splice(idxRange.indexOf(idx), 1);
        /* idxRange.sort((a, b) => a - b); */
      } else {
        return;
      }

      /* Добавляет фон дням между крайними датами */
      if (idxRange.length === 2) {
        for (let i = idxRange[0] + 1; i < idxRange[1]; i++) {
          days[i].classList.add("day--range");
        }
        days[idxRange[0]].classList.add("day--active-start");
        days[idxRange[1]].classList.add("day--active-finish");

        /* Input values refresh */
        if (days[idxRange[0]].parentElement.parentElement.id === 'current-month') {
          calendarDateFrom.value = `${days[idxRange[0]].textContent}/${date.getMonth() + 1}/${date.getFullYear()}`;
          /*     dateFrom.innerHTML = `${days[idxRange[0]].textContent}/${date.getMonth() + 1}/${date.getFullYear()}`; */
        } else {
          calendarDateFrom.value = `${days[idxRange[0]].textContent}/${dateNext.getMonth() + 1}/${dateNext.getFullYear()}`;
          /* dateFrom.innerHTML = `${days[idxRange[0]].textContent}/${dateNext.getMonth() + 1}/${dateNext.getFullYear()}`; */
        }

        if (days[idxRange[1]].parentElement.parentElement.id === 'current-month') {
          calendarDateTo.value = `${days[idxRange[1]].textContent}/${date.getMonth() + 1}/${date.getFullYear()}`;
          /*      dateTo.innerHTML = `${days[idxRange[1]].textContent}/${date.getMonth() + 1}/${date.getFullYear()}`; */
        } else {
          calendarDateTo.value = `${days[idxRange[1]].textContent}/${dateNext.getMonth() + 1}/${dateNext.getFullYear()}`;
          /*        dateTo.innerHTML = `${days[idxRange[1]].textContent}/${dateNext.getMonth() + 1}/${dateNext.getFullYear()}`; */
        }

        nightsNum = idxRange[1] - idxRange[0] || 1;
        nights.innerHTML = `${nightsNum}`;
        calcSumAdd();
      } else {
        calendarDateTo.value = '';
        calendarDateFrom.value = '';
        dateFrom.innerHTML = `${new Date().getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        dateTo.innerHTML = `${new Date().getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`
        nightsNum = 1;
        calcSumAdd();
      }


    });
  });

  /* Clear Dates button */
  clearDatesBtn.addEventListener("click", () => {

    if (idxRange.length === 2) {

      for (let i = idxRange[0]; i < idxRange[1]; i++) {
        days[i].classList.remove("day--range");
      }

      if (days[idxRange[0]].classList.contains("today")) {
        days[idxRange[0]].className = "day today";
        days[idxRange[1]].className = "day";
        idxRange.length = 0
      } else {
        days[idxRange[0]].className = "day";
        days[idxRange[1]].className = "day";
        idxRange.length = 0
      }
      dateFrom.innerHTML = `${new Date().getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      dateTo.innerHTML = `${new Date().getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`
      nightsNum = 1;
      calcSumAdd();
    } else if (idxRange.length === 1) {

      if (days[idxRange[0]].classList.contains("today")) {
        days[idxRange[0]].className = "day today";
        idxRange.length = 0
      } else {
        days[idxRange[0]].className = "day";
        idxRange.length = 0
      }
      nightsNum = 1;
      calcSumAdd();
    }
    nights.innerHTML = `${nightsNum}`;
    calendarDateTo.value = '';
    calendarDateFrom.value = '';
  });

  /* Input event listeners */

  calendarDateTo.addEventListener('change', () => {
    if (calendarDateFrom.value) {
      alert("Yeah, this function is not working, sorry")
      calendarDateFrom.value = '';
      calendarDateTo.value = '';
    }
  });

  /* Button BOOK */
  calendarInputBtn.addEventListener('click', () => {
    if (calendarDateFrom.value) {
      dateFrom.innerHTML = `${calendarDateFrom.value}`;
      dateTo.innerHTML = `${calendarDateTo.value}`;
      modal.style.display = 'none';
    } else {
      alert('Please choose dates');
    }
  });

  idxRangeNights = idxRange;
  return idxRangeNights;
}

const arrowBack = document.querySelector(".back-icon img");
const arrowNext = document.querySelector(".next-icon img");

/* Calendar event listener */
arrowBack.addEventListener("click", () => {
  if (date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
    return;
  } else {
    date.setMonth(date.getMonth() - 1);
    dateNext.setMonth(dateNext.getMonth() - 1);
    if (date.getMonth() === new Date().getMonth()) {
      arrowBack.src = "./img/booking/calendar/calendar-arrow-left-disabled.svg"
    }
    renderCalendar();
  }
});

arrowNext.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  dateNext.setMonth(dateNext.getMonth() + 1);
  arrowBack.src = "./img/booking/calendar/calendar-arrow-left.svg"
  renderCalendar();
});



renderCalendar();
