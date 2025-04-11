import { iconMappings } from "./iconMappings.js";

const greetingMessageInput = document.getElementById("greeting-message-input");
const greetingMessage = localStorage.getItem("greeting-message") ?? "hello";
const greetingMessageSwitchEl = document.getElementById(
  "greeting-message-switch"
);
const wiseQouteSwitchEl = document.getElementById("wise-qoute-switch");
const linksVisibilitySwitchEl = document.getElementById(
  "links-visibility-switch"
);
const linksEditorSection = document.getElementById("links-editor-section");
const linksContainer = document.getElementById("links-container");
const addLinkBtn = document.getElementById("add-link-btn");

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
  linksVisibilitySwitchEl.checked = JSON.parse(
    localStorage.getItem("show-links-section")
  );
};

document.addEventListener("DOMContentLoaded", () => {
  loadOptions();
  linksEditorSection.style.display = linksVisibilitySwitchEl.checked
    ? "block"
    : "none";
  loadLinks();
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
linksVisibilitySwitchEl.addEventListener("change", (event) => {
  console.log(event.target.checked);
  localStorage.setItem("show-links-section", event.target.checked);
  linksEditorSection.style.display = event.target.checked ? "block" : "none";
});

/**
 * Finds the appropriate FontAwesome icon class for a given URL.
 * @param {string} url - The URL to check.
 * @returns {string} - The FontAwesome icon class.
 */
const getIconClass = (url) => {
  const mapping = iconMappings.find((entry) => url.includes(entry.keyword));
  return mapping ? mapping.iconClass : "fas fa-link default-icon";
};

const loadLinks = () => {
  const links = JSON.parse(localStorage.getItem("links")) || [];
  linksContainer.innerHTML = "";
  links.forEach((link, index) => {
    const iconClass = getIconClass(link.url);
    const linkRow = document.createElement("div");
    linkRow.className = "input-group mb-2";
    linkRow.innerHTML = `
      <span class="input-group-text">
        <i class="${iconClass}"></i>
      </span>
      <input type="text" class="form-control link-url" placeholder="URL" value="${link.url}" />
      <input type="text" class="form-control link-name" placeholder="Name" value="${link.name}" />
      <button class="btn btn-danger remove-link-btn" data-index="${index}">
        <i class="fas fa-trash"></i>
      </button>
    `;
    linksContainer.appendChild(linkRow);
  });
  addLinkBtn.disabled = links.length >= 4;
};

const saveLinks = () => {
  const links = [];
  const linkRows = linksContainer.querySelectorAll(".input-group");
  linkRows.forEach((row) => {
    const url = row.querySelector(".link-url").value.trim();
    const name = row.querySelector(".link-name").value.trim();
    if (url && name) {
      links.push({ url, name });
    }
  });
  localStorage.setItem("links", JSON.stringify(links));
  addLinkBtn.disabled = links.length >= 4;
};

addLinkBtn.addEventListener("click", () => {
  const links = JSON.parse(localStorage.getItem("links")) || [];
  if (links.length < 4) {
    links.push({ url: "", name: "" });
    localStorage.setItem("links", JSON.stringify(links));
    loadLinks();
  }
});

linksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-link-btn")) {
    const index = event.target.dataset.index;
    const links = JSON.parse(localStorage.getItem("links")) || [];
    links.splice(index, 1);
    localStorage.setItem("links", JSON.stringify(links));
    loadLinks();
  }
});

// Update the input event listener to avoid reloading the links unnecessarily
linksContainer.addEventListener("input", (event) => {
  if (
    event.target.classList.contains("link-url") ||
    event.target.classList.contains("link-name")
  ) {
    saveLinks();
  }
});
