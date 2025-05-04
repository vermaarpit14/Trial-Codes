// Game selection logic
document.addEventListener("DOMContentLoaded", function () {
  const gamesoption = document.getElementById("gamesoption");
  const gameone = document.getElementById("gameone");
  const gametwo = document.getElementById("gametwo");
  const game_1 = document.getElementById("game_1");
  const game_2 = document.getElementById("game_2");
  const homeButtons = document.querySelectorAll("#home, #homes");

  let snakeIntervalId = null;

  // Switch to Quiz Game
  gameone.addEventListener("click", () => {
    hideAllScreens();
    game_1.classList.remove("hidden");
    resetQuizGame();
  });

  // Switch to Snake Game
  gametwo.addEventListener("click", () => {
    hideAllScreens();
    game_2.classList.remove("hidden");
    initSnakeGame();
  });

  // Return to game selection
  homeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      hideAllScreens();
      gamesoption.classList.remove("hidden");
      if (snakeIntervalId) {
        clearInterval(snakeIntervalId);
        snakeIntervalId = null;
      }
    });
  });

  function hideAllScreens() {
    gamesoption.classList.add("hidden");
    game_1.classList.add("hidden");
    game_2.classList.add("hidden");
  }

  // Quiz Game Logic
  const option = document.getElementById("choices");
  const questionelement = document.getElementById("question");
  const questioncontainer = document.getElementById("questioncontainer");
  const startbutton = document.getElementById("startbutton");
  const win = document.getElementById("won");
  const restart = document.getElementById("restart");
  const result = document.getElementById("result");
  const quizstart = document.getElementById("quizstart");

  const questions = [
    {
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Mars", "Jupiter", "Uranus", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      question: "What is 2 + 2?",
      options: ["22", "4", "5", "6"],
      correctAnswer: "4",
    },
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      question: "Which animal is known as the 'King of the Jungle'?",
      options: ["Lion", "Tiger", "Elephant", "Giraffe"],
      correctAnswer: "Lion",
    },
    {
      question: "How many continents are there on Earth?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
    },
  ];

  let quizIndex = 0;
  let currentScore = 0;

  function resetQuizGame() {
    quizstart.classList.remove("hidden");
    questioncontainer.classList.add("hidden");
    result.classList.add("hidden");
  }

  startbutton.addEventListener("click", startQuiz);
  restart.addEventListener("click", restartQuiz);

  function startQuiz() {
    quizIndex = 0;
    currentScore = 0;
    quizstart.classList.add("hidden");
    questioncontainer.classList.remove("hidden");
    result.classList.add("hidden");
    showQuestion();
    showOptions();
  }

  function showQuestion() {
    questionelement.textContent = questions[quizIndex].question;
  }

  function showOptions() {
    option.innerHTML = "";
    questions[quizIndex].options.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", checkAnswer);
      option.appendChild(li);
    });
  }

  function checkAnswer(event) {
    const selected = event.target.textContent;
    if (selected === questions[quizIndex].correctAnswer) {
      currentScore++;
    }

    quizIndex++;
    if (quizIndex < questions.length) {
      showQuestion();
      showOptions();
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    questioncontainer.classList.add("hidden");
    result.classList.remove("hidden");
    win.textContent = `You scored ${currentScore} out of ${questions.length}`;
  }

  function restartQuiz() {
    result.classList.add("hidden");
    startQuiz();
  }

  // Snake Game Logic
  let snakeGameOver = false;
  let foodX, foodY;
  let snakeX = 5,
    snakeY = 5;
  let velocityX = 0,
    velocityY = 0;
  let snakeBody = [];
  let snakeScore = 0;
  let highScore = localStorage.getItem("high-score") || 0;
  const scoresElement = document.getElementById("scores");
  const highScoreElement = document.getElementById("highscore");

  function initSnakeGame() {
    // Clear any existing game interval
    if (snakeIntervalId) {
      clearInterval(snakeIntervalId);
    }

    // Reset game state
    snakeGameOver = false;
    snakeX = 5;
    snakeY = 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    snakeScore = 0;
    scoresElement.textContent = `Score: 0`;
    highScoreElement.textContent = `High Score: ${highScore}`;

    // Clear the game board
    document.getElementById("snakarea").innerHTML = "";

    // Set up new game
    updateFoodPosition();
    snakeIntervalId = setInterval(updateSnakeGame, 100);
    document.addEventListener("keydown", changeSnakeDirection);

    // Button controls
    document
      .getElementById("up")
      .addEventListener("click", () =>
        changeSnakeDirection({ key: "ArrowUp" })
      );
    document
      .getElementById("down")
      .addEventListener("click", () =>
        changeSnakeDirection({ key: "ArrowDown" })
      );
    document
      .getElementById("left")
      .addEventListener("click", () =>
        changeSnakeDirection({ key: "ArrowLeft" })
      );
    document
      .getElementById("right")
      .addEventListener("click", () =>
        changeSnakeDirection({ key: "ArrowRight" })
      );
  }

  function updateFoodPosition() {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
  }

  function handleSnakeGameOver() {
    clearInterval(snakeIntervalId);
    snakeIntervalId = null;
    alert(`Game Over! Your score: ${snakeScore}. Press OK to return to menu.`);
    hideAllScreens();
    gamesoption.classList.remove("hidden");
  }

  function changeSnakeDirection(e) {
    if (e.key === "ArrowUp" && velocityY != 1) {
      velocityX = 0;
      velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
      velocityX = -1;
      velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
      velocityX = 1;
      velocityY = 0;
    }
  }

  function updateSnakeGame() {
    if (snakeGameOver) return handleSnakeGameOver();

    let html = `<div class="meat" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeX === foodX && snakeY === foodY) {
      updateFoodPosition();
      snakeBody.push([foodY, foodX]);
      snakeScore++;
      highScore = snakeScore >= highScore ? snakeScore : highScore;
      localStorage.setItem("high-score", highScore);
      scoresElement.textContent = `Score: ${snakeScore}`;
      highScoreElement.textContent = `High Score: ${highScore}`;
    }

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
      snakeGameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
      html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
      if (
        i !== 0 &&
        snakeBody[0][1] === snakeBody[i][1] &&
        snakeBody[0][0] === snakeBody[i][0]
      ) {
        snakeGameOver = true;
      }
    }

    document.getElementById("snakarea").innerHTML = html;
  }
});
