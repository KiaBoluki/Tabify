const dateElement = document.getElementById('date')
const timeElement = document.getElementById('time')
const greetingElement = document.getElementById('greeting')
const gDateElement = document.getElementById('gDate')
const quoteElement = document.getElementById('quote')
const authorElement = document.getElementById('author')
/**
 * Read the local storage and show it in the 
 * Greeting Label if there is one
 */
try {
  chrome.storage.sync.get(["greetingMessage"], (result) => {
    greetingElement.textContent = result.greetingMessage;
  });
} catch (error) {
  console.log(error)
}

/**
 * @type function
 * 
 * @params 
 * @return 
 * 
 * Makes a new instance of Date
 * Gets the date and time of client device
 * localize it to farsi - Iran 
 * shows the weekday, day of month, and the long name of month
 * in Persian Calendar format 
 * shows hour and minute in 2-digit format
 */
function updateDateTime() {
  const newDate = new Date()

  const persianDate = newDate.toLocaleDateString('fa-IR', { weekday: "long", day: '2-digit', month: 'long' })

  const time = newDate.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
  gDateElement.textContent = newDate.toLocaleDateString('en-us', {
    month: 'long', day: '2-digit'
  })
  dateElement.textContent = persianDate
  timeElement.textContent = time
}




/**
 * 
 * get a random quote from the API
 * and show it in the quote label
 */
async function getQuote() {

  
    /** set no-cors header to avoid cors error */
    const url = "https://api.realinspire.tech/v1/quotes/random";
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    }
    
    const response = await fetch(url, options);
    const data = await response.json()
    quoteElement.textContent = data[0].content;
    authorElement.textContent = data[0].author;
    
}

document.addEventListener('DOMContentLoaded', () => {
  updateDateTime();
  setInterval(updateDateTime, 1000);
  getQuote();
})

