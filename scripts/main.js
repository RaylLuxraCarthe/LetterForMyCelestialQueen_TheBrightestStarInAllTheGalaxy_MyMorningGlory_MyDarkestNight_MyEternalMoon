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

  // Auto play next track when one ends
  audioPlayer.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    playTrack(currentTrack);
  });

  // Assign the initial track source on page load
  window.addEventListener("load", () => {
    audioPlayer.src = playlist[0];
  });

  // Toggle font family
  const toggleButton = document.getElementById("font-toggle");
  let usingTimes = false;

  toggleButton.addEventListener("click", () => {
    document.body.style.fontFamily = usingTimes
      ? "'Dancing Script', cursive"
      : "'Times New Roman', Times, serif";
    usingTimes = !usingTimes;
  });

  // Toggle music playback manually
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

  // Letter reveal with code
  function revealLetter() {
    const code = document.getElementById('code').value.trim();
    const correctCode = '070524';
    const letter = document.getElementById('letter');
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
    } else {
      alert("Wrong date, my Lord. Try again.");
    }
  }

  // Letter expansion toggle
  const letter = document.getElementById('letter');
  letter.addEventListener('click', () => {
    letter.classList.toggle('expanded');
  });

  // Spawn animated floating hearts
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(reg => {
      console.log('Service Worker registered', reg);
    }).catch(err => {
      console.error('Service Worker registration failed:', err);
    });
  });













  const isMobile = window.matchMedia("(max-width: 768px)").matches;
const passcodeInput = document.getElementById('passcode-input');
const revealButton = document.getElementById('reveal-button');
const passcodeHint = document.getElementById('passcode-hint');
const previewSection = document.getElementById('preview-section');
const previewText = document.getElementById('preview-text');
const expandMainLetter = document.getElementById('expand-main-letter');
const chapterButtons = document.getElementById('chapter-buttons');
const mobileChapters = document.getElementById('mobile-chapters');
const revealChaptersDropdown = document.getElementById('reveal-chapters-dropdown');
const mobileChapterList = document.getElementById('mobile-chapter-list');
const letterModal = document.getElementById('letter-modal');
const closeLetter = document.getElementById('close-letter');
const letterContent = document.getElementById('letter-content');

// Sample Data
const chapters = [
  { title: "Letter 1", passcode: "code1", hint: "Hint 1", content: "Content for Letter 1" },
  // ... up to 13
];
const mainLetter = { passcode: "maincode", hint: "Main Hint", content: "Main Letter Content" };
const preview = "This is your preview text.";

// Responsive UI Setup
function showPreview() {
  previewSection.style.display = 'block';
  previewText.textContent = preview;
  if (isMobile) {
    expandMainLetter.style.display = 'inline-block';
    mobileChapters.style.display = 'block';
  } else {
    chapterButtons.style.display = 'flex';
    generateChapterButtons(chapterButtons, false);
  }
}

// Passcode Check
revealButton.onclick = function() {
  if (passcodeInput.value === mainLetter.passcode) {
    passcodeHint.textContent = "";
    showPreview();
  } else {
    passcodeHint.textContent = mainLetter.hint;
  }
};

// PC: Generate Chapter Buttons
function generateChapterButtons(container, isMobile) {
  container.innerHTML = '';
  chapters.forEach((chapter, idx) => {
    const btn = document.createElement('button');
    btn.textContent = chapter.title;
    btn.onclick = () => openLetterTab(chapter, isMobile);
    btn.style.background = "#B3E5FC"; // baby blue
    container.appendChild(btn);
  });
}

// PC: Hide/Show Chapter Buttons on expand/close
expandMainLetter.onclick = function() {
  openLetterTab(mainLetter, isMobile);
  if (!isMobile) chapterButtons.style.display = 'none';
};
closeLetter.onclick = function() {
  letterModal.style.display = 'none';
  if (!isMobile) chapterButtons.style.display = 'flex';
};

// Mobile: Preview Text Button
expandMainLetter.onclick = function() {
  openLetterTab(mainLetter, true);
  mobileChapters.style.display = 'none';
};
closeLetter.onclick = function() {
  letterModal.style.display = 'none';
  mobileChapters.style.display = 'block';
};

// Mobile: Reveal Chapters Dropdown
revealChaptersDropdown.onclick = function() {
  mobileChapterList.style.display = mobileChapterList.style.display === 'block' ? 'none' : 'block';
  if (mobileChapterList.style.display === 'block') {
    generateChapterButtons(mobileChapterList, true);
  }
};

// Letter Modal/Tab
function openLetterTab(letter, isMobile) {
  letterModal.style.display = 'block';
  letterContent.innerHTML = `
    <input type="password" id="chapter-passcode" placeholder="Enter passcode">
    <button id="chapter-reveal">Reveal Chapter</button>
    <div id="chapter-hint">${letter.hint}</div>
    <div id="chapter-content" style="display:none;">
      ${letter.content}
    </div>
  `;
  document.getElementById('chapter-reveal').onclick = function() {
    if (document.getElementById('chapter-passcode').value === letter.passcode) {
      document.getElementById('chapter-hint').textContent = "";
      document.getElementById('chapter-content').style.display = 'block';
    } else {
      document.getElementById('chapter-hint').textContent = letter.hint;
    }
  };
}

// Smooth transitions (example for modal)
letterModal.style.transition = "opacity 0.4s";
letterModal.ontransitionend = function() {
  // handle any cleanup if needed
};

// Initial Responsive Setup
window.onload = function() {
  if (isMobile) {
    previewSection.style.display = 'none';
    expandMainLetter.style.display = 'inline-block';
    mobileChapters.style.display = 'block';
    chapterButtons.style.display = 'none';
  } else {
    expandMainLetter.style.display = 'none';
    chapterButtons.style.display = 'flex';
    mobileChapters.style.display = 'none';
  }
};
}
