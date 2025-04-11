const greetingMessageInput = document.getElementById("greeting-message-input");
const greetingMessage = localStorage.getItem("greeting-message") ?? "hello";
const greetingMessageSwitchEl = document.getElementById(
  "greeting-message-switch"
);
const wiseQouteSwitchEl = document.getElementById("wise-qoute-switch");

const loadGreeting = () => {
  return localStorage.getItem("greeting-message");
};

const saveGreeting = debounce((value) => {
  value = value.trim();
  value = value.length > 16 ? value.substring(0, 16) : value;
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
  greetingMessageSwitchEl.checked = JSON.parse(
    localStorage.getItem("show-greeting-message")
  );
  wiseQouteSwitchEl.checked = JSON.parse(
    localStorage.getItem("show-wise-qoute")
  );
};

document.addEventListener("DOMContentLoaded", () => {
  loadOptions();
});

const isValidate = (value) => {
  return value !== undefined && value !== null;
};

greetingMessageSwitchEl.addEventListener("change", (event) => {
  console.log(event.target.checked);
  // Enable the input if the switch is checked, otherwise disable it
  greetingMessageInput.disabled = !event.target.checked;
  localStorage.setItem("show-greeting-message", event.target.checked);
});
wiseQouteSwitchEl.addEventListener("change", (event) => {
  console.log(event.target.checked);
  localStorage.setItem("show-wise-qoute", event.target.checked);
});
