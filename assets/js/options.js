const greetingElement = document.getElementById('greeting')
const submitElement = document.getElementById('submit')

chrome.storage.sync.get(['greetingMessage'], result => {
  if (result) {
    greetingElement.placeholder = result.greetingMessage;
  }
})

submitElement.addEventListener('click', () => {
  chrome.storage.sync.set({ greetingMessage: greetingElement.value }, () => {
    console.log('اطلاعات ذخیره شد');
  });
})

