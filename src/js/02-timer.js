import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


//add refs
const ref = {
  myInput: document.querySelector("#datetime-picker"),
  submitBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  timer: document.querySelector('.timer'),
 };

let intervalId;

ref.submitBtn.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
    const selectDateMS = selectedDates[0].getTime();
    console.log(selectDateMS);

    const ms = selectDateMS - Date.now();
    console.log(ms);
    
    if (selectDateMS < Date.now()) {
      ref.submitBtn.disabled = true;
      return Notify.failure('Please choose a date in the future');
    }
    
    if (selectDateMS >  Date.now()) {
         ref.submitBtn.disabled = false;
    }
    
    ref.submitBtn.addEventListener('click', onStartBtnClick);

    function onStartBtnClick(e) {
      e.preventDefault()

      intervalId = setInterval(() => calculateData()
  , 1000);  
    }
    
    
    function calculateData() {
      const ms = selectDateMS - Date.now();
      if (ms > 0) {
      console.log(ms);
      convertMs(ms);

      ref.days.textContent = addLeadingZero(convertMs(ms).days);
      ref.hours.textContent = addLeadingZero(convertMs(ms).hours);
      ref.minutes.textContent = addLeadingZero(convertMs(ms).minutes);
      ref.seconds.textContent = addLeadingZero(convertMs(ms).seconds);
      }
      
      if (ms <= 1000) {
        stop();
      }
    }  
  },
};

function stop() {
   clearInterval(intervalId);
}
   

const fp = flatpickr(ref.myInput, options);

