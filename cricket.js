const humanImage = document.getElementById("human");
const computerImage = document.getElementById("computer");
const optionArea = document.getElementById("optionarea");
const scoreDisplay = document.getElementById("score");
let humanScore = 0;
let computerScore = 0;
let targetScore = 0;
let isBattingFirst = false;
let isBowlingFirst = false;
let gamePhase = "selection"; // 'selection', 'batting', 'bowling', 'result'

const champ = document.getElementById("champ");
const container = document.getElementById("container");
const selecting = document.getElementById("select");
const battingBtn = document.getElementById("batting");
const bowlingBtn = document.getElementById("bowling");
const resultcontainer = document.getElementById("winner");
const options = optionArea.querySelectorAll("img");

// Initialize game
function initGame() {
  humanScore = 0;
  computerScore = 0;
  targetScore = 0;
  gamePhase = "selection";
  container.classList.add("hidden");
  resultcontainer.classList.add("hidden");
  selecting.classList.remove("hidden");
  scoreDisplay.textContent = "Select Batting or Bowling";
}

// Handle batting
function handleBatting() {
  isBattingFirst = true;
  gamePhase = "batting";
  select.classList.add("hidden");
  container.classList.remove("hidden");
  scoreDisplay.textContent = `Your turn to bat! Score: ${humanScore}`;

  setupOptionListeners();
}

// Handle bowling
function handleBowling() {
  isBowlingFirst = true;
  gamePhase = "bowling";
  select.classList.add("hidden");
  container.classList.remove("hidden");
  scoreDisplay.textContent = `Your turn to bowl! Computer Score: ${computerScore}`;

  setupOptionListeners();
}

// Setup option listeners based on game phase
function setupOptionListeners() {
  options.forEach((image, index) => {
    image.onclick = () => {
      const humanValue = index + 1; // 1-5
      const computerValue = Math.floor(Math.random() * 5) + 1;

      // Set images
      humanImage.querySelector("img").src = image.src;
      const computerImages = [
        "https://assets.onecompiler.app/43h26buyk/43h4u2hdq/1000002787.png",
        "https://assets.onecompiler.app/43h26buyk/43h4u2hdq/1000002791.png",
        "https://assets.onecompiler.app/43h26buyk/43h4u2hdq/1000002786.png",
        "https://assets.onecompiler.app/43h26buyk/43h4u2hdq/1000002781.png",
        "https://assets.onecompiler.app/43h26buyk/43h4u2hdq/1000002785.png",
      ];
      computerImage.querySelector("img").src =
        computerImages[computerValue - 1];

      if (gamePhase === "batting") {
        // User is batting
        if (humanValue !== computerValue) {
          humanScore += humanValue;
          scoreDisplay.textContent = `Your score: ${humanScore}`;
        } else {
          // Out
          scoreDisplay.textContent = `OUT! Your total: ${humanScore}`;
          targetScore = humanScore + 1; // Computer needs to chase humanScore + 1
          setTimeout(() => {
            switchToComputerBatting();
          }, 1500);
        }
      } else if (gamePhase === "bowling") {
        // User is bowling
        if (humanValue !== computerValue) {
          computerScore += computerValue;
          scoreDisplay.textContent = `Computer score: ${computerScore} | Target: ${targetScore}`;

          // Check if computer has reached target
          if (targetScore > 0 && computerScore >= targetScore) {
            setTimeout(() => {
              endGame(false); // User loses
            }, 1500);
          }
        } else {
          // Computer is out
          scoreDisplay.textContent = `Computer OUT! Score: ${computerScore}`;
          if (isBattingFirst) {
            // User was batting first, check if computer chased
            if (computerScore < targetScore) {
              setTimeout(() => {
                endGame(true); // User wins
              }, 1500);
            } else {
              setTimeout(() => {
                endGame(false); // User loses
              }, 1500);
            }
          } else {
            // User needs to chase
            targetScore = computerScore + 1;
            setTimeout(() => {
              switchToUserBatting();
            }, 1500);
          }
        }
      } else if (gamePhase === "userChasing") {
        // User is chasing target
        if (humanValue !== computerValue) {
          humanScore += humanValue;
          scoreDisplay.textContent = `Your score: ${humanScore} | Target: ${targetScore}`;

          // Check if user has reached target
          if (humanScore >= targetScore) {
            setTimeout(() => {
              endGame(true); // User wins
            }, 1500);
          }
        } else {
          // User is out while chasing
          scoreDisplay.textContent = `OUT! Your score: ${humanScore} | Target: ${targetScore}`;
          setTimeout(() => {
            endGame(false); // User loses
          }, 1500);
        }
      } else if (gamePhase === "computerChasing") {
        // Computer is chasing target
        if (humanValue !== computerValue) {
          computerScore += computerValue;
          scoreDisplay.textContent = `Computer score: ${computerScore} | Target: ${targetScore}`;

          // Check if computer has reached target
          if (computerScore >= targetScore) {
            setTimeout(() => {
              endGame(false); // User loses
            }, 1500);
          }
        } else {
          // Computer is out while chasing
          scoreDisplay.textContent = `Computer OUT! Score: ${computerScore} | Target: ${targetScore}`;
          setTimeout(() => {
            endGame(true); // User wins
          }, 1500);
        }
      }
    };
  });
}

function switchToComputerBatting() {
  gamePhase = "computerChasing";
  humanScore = 0;
  computerScore = 0;
  scoreDisplay.textContent = `Computer needs ${targetScore} to win. Computer score: 0`;
  container.classList.remove("hidden");
}

function switchToUserBatting() {
  gamePhase = "userChasing";
  humanScore = 0;
  scoreDisplay.textContent = `You need ${targetScore} to win. Your score: 0`;
  container.classList.remove("hidden");
}

function endGame(userWins) {
  gamePhase = "result";
  container.classList.add("hidden");
  resultcontainer.classList.remove("hidden");

  if (userWins) {
    champ.textContent = "You Win! ";
  } else {
    champ.textContent = "You Lose! ";
  }
}

// Event listeners
battingBtn.addEventListener("click", handleBatting);
bowlingBtn.addEventListener("click", handleBowling);

// Initialize the game
initGame();

let reset = document.querySelector("#reset");
reset.addEventListener("click", () =>{
    window.location.href = "cricket.html";
})
