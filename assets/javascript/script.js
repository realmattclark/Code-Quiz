var currentQuestion = 0;
var time = questions.length * 15;
var timer;

var questions = document.getElementById("questions");
var timerEl = document.getElementById("time");
var submitBtn = document.getElementById("submit");
var choices = document.getElementById("choices");
var feedback = document.getElementById("feedback");
var startBtn = document.getElementById("start");
var initials = document.getElementById("initials");


function startQuiz() {
    var startScreen = document.getElementById("start");
    startScreen.setAttribute("class", "hide");

    questions.removeAttribute("class");

    timer = setInterval(clockTick, 1000);

    timerEl.textContent = time;
    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    var title = document.getElementById("question-title");
    title.textContent = currentQuestion.title;

    choices.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
        var choice = document.getElementById("button");
        choice.setAttribute("class", "choice");
        choice.setAttribute("value", choice);

        choice.textContent = i + 1 + "." + choice;

        choice.onClick = questionClick
        choice.appendChild(choice);
    })
};

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      // penalize time
      time -= 15;
  
      if (time < 0) {
        time = 0;
      }
  
      timer.textContent = time;
      feedback.textContent = "Wrong!";
    } else {
      feedback.textContent = "Correct!";
    }
      feedback.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
  
    // move to next question
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
};

function quizEnd() {
    clearInterval(timerId);
  
    var endScreen = document.getElementById("end-screen");
    endScreen.removeAttribute("class");
  
    var finalScore = document.getElementById("final-score");
    finalScore.textContent = time;
  
    // hide questions section
    questions.setAttribute("class", "hide");
  }
  
  function clockTick() {
    time--;
    timerEl.textContent = time;
  
    if (time === 0) {
      quizEnd();
    }
  };

function saveHighscore() {

    var initials = initials.value.trim();
  
    if (initials !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      var newScore = {
        score: time,
        initials: initials
      };
  
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));

      
      window.location.href = "highscores.html";
    }
};

function scoreInput(event) {
    if(event.key === "Enter") {
        saveHighscore();
    }
}

submitBtn.onClick = saveHighscore;
startBtn.onClick = startQuiz;

initials.onkeyup = scoreInput;