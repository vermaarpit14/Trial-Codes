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

  const allQuestions = [
    // Science & Technology (10 questions)
    {
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Mars", "Jupiter", "Venus", "Saturn"],
      correctAnswer: "Mars",
      fact: "Mars appears red due to iron oxide (rust) on its surface.",
    },
    {
      question: "What is the largest mammal on Earth?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
      correctAnswer: "Blue Whale",
      fact: "Blue whales can grow up to 100 feet long and weigh 200 tons.",
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Osmium", "Oxygen", "Oganesson"],
      correctAnswer: "Oxygen",
      fact: "Oxygen makes up about 21% of Earth's atmosphere.",
    },
    {
      question: "What is the hardest natural substance on Earth?",
      options: ["Gold", "Iron", "Diamond", "Quartz"],
      correctAnswer: "Diamond",
      fact: "Diamonds form under high pressure deep within the Earth.",
    },
    {
      question: "Which scientist developed the theory of relativity?",
      options: [
        "Isaac Newton",
        "Albert Einstein",
        "Galileo Galilei",
        "Stephen Hawking",
      ],
      correctAnswer: "Albert Einstein",
      fact: "Einstein published his special theory of relativity in 1905.",
    },
    {
      question: "What is the main component of the Sun?",
      options: ["Liquid lava", "Hydrogen", "Oxygen", "Carbon dioxide"],
      correctAnswer: "Hydrogen",
      fact: "The Sun is about 70% hydrogen and 28% helium by mass.",
    },
    {
      question: "Which planet has the most moons in our solar system?",
      options: ["Jupiter", "Saturn", "Neptune", "Mars"],
      correctAnswer: "Saturn",
      fact: "As of 2023, Saturn has 146 confirmed moons, the most in our solar system.",
    },
    {
      question: "What does 'www' stand for in a website address?",
      options: [
        "World Wide Web",
        "World Web Wide",
        "Web World Wide",
        "Wide World Web",
      ],
      correctAnswer: "World Wide Web",
      fact: "The World Wide Web was invented by Tim Berners-Lee in 1989.",
    },
    {
      question:
        "Which vitamin is produced when the human body is exposed to sunlight?",
      options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
      correctAnswer: "Vitamin D",
      fact: "Sunlight helps your body produce vitamin D, which is important for bone health.",
    },
    {
      question: "What is the study of mushrooms called?",
      options: ["Mycology", "Entomology", "Botany", "Ornithology"],
      correctAnswer: "Mycology",
      fact: "Mycology also includes the study of yeast, molds, and other fungi.",
    },

    // Geography (10 questions)
    {
      question: "Which country is home to the Great Pyramid of Giza?",
      options: ["Iraq", "Egypt", "Mexico", "Greece"],
      correctAnswer: "Egypt",
      fact: "The Great Pyramid is the oldest of the Seven Wonders of the Ancient World.",
    },
    {
      question: "What is the capital of Japan?",
      options: ["Beijing", "Seoul", "Bangkok", "Tokyo"],
      correctAnswer: "Tokyo",
      fact: "Tokyo is the most populous metropolitan area in the world.",
    },
    {
      question: "Which river is the longest in the world?",
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      correctAnswer: "Nile",
      fact: "The Nile is approximately 6,650 km (4,130 miles) long.",
    },
    {
      question: "Which country has the most time zones?",
      options: ["United States", "Russia", "China", "France"],
      correctAnswer: "France",
      fact: "France has 12 time zones due to its overseas territories.",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correctAnswer: "Pacific",
      fact: "The Pacific Ocean covers about 30% of Earth's surface.",
    },
    {
      question: "Which desert is the largest in the world?",
      options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
      correctAnswer: "Antarctic",
      fact: "The Antarctic Desert is the largest, covering about 14 million sq km.",
    },
    {
      question: "Which mountain range separates Europe from Asia?",
      options: ["Andes", "Alps", "Urals", "Himalayas"],
      correctAnswer: "Urals",
      fact: "The Ural Mountains run approximately 2,500 km from north to south.",
    },
    {
      question: "Which country is both an island and a continent?",
      options: ["Greenland", "Madagascar", "Australia", "Iceland"],
      correctAnswer: "Australia",
      fact: "Australia is the smallest continent and the largest island.",
    },
    {
      question: "What is the capital of Canada?",
      options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
      correctAnswer: "Ottawa",
      fact: "Ottawa was chosen as Canada's capital in 1857 by Queen Victoria.",
    },
    {
      question: "Which African country was formerly known as Abyssinia?",
      options: ["Ethiopia", "Sudan", "Kenya", "Tanzania"],
      correctAnswer: "Ethiopia",
      fact: "Ethiopia is one of the oldest countries in the world and was never colonized.",
    },

    // History (10 questions)
    {
      question: "Which ancient civilization built the Machu Picchu complex?",
      options: ["Aztec", "Maya", "Inca", "Olmec"],
      correctAnswer: "Inca",
      fact: "Machu Picchu was built in the 15th century and abandoned during the Spanish conquest.",
    },
    {
      question: "In which year did World War II end?",
      options: ["1943", "1945", "1947", "1950"],
      correctAnswer: "1945",
      fact: "WWII ended on September 2, 1945, with Japan's formal surrender.",
    },
    {
      question: "Who was the first woman to win a Nobel Prize?",
      options: [
        "Marie Curie",
        "Mother Teresa",
        "Rosalind Franklin",
        "Jane Addams",
      ],
      correctAnswer: "Marie Curie",
      fact: "Marie Curie won the Nobel Prize in Physics in 1903 and in Chemistry in 1911.",
    },
    {
      question: "Which empire was ruled by Julius Caesar?",
      options: ["Greek", "Persian", "Roman", "Ottoman"],
      correctAnswer: "Roman",
      fact: "Julius Caesar played a critical role in the rise of the Roman Empire.",
    },
    {
      question: "When did the United States declare independence from Britain?",
      options: ["1776", "1789", "1801", "1812"],
      correctAnswer: "1776",
      fact: "The Declaration of Independence was adopted on July 4, 1776.",
    },
    {
      question: "Who invented the printing press?",
      options: [
        "Leonardo da Vinci",
        "Galileo Galilei",
        "Johannes Gutenberg",
        "Isaac Newton",
      ],
      correctAnswer: "Johannes Gutenberg",
      fact: "Gutenberg's printing press was invented around 1440 in Mainz, Germany.",
    },
    {
      question: "Which ancient wonder was located in Babylon?",
      options: [
        "Great Pyramid",
        "Hanging Gardens",
        "Colossus of Rhodes",
        "Lighthouse of Alexandria",
      ],
      correctAnswer: "Hanging Gardens",
      fact: "The Hanging Gardens' existence is debated by historians.",
    },
    {
      question: "Who was the first president of the United States?",
      options: [
        "Thomas Jefferson",
        "John Adams",
        "George Washington",
        "Benjamin Franklin",
      ],
      correctAnswer: "George Washington",
      fact: "Washington served from 1789 to 1797 and set many presidential precedents.",
    },
    {
      question: "Which year did the Berlin Wall fall?",
      options: ["1985", "1989", "1991", "1993"],
      correctAnswer: "1989",
      fact: "The fall of the Berlin Wall on November 9, 1989, symbolized the end of the Cold War.",
    },
    {
      question: "Who was the first person to walk on the moon?",
      options: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "John Glenn"],
      correctAnswer: "Neil Armstrong",
      fact: "Armstrong stepped onto the moon on July 20, 1969, saying 'That's one small step...'",
    },

    // Politics & Current Affairs (10 questions)
    {
      question:
        "Who is the current Secretary-General of the United Nations (as of 2023)?",
      options: [
        "Ban Ki-moon",
        "António Guterres",
        "Kofi Annan",
        "Boutros Boutros-Ghali",
      ],
      correctAnswer: "António Guterres",
      fact: "Guterres, from Portugal, began his second term in January 2022.",
    },
    {
      question: "Which country hosted the 2022 FIFA World Cup?",
      options: ["Brazil", "Qatar", "Russia", "France"],
      correctAnswer: "Qatar",
      fact: "This was the first World Cup held in the Arab world and during winter.",
    },
    {
      question:
        "How many permanent members are there in the UN Security Council?",
      options: ["5", "10", "15", "20"],
      correctAnswer: "5",
      fact: "The permanent members are China, France, Russia, UK, and USA - each with veto power.",
    },
    {
      question: "Which country recently left the European Union (Brexit)?",
      options: ["France", "Germany", "United Kingdom", "Italy"],
      correctAnswer: "United Kingdom",
      fact: "The UK officially left the EU on January 31, 2020.",
    },
    {
      question: "Who was the first female Prime Minister of the UK?",
      options: [
        "Theresa May",
        "Margaret Thatcher",
        "Angela Merkel",
        "Indira Gandhi",
      ],
      correctAnswer: "Margaret Thatcher",
      fact: "Thatcher served from 1979 to 1990 and was known as the 'Iron Lady'.",
    },
    {
      question: "Which country has the most nuclear weapons?",
      options: ["United States", "Russia", "China", "France"],
      correctAnswer: "Russia",
      fact: "As of 2023, Russia has about 5,889 nuclear warheads, slightly more than the US.",
    },
    {
      question: "What is the currency of Sweden?",
      options: ["Euro", "Krone", "Pound", "Mark"],
      correctAnswer: "Krone",
      fact: "Sweden has kept its currency despite being an EU member.",
    },
    {
      question: "Which country is the world's largest democracy?",
      options: ["United States", "India", "Indonesia", "Brazil"],
      correctAnswer: "India",
      fact: "India has over 900 million eligible voters, the most in the world.",
    },
    {
      question:
        "Who was the first African-American president of the United States?",
      options: [
        "Jesse Jackson",
        "Barack Obama",
        "Colin Powell",
        "Kamala Harris",
      ],
      correctAnswer: "Barack Obama",
      fact: "Obama served two terms from 2009 to 2017.",
    },
    {
      question: "Which country recently changed its name to Türkiye (in 2022)?",
      options: ["Turkey", "Thailand", "Tunisia", "Turkmenistan"],
      correctAnswer: "Turkey",
      fact: "The name change was officially recognized by the UN in June 2022.",
    },

    // Arts & Culture (10 questions)
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
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Jane Austen",
        "Mark Twain",
      ],
      correctAnswer: "William Shakespeare",
      fact: "Shakespeare wrote this tragic love story in the 1590s.",
    },
    {
      question: "Which musical instrument has 88 keys?",
      options: ["Guitar", "Violin", "Piano", "Harp"],
      correctAnswer: "Piano",
      fact: "A standard piano has 52 white keys and 36 black keys.",
    },
    {
      question: "Who painted 'The Starry Night'?",
      options: [
        "Pablo Picasso",
        "Vincent van Gogh",
        "Claude Monet",
        "Salvador Dalí",
      ],
      correctAnswer: "Vincent van Gogh",
      fact: "Van Gogh painted this masterpiece in 1889 while in an asylum.",
    },
    {
      question: "Which country is the origin of the Olympic Games?",
      options: ["Italy", "Egypt", "Greece", "France"],
      correctAnswer: "Greece",
      fact: "The ancient Olympic Games began in Olympia, Greece, in 776 BC.",
    },
    {
      question: "Who is the author of the 'Harry Potter' series?",
      options: [
        "J.R.R. Tolkien",
        "J.K. Rowling",
        "Stephen King",
        "George R.R. Martin",
      ],
      correctAnswer: "J.K. Rowling",
      fact: "The first book was published in 1997 and became a global phenomenon.",
    },
    {
      question: "Which composer wrote 'Für Elise'?",
      options: ["Mozart", "Beethoven", "Bach", "Chopin"],
      correctAnswer: "Beethoven",
      fact: "Beethoven composed this famous piano piece around 1810.",
    },
    {
      question: "In which city is the famous opera house La Scala located?",
      options: ["Paris", "Vienna", "Milan", "Barcelona"],
      correctAnswer: "Milan",
      fact: "La Scala has been one of the world's leading opera houses since 1778.",
    },
    {
      question: "Which artist is known for his melting clocks painting?",
      options: [
        "Pablo Picasso",
        "Salvador Dalí",
        "Andy Warhol",
        "Jackson Pollock",
      ],
      correctAnswer: "Salvador Dalí",
      fact: "The painting is called 'The Persistence of Memory' (1931).",
    },
    {
      question: "What is the national flower of Japan?",
      options: ["Rose", "Cherry Blossom", "Lotus", "Tulip"],
      correctAnswer: "Cherry Blossom",
      fact: "Cherry blossoms (sakura) symbolize the fleeting nature of life in Japanese culture.",
    },
  ];
  let questions = []; // This will hold our randomly selected questions
  let quizIndex = 0;
  let currentScore = 0;

  function getRandomQuestions() {
    // Create a copy of the original array to avoid modifying it
    const questionPool = [...allQuestions];
    const selectedQuestions = [];

    // Select 5 random questions (or all if there are less than 5)
    const count = Math.min(5, questionPool.length);

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * questionPool.length);
      selectedQuestions.push(questionPool[randomIndex]);
      questionPool.splice(randomIndex, 1); // Remove the selected question from the pool
    }

    return selectedQuestions;
  }

  function startQuiz() {
    questions = getRandomQuestions(); // Get new random questions each time
    quizIndex = 0;
    currentScore = 0;
    quizstart.style.display = "none";
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
