function openFeatures(){
  let allElems = document.querySelectorAll('.elem');
let allfullelems = document.querySelectorAll('.fullelem');
let allfullelembtn = document.querySelectorAll('.btn');
allElems.forEach(function(elem){
  elem.addEventListener('click', function(){
         allfullelems[elem.id].style.display = "block";

  });
})

allfullelembtn.forEach(function(btn){
  btn.addEventListener('click', function(){
               allfullelems[btn.id].style.display = "none";

        
  })
  
});
}

openFeatures(); 

// let form = document.querySelector('.addTask form')
// let taskinput = document.querySelector('.addTask form input')
// let tasktextarea = document.querySelector('.addTask form textarea')


// let allTasks = [
//   {
//     task: "Sample Task",
//     details: "This is a sample task detail."
    
//   }
// ]

// form.addEventListener('submit', function(e){
//      e.preventDefault();
// })

let themeBtn = document.querySelector('.theme-toggle');
let icon = document.getElementById('theme-icon');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');

  if(document.body.classList.contains('light-theme')){
    icon.classList.replace('ri-sun-line', 'ri-moon-line');
  }else{
    icon.classList.replace('ri-moon-line', 'ri-sun-line');
  }
});




let form = document.querySelector('.addTask form');
let taskinput = document.querySelector('.addTask form input');
let tasktextarea = document.querySelector('.addTask form textarea');
let allTaskContainer = document.querySelector('.allTask');

let allTasks = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (taskinput.value.trim() === "" || tasktextarea.value.trim() === "") {
    alert("Please enter task and description");
    return;
  }

  // Create task element
  let taskDiv = document.createElement('div');
  taskDiv.classList.add('firstTask');

  let taskTitle = document.createElement('h2');
  taskTitle.innerText = taskinput.value;

  let taskDesc = document.createElement('p');
  taskDesc.innerText = tasktextarea.value;

  let delBtn = document.createElement('button');
  delBtn.innerText = "Delete";

  delBtn.addEventListener('click', function () {
    taskDiv.remove();
  });

  taskDiv.appendChild(taskTitle);
  taskDiv.appendChild(taskDesc);
  taskDiv.appendChild(delBtn);

  allTaskContainer.appendChild(taskDiv);

  // Clear input fields
  taskinput.value = "";
  tasktextarea.value = "";
});

// Daily Planner Feature
let planInput = document.getElementById('planInput');
let addPlan = document.getElementById('addPlan');
let planList = document.getElementById('planList');

addPlan.addEventListener('click', function () {
  if (planInput.value.trim() === "") return;

  let li = document.createElement('li');

  let span = document.createElement('span');
  span.innerText = planInput.value;

  let delBtn = document.createElement('button');
  delBtn.innerText = "Delete";
  delBtn.classList.add('delete-plan');

  delBtn.addEventListener('click', function () {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  planList.appendChild(li);

  planInput.value = "";
});

// Pomodoro Timer Feature
let timerDisplay = document.getElementById('timerDisplay');
let startBtn = document.getElementById('startTimer');
let pauseBtn = document.getElementById('pauseTimer');
let resetBtn = document.getElementById('resetTimer');

let totalTime = 25 * 60;
let interval = null;

function updateTimer() {
  let minutes = Math.floor(totalTime / 60);
  let seconds = totalTime % 60;
  timerDisplay.innerText =
    `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

startBtn.addEventListener('click', function () {
  if (interval !== null) return;

  interval = setInterval(() => {
    if (totalTime > 0) {
      totalTime--;
      updateTimer();
    } else {
      clearInterval(interval);
      interval = null;
      alert("Pomodoro Complete 🍅");
    }
  }, 100);
});

pauseBtn.addEventListener('click', function () {
  clearInterval(interval);
  interval = null;
});

resetBtn.addEventListener('click', function () {
  clearInterval(interval);
  interval = null;
  totalTime = 25 * 60;
  updateTimer();
});

updateTimer();


// Quiz App Feature

const questions = [
  {
    q: "HTML ka full form kya hai?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Home Tool Markup Language",
      "Hyperlinks Text ML"
    ],
    answer: 0
  },
  {
    q: "CSS ka use kis liye hota hai?",
    options: ["Logic", "Structure", "Styling", "Database"],
    answer: 2
  },
  {
    q: "JavaScript kis type ki language hai?",
    options: ["Compiled", "Interpreted", "Assembly", "Low level"],
    answer: 1
  }
];

let current = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const questionEl = document.getElementById("question");
const options = document.querySelectorAll(".Quiz-App .option");
const nextBtn = document.getElementById("nextQuestion");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const progress = document.querySelector(".progress");
const restartBtn = document.getElementById("restartQuiz");

function startTimer() {
  timeLeft = 10;
  timerEl.innerText = `⏱️ ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `⏱️ ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      nextBtn.disabled = false;
    }
  }, 1000);
}

function loadQuestion() {
  clearInterval(timerInterval);
  startTimer();

  let q = questions[current];
  questionEl.innerText = q.q;

  options.forEach((btn, i) => {
    btn.className = "option";
    btn.innerText = q.options[i];
    btn.disabled = false;

    btn.onclick = () => {
      clearInterval(timerInterval);

      options.forEach(b => (b.disabled = true));

      if (i === q.answer) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("wrong");
        options[q.answer].classList.add("correct");
      }

      nextBtn.disabled = false;
    };
  });

  progress.style.width = `${((current + 1) / questions.length) * 100}%`;
  nextBtn.disabled = true;
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
};

function endQuiz() {
  questionEl.innerText = "Quiz Completed 🎉";
  document.querySelector(".options").style.display = "none";
  timerEl.style.display = "none";
  nextBtn.style.display = "none";

  scoreEl.innerText = `Score: ${score}/${questions.length}`;
  restartBtn.style.display = "inline-block";
}

restartBtn.onclick = () => {
  current = 0;
  score = 0;
  document.querySelector(".options").style.display = "grid";
  timerEl.style.display = "block";
  nextBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
  scoreEl.innerText = "";
  loadQuestion();
};

loadQuestion();

const rpsButtons = document.querySelectorAll(".RPS-App .choices button");
const userChoiceText = document.getElementById("user-choice");
const compChoiceText = document.getElementById("computer-choice");
const resultText = document.getElementById("game-result");

const rpsOptions = ["rock", "paper", "scissors"];

rpsButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const userChoice = btn.dataset.choice;
    const compChoice = rpsOptions[Math.floor(Math.random() * 3)];

    userChoiceText.textContent = "Your Choice: " + userChoice;
    compChoiceText.textContent = "Computer Choice: " + compChoice;

    if(userChoice === compChoice){
      resultText.textContent = "It's a Draw 🤝";
    }
    else if(
      (userChoice === "rock" && compChoice === "scissors") ||
      (userChoice === "paper" && compChoice === "rock") ||
      (userChoice === "scissors" && compChoice === "paper")
    ){
      resultText.textContent = "You Win 🎉";
    }
    else{
      resultText.textContent = "You Lose 😢";
    }
  });
});


