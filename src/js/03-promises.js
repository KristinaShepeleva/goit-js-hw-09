import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  
  let delay = Number(formRef.delay.value);
  let amount = Number(formRef.amount.value);
  let step = Number(formRef.step.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
       .then(({ position, delay }) => {
         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
       })
       .catch(({ position, delay }) => {
         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
       });
     delay += step;
  }
}

function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(obj);
      } else {
        // Reject
        reject(obj);
      }
    }, delay);
  });
}