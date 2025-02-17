const greetingMessageInput = document.getElementById("greeting-message-input");
const greetingMessage = localStorage.getItem("greeting-message") ?? "hello";
const greetingMessageSwitchEl = document.getElementById("greeting-message-switch"); 

const loadGreeting = () => {
  return localStorage.getItem("greeting-message"); 
}

const saveGreeting = debounce((value) => {
  value = value.trim();
  if (isValidate(value)) {
    localStorage.setItem("greeting-message", value);
  }
}, 300);

greetingMessageInput.addEventListener("keyup", (event) => {
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
   greetingMessageInput.value = loadGreeting(); 
   greetingMessageSwitchEl.checked = JSON.parse(localStorage.getItem('show-greeting-message')); 
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadOptions(); 
})


const isValidate = (value) => {
 return value !== undefined && value !== null;
}

greetingMessageSwitchEl.addEventListener('change', (event)=>{
  console.log(event.target.checked);
  // Enable the input if the switch is checked, otherwise disable it
  greetingMessageInput.disabled = !event.target.checked;
  localStorage.setItem('show-greeting-message', event.target.checked)

})