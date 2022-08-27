const dateElement = document.getElementById('date')
const timeElement = document.getElementById('time')
const greetingElement = document.getElementById('greeting')

/**
 * Read the local storage and show it in the 
 * Greeting Label if there is one
 */
chrome.storage.sync.get(['greetingMessage'], (result) => {
  greetingElement.textContent = result.greetingMessage;

})



updateDateTime()


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

  dateElement.textContent = persianDate
  timeElement.textContent = time
}


/**
 * Updates Date and time every 1 second
 */
setInterval(updateDateTime, 1000 )
