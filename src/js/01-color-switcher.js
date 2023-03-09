function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const DELAY = 1000;
let timeoutId = null;

const refs = {
  startBtnRef: document.querySelector('button[data-start]'),
  stopBtnRef: document.querySelector('button[data-stop]'),
  bodyRef: document.querySelector('body'),
};

refs.startBtnRef.addEventListener('click', onStartBtnClick);
refs.stopBtnRef.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  refs.bodyRef.style.backgroundColor = getRandomHexColor();
  timeoutId = setInterval(() => {
  refs.bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.startBtnRef.disabled = true;
};

function onStopBtnClick() {
  clearInterval(timeoutId);
  refs.startBtnRef.disabled = false;
};
