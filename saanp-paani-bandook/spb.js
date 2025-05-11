const humanImage = document.getElementById("human");
const computerImage = document.getElementById("computer");
const optionArea = document.getElementById("optionarea");
const scoreDisplay = document.getElementById("score");
const container = document.querySelector(".container ");
const scorer = document.getElementById("scorer");
const options = optionArea.querySelectorAll("img");
let score = 0;
let draw = 0;
let remaining = 0;
options.forEach((image, index) => {
  image.addEventListener("click", () => {
    humanImage.classList.add("start");
    computerImage.classList.add("start");
    scoreDisplay.textContent = "waiting ";

    let time = setTimeout(() => {
      humanImage.classList.remove("start");
      computerImage.classList.remove("start");
      let humanSource = image.src;
      humanImage.querySelector("img").src = humanSource;

      let random = Math.floor(Math.random() * 3);
      let arr = ["assets/saanp.png", "assets/paani.png", "assets/bandook.png"];
      let computerSource = arr[random];
      computerImage.querySelector("img").src = computerSource;
      let cpuvalue = ["R", "P", "S"][random];
      let humanvalue = ["R", "P", "S"][index];
      let result = {
        RR: "DRAW",
        SS: "DRAW",
        PP: "DRAW",
        RP: "SAAP",
        PR: "SAAP",
        SP: "PAANI",
        PS: "PAANI",
        RS: "BANDOOK",
        SR: "BANDOOK",
      };
      let outcome = result[cpuvalue + humanvalue];
      if (cpuvalue === humanvalue) {
        scoreDisplay.textContent = "draw";
        draw++;
      } else {
        scoreDisplay.textContent = `${outcome} wins`;
        remaining++;
        if (
          humanvalue + cpuvalue == "RP" ||
          humanvalue + cpuvalue == "PS" ||
          humanvalue + cpuvalue == "SR"
        ) {
          score++;
          scoreDisplay.textContent = "you won";
        } else {
          scoreDisplay.textContent = "you lose";
        }
      }
      // scoreDisplay.textContent = cpuvalue === humanvalue ? "DRAW" : ${outcome} wins;
      scorer.textContent = `score:${score}/${draw + remaining}`;
    }, 1500);
  });
});
