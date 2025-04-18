import { iconMappings } from "./iconMappings.js";

// DOM Elements
const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");
const greetingElement = document.getElementById("greeting");
const gDateElement = document.getElementById("gDate");
const quoteElement = document.getElementById("quote-container");
const qouteTextEl = document.getElementById("qoute-text");
const qouteAuthorElement = document.getElementById("qoute-author");
const linksElement = document.querySelector(".links");

/**
 * Fetches and displays the greeting message from Chrome's local storage.
 * If no greeting is found, the element remains unchanged.
 */
function loadGreeting() {
  try {
    return localStorage.getItem("greeting-message") ?? "Hello";
  } catch (error) {
    console.error("Error loading greeting:", error);
  }
}

/**
 * Updates the date and time displayed on the page.
 * - Displays the current date in Persian (Farsi) format.
 * - Displays the current time in Persian (Farsi) format.
 * - Displays the current date in Gregorian (English) format.
 */
function updateDateTime() {
  const now = new Date();

  // Persian (Farsi) date and time
  const persianDate = now.toLocaleDateString("fa-IR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const persianTime = now.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Gregorian (English) date
  const gregorianDate = now.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
  });

  // Update DOM elements
  dateElement.textContent = persianDate;
  timeElement.textContent = persianTime;
  gDateElement.textContent = gregorianDate;
}

/**
 * Fetches a random quote from the API and displays it on the page.
 * - Handles errors gracefully and logs them to the console.
 */
async function getQuote() {
  const url = "https://api.realinspire.tech/v1/quotes/random";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch quote: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      qouteTextEl.textContent = data[0].content;
      qouteAuthorElement.textContent = data[0].author;
    } else {
      throw new Error("No quote found in the response.");
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteElement.textContent = "Failed to load quote. Please try again later.";
    authorElement.textContent = "";
  }
}

/**
 * Finds the appropriate FontAwesome icon class for a given URL.
 * @param {string} url - The URL to check.
 * @returns {string} - The FontAwesome icon class.
 */
const getIconClass = (url) => {
  const mapping = iconMappings.find((entry) => url.includes(entry.keyword));
  return mapping ? mapping.iconClass : "fas fa-link default-icon";
};

/**
 * Loads and displays the links from localStorage.
 */
const loadLinks = () => {
  const links = JSON.parse(localStorage.getItem("links")) || [];
  linksElement.innerHTML = "";
  links
    .filter((link) => link.url && link.name) // Filter out links with empty URL or name
    .forEach((link) => {
      const linkElement = document.createElement("a");
      linkElement.href = link.url;

      // Get the appropriate icon class for the URL
      const iconClass = getIconClass(link.url);

      linkElement.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${link.name}</span>
      `;
      linksElement.appendChild(linkElement);
    });
};

/**
 * Initializes the extension when the DOM is fully loaded.
 * - Loads the greeting message.
 * - Updates the date and time immediately and every second.
 * - Fetches and displays a random quote.
 */
document.addEventListener("DOMContentLoaded", () => {
  const showGreetingMessage = JSON.parse(
    localStorage.getItem("show-greeting-message")
  );
  const showWiswQoute = JSON.parse(localStorage.getItem("show-wise-qoute"));
  const showLinksSection = JSON.parse(
    localStorage.getItem("show-links-section")
  );
  console.log(showWiswQoute);

  greetingElement.textContent = showGreetingMessage ? loadGreeting() : "";
  updateDateTime();
  setInterval(updateDateTime, 1000);
  showWiswQoute ? getQuote() : (quoteElement.style.display = "none");
  linksElement.style.display = showLinksSection ? "flex" : "none";
  if (showLinksSection) {
    loadLinks();
  }
});
