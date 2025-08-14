// =======================
// 🎵 Music Player & Playlist
// =======================
const playlist = [
  "assets/Theme-of-The-Celestial-Queen-I.mp3",
  "assets/Theme-of-The-Celestial-Queen-II.mp3",
  "assets/Theme-of-The-Celestial-Queen-III.mp3",
  "assets/Final-Celestial-Symphony.mp3"
];

const audioPlayer = document.getElementById("celestial-audio");
let currentTrack = 0;
let isPlaying = false;

function playTrack(index) {
  audioPlayer.src = playlist[index];
  audioPlayer.volume = 0.5;
  audioPlayer.muted = false;
  audioPlayer.play()
    .then(() => {
      isPlaying = true;
      musicToggle.textContent = "🔊";
    })
    .catch(e => {
      console.warn("Autoplay may be blocked until user interaction.", e);
    });
}

audioPlayer.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  playTrack(currentTrack);
});

window.addEventListener("load", () => {
  audioPlayer.src = playlist[0];
});

// =======================
// 🖋 Font Toggle
// =======================
const toggleButton = document.getElementById("font-toggle");
let usingTimes = false;
toggleButton.addEventListener("click", () => {
  document.body.style.fontFamily = usingTimes
    ? "'Dancing Script', cursive"
    : "'Times New Roman', Times, serif";
  usingTimes = !usingTimes;
});

// =======================
// 🎼 Music Toggle
// =======================
const musicToggle = document.getElementById("music-toggle");
musicToggle.addEventListener("click", () => {
  if (!isPlaying) {
    audioPlayer.play().then(() => {
      isPlaying = true;
      musicToggle.textContent = "🔊";
    }).catch(err => {
      alert("Playback blocked. Please try again after unlocking the letter.");
      console.warn("Playback failed:", err);
    });
  } else {
    audioPlayer.pause();
    isPlaying = false;
    musicToggle.textContent = "🎶";
  }
});

// =======================
// 💌 Main Letter Reveal
// =======================
const letter = document.getElementById('letter');

function revealLetter() {
  const code = document.getElementById('code').value.trim();
  const correctCode = '070524';
  const button = document.querySelector('.button');
  const input = document.querySelector('.code-input');

  if (code === correctCode) {
    letter.classList.add('show');
    setTimeout(() => {
      letter.classList.add('reveal');
    }, 50);

    button.style.display = 'none';
    input.style.display = 'none';

    playTrack(currentTrack);
    spawnHearts();

    setTimeout(() => {
      document.getElementById('responsive-extra-letters').style.display = "block";
      updateLetterUI(); // Make sure mobile/desktop logic is set at reveal
    }, 1000);
  } else {
    alert("Wrong date, my Lord. Try again.");
  }
}

letter.addEventListener('click', () => {
  letter.classList.toggle('expanded');
});

function spawnHearts() {
  const container = document.getElementById("stars");
  for (let i = 0; i < 70; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${8 + Math.random() * 12}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(heart);
  }
}

// =======================
// 📜 Responsive Extra Letters System
// =======================
const additionalLetters = [
  { id: 1, title: "Letter 1", password: "pass1", hint: "Our first date's location", content: "This is additional letter 1." },
  { id: 2, title: "Letter 2", password: "pass2", hint: "Your favourite flower", content: "This is additional letter 2." },
  { id: 3, title: "Letter 3", password: "pass3", hint: "The song we always hum", content: "This is additional letter 3." },
  { id: 4, title: "Letter 4", password: "pass4", hint: "Month we first met", content: "This is additional letter 4." },
  { id: 5, title: "Letter 5", password: "pass5", hint: "Your dream travel destination", content: "This is additional letter 5." },
  { id: 6, title: "Letter 6", password: "pass6", hint: "Pet name I call you", content: "This is additional letter 6." },
  { id: 7, title: "Letter 7", password: "pass7", hint: "The dessert you love", content: "This is additional letter 7." },
  { id: 8, title: "Letter 8", password: "pass8", hint: "The colour you adore", content: "This is additional letter 8." },
  { id: 9, title: "Letter 9", password: "pass9", hint: "Where we first hugged", content: "This is additional letter 9." },
  { id: 10, title: "Letter 10", password: "pass10", hint: "The gift I gave you", content: "This is additional letter 10." },
  { id: 11, title: "Letter 11", password: "pass11", hint: "Your birth month", content: "This is additional letter 11." },
  { id: 12, title: "Letter 12", password: "pass12", hint: "The café we always visit", content: "This is additional letter 12." },
  { id: 13, title: "Letter 13", password: "pass13", hint: "The name of our future cat", content: "This is additional letter 13." }
];

function isMobile() {
  return window.innerWidth <= 600;
}

function populateLetters() {
  const lettersList = document.getElementById('letters-list');
  lettersList.innerHTML = ""; // Clear previous if any
  additionalLetters.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = "button";
    btn.textContent = letter.title;
    btn.onclick = () => {
      const pass = prompt(`Enter the passcode.\nHint: ${letter.hint}`);
      if (pass === letter.password) {
        document.getElementById('inline-letter-content').innerHTML = `
          <div class="additional-letter">
            <h3>${letter.title}</h3>
            <p>${letter.content}</p>
          </div>
        `;
      } else {
        alert("Incorrect password, my Lord.");
      }
    };
    lettersList.appendChild(btn);
  });
}

function updateLetterUI() {
  const showBtn = document.getElementById('show-letters-btn');
  const dropdown = document.getElementById('letters-dropdown');
  if (!document.getElementById('responsive-extra-letters').style.display || document.getElementById('responsive-extra-letters').style.display === "none") {
    // Don't show anything until main letter is revealed
    showBtn.style.display = "none";
    dropdown.style.display = "none";
    return;
  }
  if (isMobile()) {
    showBtn.style.display = "block";
    dropdown.style.display = "none";
    showBtn.onclick = () => {
      dropdown.style.display = "block";
      showBtn.style.display = "none";
    };
  } else {
    dropdown.style.display = "block";
    showBtn.style.display = "none";
  }
  populateLetters();
}

window.addEventListener('DOMContentLoaded', () => {
  updateLetterUI();
});

window.addEventListener('resize', updateLetterUI);

// =======================
// ⚙ Service Worker
// =======================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}
