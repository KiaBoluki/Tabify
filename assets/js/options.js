const greetingInput = document.getElementById("greeting");
const greetingMessage = localStorage.getItem("tabify-greeting-message") ?? "hello"; 

const loadGreeting = () => {
  return localStorage.getItem("tabify-greeting-message"); 
}

greetingInput.addEventListener('blur', (event) => {
  const value = event.target.value; 
  if ( value ){
    localStorage.setItem("tabify-greeting-message", value);
  }
})

const loadOptions = () => {
   greetingInput.value = loadGreeting(); 
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadOptions(); 
})
