const button = document.getElementById('btn');
const emojiName1 = document.getElementById('emoji');
const emoji = [];

let clickCount = 0;
let timeWasted = 0;
let timerStarted = false;
let timerInterval;
let alertShown = false;

button.disabled = true;

async function getEmoji() {
  let response = await fetch(
    "https://emoji-api.com/emojis?access_key=b06187f2108efc32a29f215906af6dfa0d1b15ec"
  );

  const data = await response.json();

  for (let i = 0; i < 1500; i++) {
    emoji.push({
      emojiName: data[i].character,
      emojiCode: data[i].unicodeName,
    });
  }

  button.disabled = false;
}

getEmoji();


function startTimer() {
  timerInterval = setInterval(() => {
    timeWasted++;
    document.getElementById('timer').innerText = `Time wasted on Emojis ${timeWasted} second${timeWasted !== 1 ? 's' : ''}`

    checkWastedTime();
  }, 1000);
}

function checkWastedTime() {
  if (!alertShown && (timeWasted >= 30 || clickCount >= 50)) {
    alertShown = true;
    const alertBox = document.getElementById('alertC');
    const backdrop = document.getElementById('backdrop');

    alertBox.classList.add('show');
    backdrop.style.display = "block";
  }
}

function closeAlert() {
  const alertBox = document.getElementById('alertC');
  const backdrop = document.getElementById('backdrop');


  alertBox.classList.remove('show');
  alertBox.style.display = 'none'; 
  backdrop.style.display = 'none';

}


button.addEventListener('click', () => {
  if (emoji.length === 0) return;

  
  if (!timerStarted) {
    timerStarted = true;
    startTimer();
  }

  const randomNum = Math.floor(Math.random() * emoji.length);
  button.innerText = emoji[randomNum].emojiName;
  emojiName1.innerText = emoji[randomNum].emojiCode;

  clickCount++;
  document.getElementById('counter').innerText = `Emojis clicked Through ${clickCount}`;

  checkWastedTime();
});