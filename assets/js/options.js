const greetingInput = document.getElementById("greeting");
const greetingMessage = localStorage.getItem("tabify-greeting-message") ?? "hello"; 

const loadGreeting = () => {
  return localStorage.getItem("tabify-greeting-message"); 
}

const saveGreeting = debounce((value) => {
  value = value.trim();
  if (isValidate(value)) {
    localStorage.setItem("tabify-greeting-message", value);
  }
}, 300);

greetingInput.addEventListener("keyup", (event) => {
  saveGreeting(event.target.value);
});

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const loadOptions = () => {
   greetingInput.value = loadGreeting(); 
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadOptions(); 
})


const isValidate = (value) => {
 return value !== undefined && value !== null;
}