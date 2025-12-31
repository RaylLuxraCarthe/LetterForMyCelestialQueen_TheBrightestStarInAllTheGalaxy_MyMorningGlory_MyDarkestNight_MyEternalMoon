// scripts/main.js — updated
// NOTE: overwrite your existing scripts/main.js with this file.

const defaultPlaylist = [
  'assets/Theme-of-The-Celestial-Queen-I.mp3',
  'assets/Theme-of-The-Celestial-Queen-II.mp3',
  'assets/Theme-of-The-Celestial-Queen-III.mp3',
  'assets/Final-Celestial-Symphony.mp3'
];

// New/alternate playlist for the Archives page:
const archivesPlaylist = [
  'assets/Akashic-Theme-I.mp3',
  'assets/Akashic-Theme-II.mp3',
  'assets/Akashic-Theme-III.mp3',
  'assets/Akashic-Finale.mp3'
];

// correct unlock code (used in reveal and to enable archives)
const CORRECT_CODE = '070524';

// Choose playlist based on current page
let playlist = (location.pathname && location.pathname.endsWith('archives.html')) ? archivesPlaylist : defaultPlaylist;

const audioPlayer = document.getElementById('celestial-audio');
let currentTrack = 0;
let isPlaying = false;

// set initial audio src if audio element exists (may be absent on some pages)
window.addEventListener('load', () => {
  if (audioPlayer && playlist && playlist.length) {
    audioPlayer.src = playlist[0];
    // don't auto-play — browsers may block it; user controls playback
  }

  // Set up archives button availability on load
  initArchiveAvailability();
});

function playTrack(index) {
  if (!audioPlayer) return;
  audioPlayer.src = playlist[index];
  audioPlayer.volume = 0.5;
  audioPlayer.muted = false;
  audioPlayer.play()
    .then(() => {
      isPlaying = true;
      const musicToggle = document.getElementById('music-toggle');
      if (musicToggle) musicToggle.textContent = '🔊';
    })
    .catch(e => {
      console.warn('Autoplay may be blocked until user interaction.', e);
    });
}

// Auto play next track when one ends
if (audioPlayer) {
  audioPlayer.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    playTrack(currentTrack);
  });
}

// Toggle font family
const toggleButton = document.getElementById('font-toggle');
let usingTimes = false;
if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    document.body.style.fontFamily = usingTimes
      ? "'Dancing Script', cursive"
      : "'Times New Roman', Times, serif";
    usingTimes = !usingTimes;
  });
}

// Toggle music playback manually
const musicToggle = document.getElementById('music-toggle');
if (musicToggle) {
  musicToggle.addEventListener('click', () => {
    if (!audioPlayer) return;
    if (!isPlaying) {
      audioPlayer.play().then(() => {
        isPlaying = true;
        musicToggle.textContent = '🔊';
      }).catch(err => {
        alert('Playback blocked. Please try again after unlocking the letter or allow playback.');
        console.warn('Playback failed:', err);
      });
    } else {
      audioPlayer.pause();
      isPlaying = false;
      musicToggle.textContent = '🎶';
    }
  });
}

// Archive button enabling/disabling logic
function initArchiveAvailability() {
  const codeInput = document.getElementById('code');
  const archivesLink = document.getElementById('archives-link');

  // helper updates the archive element depending on current input value
  function updateArchiveState() {
    if (!archivesLink || !codeInput) return;
    const val = codeInput.value.trim();
    if (val === CORRECT_CODE) {
      // enable the archive link
      archivesLink.classList.remove('disabled');
      archivesLink.removeAttribute('aria-disabled');
      // restore href so it can be clicked; ensure it points to archives.html
      archivesLink.setAttribute('href', 'archives.html');
    } else {
      // disable
      archivesLink.classList.add('disabled');
      archivesLink.setAttribute('aria-disabled', 'true');
      // remove href to make it non-navigable (extra safety)
      archivesLink.removeAttribute('href');
    }
  }

  // listen for immediate user input changes
  if (codeInput) {
    codeInput.addEventListener('input', updateArchiveState);
    // also call once to set initial state
    updateArchiveState();
  }
}

// Letter reveal with code
function revealLetter() {
  const codeEl = document.getElementById('code');
  const code = codeEl ? codeEl.value.trim() : '';
  const letter = document.getElementById('letter');
  const button = document.querySelector('.button');
  const input = document.querySelector('.code-input');

  if (code === CORRECT_CODE) {
    if (letter) {
      letter.classList.add('show');
      setTimeout(() => {
        letter.classList.add('reveal');
      }, 50);
    }

    if (button) button.style.display = 'none';
    if (input) input.style.display = 'none';

    // play music from the chosen playlist
    playTrack(currentTrack);

    // spawn hearts (existing visual)
    spawnHearts();
  } else {
    alert("Wrong date, my Lord. Try again.");
  }
}

// Letter expansion toggle (user clicks letter to expand/collapse)
const letter = document.getElementById('letter');
if (letter) {
  letter.addEventListener('click', () => {
    letter.classList.toggle('expanded');
  });
}

// Spawn animated floating hearts
function spawnHearts() {
  const container = document.getElementById('stars');
  if (!container) return;
  for (let i = 0; i < 70; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${8 + Math.random() * 12}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(heart);
  }
}

// Service worker registration (unchanged)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
      console.log('Service Worker registered', reg);
    }).catch(err => {
      console.error('Service Worker registration failed:', err);
    });
  });
}
