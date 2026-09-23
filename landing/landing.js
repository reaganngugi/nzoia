const signalInput = document.querySelector('#signal-input');
const contextInput = document.querySelector('#context-input');
const charCount = document.querySelector('#char-count');
const scanButton = document.querySelector('#scan-button');
const responseState = document.querySelector('#response-state');
const responseResult = document.querySelector('#response-result');
const clearButton = document.querySelector('#clear-button');
const fileInput = document.querySelector('#file-input');
const fileName = document.querySelector('#file-name');
const modeTabs = document.querySelectorAll('.mode-tab');

const modeCopy = {
  message: 'Paste a suspicious message, email, or anything that made you pause...',
  url: 'Paste a link or URL you want Knox to inspect...',
  image: 'Add a note about the image, or attach it below...',
  audio: 'Add a note about the audio, or attach it below...'
};

signalInput.addEventListener('input', () => {
  charCount.textContent = `${signalInput.value.length.toLocaleString()} / 5,000`;
});

modeTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    modeTabs.forEach((item) => {
      item.classList.remove('is-active');
      item.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    signalInput.placeholder = modeCopy[tab.dataset.mode];
    signalInput.focus();
  });
});

fileInput.addEventListener('change', () => {
  const [file] = fileInput.files;
  if (file) {
    fileName.textContent = file.name;
    fileName.style.color = 'var(--green)';
  }
});

scanButton.addEventListener('click', () => {
  if (!signalInput.value.trim() && !fileInput.files.length) {
    signalInput.focus();
    signalInput.placeholder = 'Add something for Knox to inspect first...';
    return;
  }

  scanButton.disabled = true;
  scanButton.querySelector('span').textContent = 'Reading signal...';
  window.setTimeout(() => {
    responseState.hidden = true;
    responseResult.hidden = false;
    scanButton.disabled = false;
    scanButton.querySelector('span').textContent = 'Analyze with Knox';
  }, 650);
});

clearButton.addEventListener('click', () => {
  responseResult.hidden = true;
  responseState.hidden = false;
  signalInput.value = '';
  contextInput.value = '';
  fileInput.value = '';
  fileName.textContent = 'Images, audio, PDF or email';
  fileName.style.color = '';
  charCount.textContent = '0 / 5,000';
});
