// Array of background music tracks (relative paths)
const bgmTracks = [
  "audios/bgm1.mp3",
  "audios/bgm2.mp3",
  "audios/bgm3.mp3",
  "audios/bgm4.mp3",
  "audios/bgm5.mp3",
  "audios/bgm6.mp3",
];

// Get elements
const bgMusic = document.getElementById("bgMusic");
const enableSoundBtn = document.getElementById("enableSound");

// Select a random BGM track
function getRandomBGM() {
  const randomIndex = Math.floor(Math.random() * bgmTracks.length);
  return bgmTracks[randomIndex];
}

// Initialize music player
function initMusicPlayer() {
  // Set a random BGM track
  bgMusic.src = getRandomBGM();

  // Try to play music
  const playPromise = bgMusic.play();

  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        // Successfully started playback
        enableSoundBtn.classList.add("hidden");
      })
      .catch((error) => {
        // Autoplay was prevented
        console.log("Waiting for user interaction to play audio");
      });
  }
}

// When current track ends, play another random one
bgMusic.addEventListener("ended", () => {
  bgMusic.src = getRandomBGM();
  bgMusic.play();
});

// Enable sound when button is clicked
enableSoundBtn.addEventListener("click", () => {
  initMusicPlayer();
});

// Also try to initialize when any game button is clicked
document.querySelectorAll(".game-buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    if (bgMusic.paused) {
      initMusicPlayer();
    }
  });
});
