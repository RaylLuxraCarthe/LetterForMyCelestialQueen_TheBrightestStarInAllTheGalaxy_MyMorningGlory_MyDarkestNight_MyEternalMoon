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



  
// Passwords and hints for each letter
const letterData = {
  1: { password: "pass1", hint: "Our first date's location" },
  2: { password: "pass2", hint: "Your favourite flower" },
  3: { password: "pass3", hint: "The song we always hum" },
  4: { password: "pass4", hint: "Month we first met" },
  5: { password: "pass5", hint: "Your dream travel destination" },
  6: { password: "pass6", hint: "Pet name I call you" },
  7: { password: "pass7", hint: "The dessert you love" },
  8: { password: "pass8", hint: "The colour you adore" },
  9: { password: "pass9", hint: "Where we first hugged" },
  10: { password: "pass10", hint: "The gift I gave you" },
  11: { password: "pass11", hint: "Your birth month" },
  12: { password: "pass12", hint: "The café we always visit" },
  13: { password: "pass13", hint: "The name of our future cat" }
};

// Called when clicking a letter button
function openLetter(num) {
  const userPass = prompt(`Enter the passcode.\nHint: ${letterData[num].hint}`);
  if (userPass === letterData[num].password) {
    // Create new HTML content for this letter
    const newTab = window.open("", "_blank");
    newTab.document.write(`
      <html>
      <head>
        <title>Letter ${num} to My Queen</title>
        <style>
          body {
            font-family: 'Dancing Script', cursive;
            background: radial-gradient(ellipse at bottom, #0d1b2a 0%, #000 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
            text-align: center;
          }
          .letter-content {
            background-color: rgba(255,255,255,0.9);
            color: #222;
            padding: 2rem;
            border-radius: 1.5rem;
            box-shadow: 0 0 15px rgba(255, 182, 193, 0.6);
            max-width: 600px;
            line-height: 1.8rem;
          }
        </style>
      </head>
      <body>
        <div class="letter-content">
          <h2>Letter ${num}</h2>
          <p>My love, this is the message for Letter ${num}.</p>
          <p>You can replace this text with the real heartfelt words for this specific letter.</p>
          <p style="margin-top:2rem;font-style:italic;">— Your Eternal Lord</p>
        </div>
      </body>
      </html>
    `);
    newTab.document.close();
  } else {
    alert("Incorrect password, my Lord.");
  }
}

// Show extra letters only after first main letter unlock
function showExtraLetters() {
  document.getElementById("extra-letters").style.display = "block";
}

// Modify your revealLetter to show extra letters after success
const originalRevealLetter = revealLetter;
revealLetter = function() {
  const code = document.getElementById('code').value.trim();
  if (code === '070524') {
    originalRevealLetter();
    setTimeout(showExtraLetters, 1000);
  } else {
    originalRevealLetter();
  }
};

  const letter = document.getElementById('letter');
const extraLetters = document.getElementById('extra-letters');

// When revealing the letter
function revealLetter() {
    // ... your existing reveal logic ...
    letter.classList.add('revealed');
    setTimeout(() => {
        extraLetters.classList.add('visible');
        extraLetters.style.display = 'block';
    }, 500); // after transition
}

// Toggle expand/collapse
letter.addEventListener('click', function() {
    const isExpanded = letter.classList.toggle('expanded');
    if (isExpanded) {
        extraLetters.classList.remove('visible');
        extraLetters.classList.add('hidden');
    } else {
        extraLetters.classList.remove('hidden');
        extraLetters.classList.add('visible');
    }
});

  // Additional letters data (example, replace with your actual content and passwords)
const additionalLetters = [
  { id: 1, title: "Letter 1", password: "pass1", hint: "Hint 1", content: "This is additional letter 1." },
  { id: 2, title: "Letter 2", password: "pass2", hint: "Hint 2", content: "This is additional letter 2." },
  // Add more as needed
];

// Detect mobile
function isMobile() {
  return window.innerWidth <= 600;
}

// Setup additional letters UI
window.addEventListener('DOMContentLoaded', () => {
  const showBtn = document.getElementById('show-letters-btn');
  const dropdown = document.getElementById('letters-dropdown');
  const lettersList = document.getElementById('letters-list');
  const inlineContent = document.getElementById('inline-letter-content');
  
  // Populate letter buttons
  additionalLetters.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = "button";
    btn.textContent = letter.title;
    btn.onclick = () => {
      const pass = prompt(`Enter the passcode.\nHint: ${letter.hint}`);
      if (pass === letter.password) {
        inlineContent.innerHTML = `
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

  // Mobile: hide dropdown initially
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
});

// Responsive: reset if resized between desktop/mobile
window.addEventListener('resize', () => {
  const showBtn = document.getElementById('show-letters-btn');
  const dropdown = document.getElementById('letters-dropdown');
  if (window.innerWidth <= 600) {
    dropdown.style.display = "none";
    showBtn.style.display = "block";
  } else {
    dropdown.style.display = "block";
    showBtn.style.display = "none";
  }
});
}





