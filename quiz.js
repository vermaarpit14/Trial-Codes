// quiz.js
document.addEventListener("DOMContentLoaded", function () {
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
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correctAnswer: "Mars",
      fact: "Mars appears red due to iron oxide (rust) on its surface.",
    },
    {
      question: "Which country is home to the Great Pyramid of Giza?",
      options: ["Iraq", "Egypt", "Mexico", "Greece"],
      correctAnswer: "Egypt",
      fact: "The Great Pyramid is the oldest of the Seven Wonders of the Ancient World.",
    },
    {
      question: "What is the largest mammal on Earth?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctAnswer: "Blue Whale",
      fact: "Blue whales can grow up to 100 feet long and weigh 200 tons.",
    },
    {
      question:
        "Which famous painting features a woman with a mysterious smile?",
      options: [
        "The Starry Night",
        "The Scream",
        "Mona Lisa",
        "Girl with a Pearl Earring",
      ],
      correctAnswer: "Mona Lisa",
      fact: "Painted by Leonardo da Vinci, it's displayed in the Louvre Museum.",
    },
    {
      question: "What is the capital of Japan?",
      options: ["Beijing", "Seoul", "Bangkok", "Tokyo"],
      correctAnswer: "Tokyo",
      fact: "Tokyo is the most populous metropolitan area in the world.",
    },
  ];

  let quizIndex = 0;
  let currentScore = 0;

  function startQuiz() {
    quizIndex = 0;
    currentScore = 0;
    quizstart.style.display = "none"; // Hide instead of using hidden class
    questioncontainer.style.display = "block";
    result.style.display = "none";
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
      event.target.style.backgroundColor = "#a8d8a8"; // Green for correct
    } else {
      event.target.style.backgroundColor = "#ffb6b6"; // Red for wrong
    }

    setTimeout(() => {
      quizIndex++;
      if (quizIndex < questions.length) {
        showQuestion();
        showOptions();
      } else {
        endQuiz();
      }
    }, 500); // Brief delay to show feedback
  }

  function endQuiz() {
    questioncontainer.style.display = "none";
    result.style.display = "block";
    win.textContent = `You scored ${currentScore} out of ${questions.length}`;
  }

  function restartQuiz() {
    result.style.display = "none";
    startQuiz();
  }

  startbutton.addEventListener("click", startQuiz);
  restart.addEventListener("click", restartQuiz);
});
