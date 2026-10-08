const introScreen = document.getElementById('introScreen');
const transitionScreen = document.getElementById('transitionScreen');
const birthdayPage = document.getElementById('birthdayPage');
const modal = document.getElementById('surpriseModal');
const yesBtn = document.getElementById('yesBtn');
const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');
const unlockBtn = document.getElementById('unlockBtn');
const surpriseModal = document.getElementById('surpriseModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const audioToggle = document.getElementById('audioToggle');
const music = document.getElementById('music');
const typingText = document.getElementById('typingText');
const slideshowImage = document.getElementById('slideshowImage');
const slideCaption = document.getElementById('slideCaption');
const starsLayer = document.getElementById('stars');
const fireworksLayer = document.getElementById('fireworksLayer');
const heartsLayer = document.getElementById('heartsLayer');
const confettiLayer = document.getElementById('confettiLayer');

const fallbackImageDataUri = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <rect width="1200" height="800" fill="#130f30"/>
    <circle cx="600" cy="280" r="220" fill="#ff4fa3" opacity="0.7"/>
    <circle cx="520" cy="470" r="180" fill="#6fe7ff" opacity="0.55"/>
    <rect x="250" y="410" width="700" height="220" rx="34" fill="#ffffff" opacity="0.94"/>
    <path d="M320 560c38-110 118-170 210-170 85 0 152 58 188 138" fill="none" stroke="#ff4fa3" stroke-width="20" stroke-linecap="round"/>
    <circle cx="420" cy="360" r="62" fill="#ffd86b"/>
    <text x="600" y="540" font-family="Montserrat, sans-serif" font-size="44" text-anchor="middle" fill="#130f30">Birthday memory</text>
  </svg>
`);

const phrases = [
  'You are the kind of magic that makes life feel brighter.',
  'Your smile makes ordinary days sparkle.',
  'May this birthday be filled with laughter, love, and little surprises.',
  'Here is a tiny celebration made just for you.'
];

function createStars() {
  const totalStars = 120;
  for (let i = 0; i < totalStars; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    star.style.opacity = `${0.3 + Math.random() * 0.7}`;
    starsLayer.appendChild(star);
  }
}

function createFireworks() {
  const colors = ['#ff4fa3', '#6fe7ff', '#ffd86b', '#ff7a00', '#ffffff'];
  setInterval(() => {
    const burst = document.createElement('div');
    burst.className = 'firework';
    burst.style.left = `${Math.random() * 100}%`;
    burst.style.top = `${Math.random() * 100}%`;
    burst.style.color = colors[Math.floor(Math.random() * colors.length)];
    fireworksLayer.appendChild(burst);

    for (let i = 0; i < 12; i += 1) {
      const piece = document.createElement('div');
      piece.className = 'firework-piece';
      piece.style.left = '50%';
      piece.style.top = '50%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.setProperty('--x', `${Math.cos((i / 12) * Math.PI * 2) * 60}px`);
      piece.style.setProperty('--y', `${Math.sin((i / 12) * Math.PI * 2) * 60}px`);
      piece.style.color = colors[Math.floor(Math.random() * colors.length)];
      burst.appendChild(piece);
    }

    setTimeout(() => burst.remove(), 1800);
  }, 900);
}

function createHearts() {
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '♥';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${7 + Math.random() * 5}s`;
    heart.style.animationDelay = `${Math.random() * 2}s`;
    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), 14000);
  }, 700);
}

function createConfetti() {
  const colors = ['#ff4fa3', '#6fe7ff', '#ffd86b', '#ff8f2f', '#ff5d7a'];
  setInterval(() => {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--x', `${Math.random() * 120 - 60}px`);
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 4500);
  }, 220);
}

function startTypingAnimation() {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (!deleting) {
      typingText.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex += 1;
      if (charIndex === currentPhrase.length) {
        deleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      typingText.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex -= 1;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 38 : 70);
  }

  type();
}

function startSlideshow() {
  // Add 4 friend photos in the same folder with these exact names:
  // friend1.jpg, friend2.jpg, friend3.jpg, friend4.jpg
  const friendSlides = [
    { src: 'image.png', caption: 'Besties, laughter, and forever memories.' },
    { src: 'image2.png', caption: 'Pure joy with the coolest people around.' },
    { src: 'image3.png', caption: 'Good vibes, big smiles, and endless friendship.' },
    { src: 'image5.png', caption: 'Friends who make every day feel special.' }
  ];

  let index = 0;

  function updateSlide() {
    const currentSlide = friendSlides[index % friendSlides.length];
    slideshowImage.src = currentSlide.src;
    slideshowImage.onerror = () => {
      slideshowImage.src = fallbackImageDataUri;
      slideshowImage.onerror = null;
    };
    slideCaption.textContent = currentSlide.caption;
    index = (index + 1) % friendSlides.length;
  }

  updateSlide();
  setInterval(updateSlide, 3000);
}

function setActiveScreen(screen) {
  [introScreen, transitionScreen, birthdayPage].forEach((item) => {
    item.classList.remove('active');
  });
  screen.classList.add('active');
}

let isMusicPlaying = false;

function updateAudioButton() {
  if (!audioToggle) return;
  audioToggle.textContent = isMusicPlaying ? '⏸ Pause Birthday Song' : '▶ Play Birthday Song';
}

function playMusic() {
  if (isMusicPlaying) return;

  if (!music.src) {
    music.src = 'birthday-song.mp3';
  }

  music.load();
  music.volume = 0.75;
  music.currentTime = 0;
  music.play().then(() => {
    isMusicPlaying = true;
    updateAudioButton();
  }).catch(() => {
    isMusicPlaying = false;
    updateAudioButton();
  });
}

function pauseMusic() {
  music.pause();
  isMusicPlaying = false;
  updateAudioButton();
}

function closeModal() {
  surpriseModal.classList.remove('active');
  surpriseModal.setAttribute('hidden', '');
}

function showPasswordModal() {
  passwordModal.removeAttribute('hidden');
  passwordModal.classList.add('active');
  passwordInput.value = '';
  passwordError.textContent = '';
  setTimeout(() => passwordInput.focus(), 100);
}

function hidePasswordModal() {
  passwordModal.classList.remove('active');
  passwordModal.setAttribute('hidden', '');
  passwordError.textContent = '';
}

function validatePassword() {
  const enteredPassword = passwordInput.value.trim();
  const correctPassword = 'surprise123';

  if (enteredPassword === correctPassword) {
    hidePasswordModal();
    showBirthdayPage();
    return;
  }

  passwordError.textContent = 'Wrong password. Try again.';
  passwordInput.focus();
  passwordInput.select();
}

function showBirthdayPage() {
  playMusic();
  setActiveScreen(transitionScreen);
  setTimeout(() => {
    setActiveScreen(birthdayPage);
    startTypingAnimation();
    startSlideshow();
  }, 3000);
}

yesBtn.addEventListener('click', showPasswordModal);
unlockBtn.addEventListener('click', validatePassword);
passwordInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    validatePassword();
  }
});

audioToggle.addEventListener('click', () => {
  if (isMusicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

closeModalBtn.addEventListener('click', closeModal);

surpriseModal.addEventListener('click', (event) => {
  if (event.target === surpriseModal) {
    closeModal();
  }
});

window.addEventListener('load', () => {
  setActiveScreen(introScreen);
  closeModal();
  updateAudioButton();
  createStars();
  createFireworks();
  createHearts();
});
