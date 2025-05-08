const humanImage = document.getElementById('human');
const computerImage = document.getElementById('computer');
const optionArea = document.getElementById('optionarea');
const scoreDisplay = document.getElementById('score');

// Assuming your option images are direct children of optionArea
const options = optionArea.querySelectorAll('img');

options.forEach((image, index) => {
  image.addEventListener('click', () => {
    // Get the source of the clicked image
    let humanSource = image.src;
    humanImage.querySelector("img").src = humanSource;

    // Generate a random choice for the computer
    let random = Math.floor(Math.random() * 3);
    let arr = ["assets/scissor.JPG", "assets/paper.JPG", "assets/rock.JPG"];
    let computerSource = arr[random];
    computerImage.querySelector("img").src = computerSource;
    let cpuvalue = ["R", "P", "S"][random];
    let humanvalue = ["R", "P", "S"][index];
    let result = {
      RR: "DRAW",
      SS: "DRAW",
      PP: "DRAW",
      RP: "PAPER",
      PR: "PAPER",
      SP: "SCISSORS",
      PS: "SCISSORS",
      RS: "ROCK",
      SR: "ROCK"
    };
    let outcome = result[cpuvalue + humanvalue];
    scoreDisplay.textContent = `cpuvalue === humanvalue ? "DRAW" : ${outcome} wins`;
  });
});