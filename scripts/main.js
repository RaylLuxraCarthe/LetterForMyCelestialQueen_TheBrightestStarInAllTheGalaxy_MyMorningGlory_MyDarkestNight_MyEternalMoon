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
      if (musicToggle) musicToggle.textContent = "🔊";
    })
    .catch(e => {
      console.warn("Autoplay may be blocked until user interaction.", e);
    });
}

if (audioPlayer) {
  audioPlayer.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    playTrack(currentTrack);
  });

  window.addEventListener("load", () => {
    audioPlayer.src = playlist[0];
  });
}

// =======================
// 🖋 Font Toggle
// =======================
const toggleButton = document.getElementById("font-toggle");
let usingTimes = false;
if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    document.body.style.fontFamily = usingTimes
      ? "'Dancing Script', cursive"
      : "'Times New Roman', Times, serif";
    usingTimes = !usingTimes;
  });
}

// =======================
// 🎼 Music Toggle
// =======================
const musicToggle = document.getElementById("music-toggle");
if (musicToggle && audioPlayer) {
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
}

// =======================
// 💌 Main Letter Reveal
// =======================
const letter = document.getElementById('letter');

function revealLetter() {
  const codeInput = document.getElementById('code');
  const code = codeInput ? codeInput.value.trim() : "";
  const correctCode = '070524';
  const button = document.querySelector('.button');
  const input = document.querySelector('.code-input');

  if (code === correctCode) {
    if (letter) {
      letter.classList.add('show');
      setTimeout(() => {
        letter.classList.add('reveal');
      }, 50);

      if (button) button.style.display = 'none';
      if (input) input.style.display = 'none';

      playTrack(currentTrack);
      spawnHearts();

      setTimeout(() => {
        const extraLetters = document.getElementById('responsive-extra-letters');
        if (extraLetters) extraLetters.style.display = "block";
        // Optionally add updateLetterUI() logic here if needed.
      }, 1000);
    }
  } else {
    alert("Wrong date, my Lord. Try again.");
  }
}

if (letter) {
  letter.addEventListener('click', () => {
    letter.classList.toggle('expanded');
  });
}

function spawnHearts() {
  const container = document.getElementById("stars");
  if (!container) return;
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
// Responsive UI Helpers
// =======================
function isMobile() {
  return window.innerWidth < 768;
}

// =======================
// 💌 Letter Reveal & Chapters
// =======================

// Demo data for chapters (replace with real data/password/hints)
const chapters = [
  { title: "Chapter 1", hint: "Hint 1", password: "pass1", content: "Letter for Chapter 1" },
  { title: "Chapter 2", hint: "Hint 2", password: "pass2", content: "Letter for Chapter 2" },
  { title: "Chapter 3", hint: "Hint 3", password: "pass3", content: "Letter for Chapter 3" },
  { title: "Chapter 4", hint: "Hint 4", password: "pass4", content: "Letter for Chapter 4" },
  { title: "Chapter 5", hint: "Hint 5", password: "pass5", content: "Letter for Chapter 5" },
  { title: "Chapter 6", hint: "Hint 6", password: "pass6", content: "Letter for Chapter 6" },
  { title: "Chapter 7", hint: "Hint 7", password: "pass7", content: "Letter for Chapter 7" },
  { title: "Chapter 8", hint: "Hint 8", password: "pass8", content: "Letter for Chapter 8" },
  { title: "Chapter 9", hint: "Hint 9", password: "pass9", content: "Letter for Chapter 9" },
  { title: "Chapter 10", hint: "Hint 10", password: "pass10", content: "Letter for Chapter 10" },
  { title: "Chapter 11", hint: "Hint 11", password: "pass11", content: "Letter for Chapter 11" },
  { title: "Chapter 12", hint: "Hint 12", password: "pass12", content: "Letter for Chapter 12" },
  { title: "Chapter 13", hint: "Hint 13", password: "pass13", content: "Letter for Chapter 13" },
];

// Elements
const passcodeContainer = document.getElementById('passcode-container');
const previewContainer = document.getElementById('preview-container');
const previewBtn = document.getElementById('preview-btn');
const previewText = document.getElementById('preview-text');
const chaptersContainer = document.getElementById('chapters-container');
const mobileChaptersContainer = document.getElementById('mobile-chapters-container');
const revealChaptersBtn = document.getElementById('reveal-chapters-btn');
const mobileChapters = document.getElementById('mobile-chapters');
const letter = document.getElementById('letter');
const closeLetterBtn = document.getElementById('close-letter-btn');
const revealBtn = document.getElementById('reveal-btn');

const mainLetterContent = document.querySelector('.letter-content');

// State
let mainLetterExpanded = false;

// Utility - Animate Show/Hide
function fadeIn(el) {
  el.style.opacity = 0;
  el.style.display = 'block';
  setTimeout(() => el.style.opacity = 1, 10);
}
function fadeOut(el) {
  el.style.opacity = 0;
  setTimeout(() => el.style.display = 'none', 300);
}

// Show/hide main preview
if (previewBtn && previewText) {
  previewBtn.addEventListener('click', () => {
    fadeIn(previewText);
    fadeOut(previewBtn);
  });
}

// Reveal main letter
function showMainLetter(expand = false) {
  fadeIn(letter);
  letter.classList.add('show');
  if (expand) {
    letter.classList.add('expanded');
    mainLetterExpanded = true;
    fadeIn(closeLetterBtn);
    if (!isMobile()) fadeOut(chaptersContainer);
  } else {
    letter.classList.remove('expanded');
    mainLetterExpanded = false;
    fadeOut(closeLetterBtn);
    if (!isMobile()) fadeIn(chaptersContainer);
  }
}

// Handle Reveal Button
if (revealBtn) {
  revealBtn.addEventListener('click', () => {
    const codeInput = document.getElementById('code');
    const code = codeInput ? codeInput.value.trim() : "";
    const correctCode = '070524';

    if (code === correctCode) {
      fadeOut(passcodeContainer);
      if (isMobile()) {
        fadeIn(mobileChaptersContainer);
        fadeIn(previewBtn);
      } else {
        fadeIn(previewContainer);
        fadeIn(previewBtn);
        fadeIn(chaptersContainer);
      }
      spawnHearts();
      playTrack(currentTrack);
    } else {
      alert("Wrong date, my Lord. Try again.");
    }
  });
}

// Expand/Collapse main letter
if (letter) {
  letter.addEventListener('click', (e) => {
    // Only expand/collapse if not clicking close button
    if (e.target === closeLetterBtn) return;
    if (!mainLetterExpanded) {
      showMainLetter(true);
    } else {
      showMainLetter(false);
      if (isMobile()) {
        fadeIn(previewBtn);
        fadeIn(mobileChaptersContainer);
      }
    }
  });
}
if (closeLetterBtn) {
  closeLetterBtn.addEventListener('click', (e) => {
    showMainLetter(false);
    if (isMobile()) {
      fadeIn(previewBtn);
      fadeIn(mobileChaptersContainer);
    }
    e.stopPropagation();
  });
}

// =======================
// Chapters: Desktop & Mobile
// =======================

// Render chapter buttons - Desktop
function renderChapters() {
  chaptersContainer.innerHTML = '';
  chapters.forEach((chapter, idx) => {
    const btn = document.createElement('button');
    btn.className = 'chapter-btn';
    btn.textContent = chapter.title;
    btn.style.background = '#b8e3ff'; // baby blue aesthetic

    // Open chapter modal/tab on click
    btn.addEventListener('click', () => {
      openChapterModal(idx, false);
    });

    chaptersContainer.appendChild(btn);
  });
}

// Mobile: Reveal chapters
if (revealChaptersBtn) {
  revealChaptersBtn.addEventListener('click', () => {
    fadeIn(mobileChapters);
    mobileChapters.innerHTML = '';
    chapters.forEach((chapter, idx) => {
      const btn = document.createElement('button');
      btn.className = 'chapter-btn';
      btn.textContent = chapter.title;
      btn.style.background = '#b8e3ff';
      btn.addEventListener('click', () => {
        openChapterModal(idx, true);
      });
      mobileChapters.appendChild(btn);
    });
  });
}

// Chapter modal/tab
function openChapterModal(idx, mobileMode = false) {
  // Create modal overlay
  let modal = document.createElement('div');
  modal.className = 'chapter-modal';
  modal.style.background = '#b8e3ff';
  modal.innerHTML = `
    <div class="chapter-modal-content">
      <h2>${chapters[idx].title}</h2>
      <p class="chapter-hint">Hint: ${chapters[idx].hint}</p>
      <input type="password" class="chapter-pass-input" placeholder="Enter chapter password">
      <button class="chapter-pass-btn">Reveal Letter</button>
      <div class="chapter-letter-content" style="display:none;"></div>
      <button class="close-chapter-btn">Close</button>
    </div>
  `;
  document.body.appendChild(modal);

  // Reveal letter on password match
  modal.querySelector('.chapter-pass-btn').addEventListener('click', () => {
    const input = modal.querySelector('.chapter-pass-input');
    if (input.value.trim() === chapters[idx].password) {
      const letterDiv = modal.querySelector('.chapter-letter-content');
      letterDiv.textContent = chapters[idx].content;
      fadeIn(letterDiv);
    } else {
      alert('Wrong chapter password!');
    }
  });

  // Close modal
  modal.querySelector('.close-chapter-btn').addEventListener('click', () => {
    modal.remove();
  });
}

// Initial render
window.addEventListener('load', () => {
  renderChapters();
});

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
