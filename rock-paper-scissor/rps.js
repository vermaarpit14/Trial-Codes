// Game elements
const humanImage = document.getElementById("human");
const computerImage = document.getElementById("computer");
const optionArea = document.getElementById("optionarea");
const scoreDisplay = document.getElementById("score");
const resultArea = document.getElementById("resultarea");

// Game state
let gameState = {
  humanScore: 0,
  computerScore: 0,
  targetScore: 0,
  gameActive: false,
};

// Game options
const optionsData = [
  { src: "assets/rock.JPG", value: "R" },
  { src: "assets/paper.JPG", value: "P" },
  { src: "assets/scissor.JPG", value: "S" },
];

// Create round selection buttons
function createRoundSelection() {
  optionArea.innerHTML = `
    <div class="round-selection">
      <h3>Select Game Length</h3>
      <div class="round-options">
        <button class="round-btn" data-points="3">First to 3 points</button>
        <button class="round-btn" data-points="5">First to 5 points</button>
        <button class="round-btn" data-points="10">First to 10 points</button>
      </div>
    </div>
  `;

  document.querySelectorAll(".round-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      gameState.targetScore = parseInt(e.target.dataset.points);
      gameState.gameActive = true;
      gameState.humanScore = 0;
      gameState.computerScore = 0;
      setupGame();
    });
  });
}

// Setup the game after round selection
function setupGame() {
  optionArea.innerHTML = "";
  optionsData.forEach((option) => {
    const optionContainer = document.createElement("div");
    optionContainer.className = "option";

    const img = document.createElement("img");
    img.src = option.src;
    img.alt = option.value;
    img.dataset.value = option.value;

    const name = document.createElement("p");
    name.className = "option-name";
    name.textContent =
      option.value === "R"
        ? "Rock"
        : option.value === "P"
        ? "Paper"
        : "Scissors";

    optionContainer.appendChild(img);
    optionContainer.appendChild(name);
    optionArea.appendChild(optionContainer);
  });

  updateScoreDisplay();
}

// Update the score display
function updateScoreDisplay() {
  scoreDisplay.innerHTML = `
    <span class="human-score">You: ${gameState.humanScore}</span>
    <span class="separator">|</span>
    <span class="computer-score">Computer: ${gameState.computerScore}</span>
    <span class="target">(First to ${gameState.targetScore})</span>
  `;
}

// Show game over message
function showGameOver(winner) {
  const message =
    winner === "human"
      ? `You won ${gameState.humanScore}-${gameState.computerScore}!`
      : `Computer won ${gameState.computerScore}-${gameState.humanScore}!`;

  optionArea.innerHTML = `
    <div class="game-over">
      <h2>Game Over!</h2>
      <p>${message}</p>
      <button id="restart-btn">Play Again</button>
    </div>
  `;

  document.getElementById("restart-btn").addEventListener("click", () => {
    location.reload();
  });
}

// Initialize choice displays
if (!humanImage.querySelector("img")) {
  humanImage.innerHTML =
    '<img class="choice-img" src="assets/rock.JPG" alt="Your choice">';
}
if (!computerImage.querySelector("img")) {
  computerImage.innerHTML =
    '<img class="choice-img" src="assets/rock.JPG" alt="Computer choice">';
}

// Game logic
optionArea.addEventListener("click", (e) => {
  if (!gameState.gameActive || !e.target.matches("img")) return;

  // Set human choice
  const humanValue = e.target.dataset.value;
  humanImage.querySelector("img").src = e.target.src;

  // Generate computer choice
  const randomIndex = Math.floor(Math.random() * optionsData.length);
  const computerChoice = optionsData[randomIndex];
  computerImage.querySelector("img").src = computerChoice.src;
  const computerValue = computerChoice.value;

  // Determine winner
  let roundWinner;
  if (humanValue === computerValue) {
    roundWinner = "draw";
  } else if (
    (humanValue === "R" && computerValue === "S") ||
    (humanValue === "S" && computerValue === "P") ||
    (humanValue === "P" && computerValue === "R")
  ) {
    roundWinner = "human";
    gameState.humanScore++;
  } else {
    roundWinner = "computer";
    gameState.computerScore++;
  }

  updateScoreDisplay();

  // Check for game winner
  if (gameState.humanScore >= gameState.targetScore) {
    showGameOver("human");
    gameState.gameActive = false;
  } else if (gameState.computerScore >= gameState.targetScore) {
    showGameOver("computer");
    gameState.gameActive = false;
  }
});

// Start with round selection
createRoundSelection();
