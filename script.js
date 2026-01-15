let quiz = [];
let currentIndex = 0;
let score = 0;
let time = 15;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

fetch("quiz_5000_questions.json")
  .then((res) => res.json())
  .then((data) => {
    quiz = data;
    loadQuestion();
  });

function loadQuestion() {
  clearInterval(timer);
  time = 15;
  timeEl.innerText = time;
  startTimer();

  const q = quiz[currentIndex];
  questionEl.innerText = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((opt, index) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;
    div.onclick = () => checkAnswer(index, div);
    optionsEl.appendChild(div);
  });

  scoreEl.innerText = `Score: ${score}`;
}

function checkAnswer(index, element) {
  clearInterval(timer);
  const correct = quiz[currentIndex].answer;

  document.querySelectorAll(".option").forEach((opt) => (opt.onclick = null));

  if (index === correct) {
    element.classList.add("correct");
    score++;
  } else {
    element.classList.add("wrong");
    optionsEl.children[correct].classList.add("correct");
  }

  scoreEl.innerText = `Score: ${score}`;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < quiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function startTimer() {
  timer = setInterval(() => {
    time--;
    timeEl.innerText = time;
    if (time === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function showResult() {
  questionEl.innerText = "🎉 Quiz Finished!";
  optionsEl.innerHTML = `<h3>Your Score: ${score} / ${quiz.length}</h3>`;
}
function exitQuiz() {
  const confirmExit = confirm("Are you sure you want to exit the quiz?");
  if (confirmExit) {
    clearInterval(timer);
    questionEl.innerText = "❌ Quiz Exited";
    optionsEl.innerHTML = `
      <h3>Your Score: ${score} / ${quiz.length}</h3>
      <p>Thanks for playing!</p>
    `;
    document.querySelector(".footer").style.display = "none";
  }
}
