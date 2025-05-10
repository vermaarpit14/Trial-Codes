function handleGameSelection(event, url) {
  event.preventDefault();
  const loaderOverlay = document.getElementById("loaderOverlay");
  loaderOverlay.classList.remove("hidden");
  setTimeout(() => {
    window.location.href = url;
  }, 1500);
}

document.addEventListener("DOMContentLoaded", function () {
  const gameButtons = document.querySelectorAll(".game-buttons button");

  gameButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const gameUrls = {
        gameone: "quiz/quiz.html",
        gametwo: "snake-game/snake.html",
        gamethree: "cricket/cricket.html",
        gamefour: "rock-paper-scissor/rps.html",
      };
      handleGameSelection(e, gameUrls[this.id]);
    });
  });
});
