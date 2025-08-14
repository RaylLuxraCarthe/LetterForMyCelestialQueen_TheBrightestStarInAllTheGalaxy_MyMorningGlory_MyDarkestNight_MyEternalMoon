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
// ⚙ Service Worker
// =======================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}
