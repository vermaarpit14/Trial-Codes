document.addEventListener("DOMContentLoaded", function () {
  // Game state variables
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
  let snakeIntervalId = null;

  // Initialize the game
  function initSnakeGame() {
    // Reset game state
    snakeGameOver = false;
    snakeX = 5;
    snakeY = 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    snakeScore = 0;

    // Update score displays
    scoresElement.textContent = `Score: 0`;
    highScoreElement.textContent = `High Score: ${highScore}`;

    // Clear previous game elements
    document.getElementById("snakarea").innerHTML = "";

    // Place first food and start game loop
    updateFoodPosition();

    // Clear existing interval if any
    if (snakeIntervalId) {
      clearInterval(snakeIntervalId);
    }

    snakeIntervalId = setInterval(updateSnakeGame, 100);
  }

  // Place food at random position
  function updateFoodPosition() {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
  }

  // Handle keyboard controls
  function changeSnakeDirection(e) {
    // Prevent reversing direction
    if (e.key === "ArrowUp" && velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
    }
  }

  // Main game loop
  function updateSnakeGame() {
    if (snakeGameOver) {
      return handleSnakeGameOver();
    }

    let html = `<div class="meat" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Check if snake ate food
    if (snakeX === foodX && snakeY === foodY) {
      updateFoodPosition();
      snakeBody.push([foodX, foodY]);
      snakeScore++;

      // Update high score if needed
      if (snakeScore > highScore) {
        highScore = snakeScore;
        localStorage.setItem("high-score", highScore);
      }

      scoresElement.textContent = `Score: ${snakeScore}`;
      highScoreElement.textContent = `High Score: ${highScore}`;
    }

    // Update snake position
    snakeX += velocityX;
    snakeY += velocityY;

    // Update snake body segments
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
      snakeBody[0] = [snakeX, snakeY];
    }

    // Check wall collisions
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
      snakeGameOver = true;
    }

    // Render snake body
    for (let i = 0; i < snakeBody.length; i++) {
      html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

      // Check self collisions
      if (i !== 0 && snakeBody[i][0] === snakeX && snakeBody[i][1] === snakeY) {
        snakeGameOver = true;
      }
    }

    // Always render head
    html += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;

    document.getElementById("snakarea").innerHTML = html;
  }

  // Handle game over
  function handleSnakeGameOver() {
    clearInterval(snakeIntervalId);
    snakeIntervalId = null;
    setTimeout(() => {
      alert(
        `GAME OVER!     Your score: ${snakeScore}🎖️`
      );
      window.location.href = "snake.html";
    }, 100);
  }

  // Button controls with touch feedback
  const setupButton = (id, key) => {
    const btn = document.getElementById(id);
    btn.addEventListener("click", () => {
      // Visual feedback
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), 100);

      // Change direction
      changeSnakeDirection({ key });
    });
  };

  // Set up control buttons
  setupButton("up", "ArrowUp");
  setupButton("down", "ArrowDown");
  setupButton("left", "ArrowLeft");
  setupButton("right", "ArrowRight");

  // Home button
  document.getElementById("homes").addEventListener("click", () => {
    if (snakeIntervalId) {
      clearInterval(snakeIntervalId);
    }
    window.location.href = "index.html";
  });

  // Keyboard controls
  document.addEventListener("keydown", changeSnakeDirection);

  // Start the game
  initSnakeGame();
});
