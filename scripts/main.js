// scripts/main.js
// Complete replacement for your existing scripts/main.js
// Drop this file into scripts/main.js (overwrite the existing file).
// This file:
// - handles two playlists (main + archives)
// - enables/disables the Archives button when the correct code is entered
// - toggles the archive button position/icon when the letter is expanded/collapsed
// - reveals the letter when the correct code is submitted
// - plays audio and advances tracks
// - spawns hearts and registers the service worker

/* ========== Configuration ========== */
const CORRECT_CODE = '070524';

const defaultPlaylist = [
  'assets/Theme-of-The-Celestial-Queen-I.mp3',
  'assets/Theme-of-The-Celestial-Queen-II.mp3',
  'assets/Theme-of-The-Celestial-Queen-III.mp3',
  'assets/Final-Celestial-Symphony.mp3'
];

const archivesPlaylist = [
  'assets/Akashic-Theme-I.mp3',
  'assets/Akashic-Theme-II.mp3',
  'assets/Akashic-Theme-III.mp3',
  'assets/Akashic-Finale.mp3'
];

/* Choose playlist based on current page */
const isArchivesPage = typeof location !== 'undefined' && location.pathname && location.pathname.endsWith('archives.html');
let playlist = isArchivesPage ? archivesPlaylist : defaultPlaylist;

/* ========== DOM references ========== */
const audioPlayer = document.getElementById('celestial-audio');
const archivesLink = document.getElementById('archives-link');
const codeInputGlobal = document.getElementById('code'); // may be present on index.html
const fontToggle = document.getElementById('font-toggle');
const musicToggle = document.getElementById('music-toggle');
const starsContainer = document.getElementById('stars');

/* ========== Audio player state ========== */
let currentTrack = 0;
let isPlaying = false;

/* ========== Initialize on load ========== */
window.addEventListener('load', () => {
  // Initialize audio src (don't autoplay)
  if (audioPlayer && playlist && playlist.length) {
    audioPlayer.src = playlist[0];
  }

  // Initialize archive button availability
  initArchiveAvailability();

  // Wire up UI toggles
  initToggles();

  // Ensure archive button has the correct initial moved state (if letter already expanded for some reason)
  syncArchiveMovedState();
});

/* ========== Play control ========== */
function playTrack(index = 0) {
  if (!audioPlayer || !playlist || playlist.length === 0) return;
  currentTrack = index % playlist.length;
  audioPlayer.src = playlist[currentTrack];
  audioPlayer.volume = 0.5;
  audioPlayer.muted = false;
  audioPlayer.play().then(() => {
    isPlaying = true;
    if (musicToggle) musicToggle.textContent = '🔊';
  }).catch(err => {
    // Autoplay may be blocked until user interaction; that's expected on many browsers
    console.warn('Playback blocked until user interaction', err);
  });
}

if (audioPlayer) {
  audioPlayer.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    playTrack(currentTrack);
  });
}

/* ========== Archive button enable/disable ========== */
function initArchiveAvailability() {
  // check both local code input (on index) and any code input inside .controls-inline
  const codeInputs = [];
  const byId = document.getElementById('code');
  if (byId) codeInputs.push(byId);

  // If there are other code inputs (rare), include them:
  document.querySelectorAll('.code-input').forEach(el => {
    if (!codeInputs.includes(el)) codeInputs.push(el);
  });

  // If there's no archivesLink in this page, nothing to toggle
  if (!archivesLink) return;

  // helper to update the archivesLink based on a code value
  function setArchiveStateFromValue(val) {
    const trimmed = (val || '').trim();
    if (trimmed === CORRECT_CODE) {
      archivesLink.classList.remove('disabled');
      archivesLink.removeAttribute('aria-disabled');
      // On index page enable navigation to archives.html; on archives page ensure the link points to itself or some other page
      if (!isArchivesPage) {
        archivesLink.setAttribute('href', 'archives.html');
        archivesLink.setAttribute('target', '_self');
        archivesLink.setAttribute('rel', 'noopener');
      } else {
        // If already on archives page, keep the link present but point to same page or "#"
        archivesLink.setAttribute('href', 'archives.html');
      }
    } else {
      archivesLink.classList.add('disabled');
      archivesLink.setAttribute('aria-disabled', 'true');
      archivesLink.removeAttribute('href'); // additional safety so it can't be clicked
    }
  }

  // Attach listeners to all found code inputs
  codeInputs.forEach(inp => {
    // update immediately on load
    setArchiveStateFromValue(inp.value);

    inp.addEventListener('input', () => {
      setArchiveStateFromValue(inp.value);
    });
  });
}

/* ========== Reveal letter ========== */
function revealLetter() {
  const codeEl = document.getElementById('code');
  const code = codeEl ? codeEl.value.trim() : '';

  const letter = document.getElementById('letter');
  const openButton = document.querySelector('.button');
  const inputVisible = document.querySelector('.code-input');

  if (code === CORRECT_CODE) {
    if (letter) {
      // reveal with your existing classes (keeps compatibility with existing CSS)
      letter.classList.add('show');
      setTimeout(() => {
        letter.classList.add('reveal');
      }, 50);
    }

    if (openButton) openButton.style.display = 'none';
    if (inputVisible) inputVisible.style.display = 'none';

    // start music
    playTrack(currentTrack);

    // spawn hearts
    spawnHearts();
  } else {
    alert('Wrong date, my Lord. Try again.');
  }
}

/* Expose revealLetter to global scope (index.html inline calls it) */
window.revealLetter = revealLetter;

/* ========== Letter expand/collapse -> archive button moved state ========== */
function syncArchiveMovedState() {
  const letter = document.getElementById('letter');
  if (!letter || !archivesLink) return;
  if (letter.classList.contains('expanded')) {
    archivesLink.classList.add('moved');
  } else {
    archivesLink.classList.remove('moved');
  }
}

/* Replace existing click handler or add one that toggles .expanded and toggles archivesLink.moved */
(function wireLetterClick() {
  const letter = document.getElementById('letter');
  if (!letter) return;

  // If there is already a click handler in markup, we still attach ours to toggle moved state.
  letter.addEventListener('click', () => {
    letter.classList.toggle('expanded');
    // toggle archive button moved class in sync with the letter
    if (archivesLink) {
      if (letter.classList.contains('expanded')) {
        archivesLink.classList.add('moved');
      } else {
        archivesLink.classList.remove('moved');
      }
    }
  });
})();

/* ========== Font & music toggles ========== */
function initToggles() {
  if (fontToggle) {
    let usingTimes = false;
    fontToggle.addEventListener('click', () => {
      document.body.style.fontFamily = usingTimes ? "'Dancing Script', cursive" : "'Times New Roman', Times, serif";
      usingTimes = !usingTimes;
    });
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      if (!audioPlayer) return;
      if (!isPlaying) {
        audioPlayer.play().then(() => {
          isPlaying = true;
          musicToggle.textContent = '🔊';
        }).catch(err => {
          console.warn('Playback blocked:', err);
        });
      } else {
        audioPlayer.pause();
        isPlaying = false;
        musicToggle.textContent = '🎶';
      }
    });
  }
}

/* ========== Visual hearts ========== */
function spawnHearts() {
  if (!starsContainer) return;
  // create a bunch of animated hearts; the CSS for .heart must exist in your index.html
  for (let i = 0; i < 70; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${8 + Math.random() * 12}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    starsContainer.appendChild(heart);
    // remove after animation to avoid DOM bloat
    setTimeout(() => {
      try { heart.remove(); } catch (e) {}
    }, 22000); // longer than max animation duration
  }
}

/* ========== Service worker registration (keeps same behavior) ========== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
      console.log('Service Worker registered', reg);
    }).catch(err => {
      console.error('Service Worker registration failed:', err);
    });
  });
}

/* ========== Exported helpers (optional) ========== */
window.__celestial = {
  playTrack,
  revealLetter,
  spawnHearts,
  setPlaylist: (arr) => { playlist = Array.isArray(arr) ? arr : playlist; }
};
