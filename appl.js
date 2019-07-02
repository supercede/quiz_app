/*
Declare score
Grab necessary DOM items
when btn clicked, display first question
when btn is clicked, display next question
(Display questions randomly
when a question is displayed delete from list
when you get to last question display score)
Start Over;
*/

const startBtn = document.querySelector(".start");
const quizDOM = document.querySelector(".quiz-container");
let submitBtn;
let val;
const intro = document.querySelector(".intro");
const footer = document.querySelector(".footer");
const scoreDOM = document.getElementById("score");
const errorDOM = document.querySelector(".error");
let nameDOM = document.querySelectorAll(".name");
let homeBtn;
let reward = document.querySelector(".reward");

let name = prompt("Hello, what is your name?");
let score = 0;
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let nums = [...numbers];
let btns;

if (name) {
  nameDOM.forEach(names => (names.innerText = ` ${name}, `));
}

let quizzes = [
  {
    id: 0,
    question: "Who is the president of Nigeria",
    options: {
      a: "Yahaya Bello",
      b: "Mohammadu Buhari",
      c: "Reinhard Bonnke",
      d: "Jaap Stam"
    },
    answer: "Mohammadu Buhari"
  },
  {
    id: 1,
    question: "What is the longest river in the world",
    options: {
      a: "Nile",
      b: "Niger",
      c: "Mississippi",
      d: "Limpopo"
    },
    answer: "Nile"
  },
  {
    id: 2,
    question: "How many continents are in the world",
    options: {
      a: "4",
      b: "5",
      c: "7",
      d: "6"
    },
    answer: "7"
  },
  {
    id: 3,
    question: "One of the following is not a founder of Twitter",
    options: {
      a: "Jack Dorsey",
      b: "Alan Turing",
      c: "Evan Williams",
      d: "Biz Stone"
    },
    answer: "Alan Turing"
  },
  {
    id: 4,
    question: "Google was founded in",
    options: {
      a: "1985",
      b: "1988",
      c: "1995",
      d: "1998"
    },
    answer: "1998"
  },
  {
    id: 5,
    question: "Who designed JavaScript",
    options: {
      a: "Brendan Eich",
      b: "Larry Brin",
      c: "Jesse Lingard",
      d: "Wes Bos"
    },
    answer: "Brendan Eich"
  },
  {
    id: 6,
    question: "One of the following is a code editor",
    options: {
      a: "Parentheses",
      b: "Commas",
      c: "Brackets",
      d: "Periods"
    },
    answer: "Brackets"
  },
  {
    id: 7,
    question: "Who won the 1988 FIFA World Cup",
    options: {
      a: "Italy",
      b: "West Germany",
      c: "Soviet Union",
      d: "Brazil"
    },
    answer: "Brazil"
  },
  {
    id: 8,
    question: "One of the following is not a JavaScript Framework",
    options: {
      a: "OctagonalJS",
      b: "SquareJS",
      c: "CircularJS",
      d: "PolygonJS"
    },
    answer: "OctagonalJS"
  },
  {
    id: 9,
    question: "Steve Jobs died in",
    options: {
      a: "2009",
      b: "2008",
      c: "2011",
      d: "2010"
    },
    answer: "2011"
  }
];

const copy = [...quizzes];

function hideIntro() {
  intro.classList.add("hidden");
  quizDOM.classList.remove("hidden");
  btns = [startBtn, submitBtn];
}

function getAnswer() {
  let checked = document.querySelector(`input[name='quiz']:checked`);
  if (checked == null) {
    score = score;
  } else {
    let ans = {
      id: checked.dataset.quizid,
      answer: checked.value
    };

    copy.forEach(copy => {
      if (copy.id === parseInt(ans.id) && copy.answer === ans.answer) {
        score += 10;
      }
    });
  }
}

function displayQuestion() {
  let num = numbers[Math.floor(Math.random() * (numbers.length - 1))];

  let quizNo = quizzes.filter(quiz => quiz.id === num);
  quizNo = quizNo[0];
  let { a, b, c, d } = quizNo.options;
  let html = `<div class="question">
            <div class="labels">
              <label for="quiz">${quizNo.question}</label>
            </div>
            <ul style="list-style-type: none">
              <li>
                <input type="radio" data-quizid="${
                  quizNo.id
                }" name="quiz" value="${a}" id="${a}" />
                <label for="${a}">${a}</label>
              </li>
              <li>
                <input type="radio" data-quizid="${
                  quizNo.id
                }" name="quiz" value="${b}" id="${b}"/>
                <label for="${b}">${b}</label>
              </li>
              <li>
                <input type="radio" name="quiz" data-quizid="${
                  quizNo.id
                }" value="${c}" id="${c}"/>
                <label for="${c}">${c}</label>
              </li>
              <li>
                <input type="radio" data-quizid="${
                  quizNo.id
                }" name="quiz" data-quizid="${
    quizNo.id
  }" value="${d}" id="${d}" />
                <label for="${d}">${d}</label>
              </li>
            </ul>
            <div class="button"><button class="btn submit">NEXT</button></div>
          </div>`;

  quizDOM.innerHTML = html;

  nextBtn();
  return [quizNo, quizzes, num];
}

function delItem(arr, num) {
  let idArr;
  idArr = arr.map(item => item.id);
  index = idArr.indexOf(num);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}

function removeItem() {
  let display = displayQuestion();
  delItem(display[1], display[2]);
  numbers.splice(numbers.indexOf(display[2]), 1);
}

function init() {
  intro.classList.remove("hidden");
  quizDOM.classList.add("hidden");
  footer.classList.add("hidden");

  score = 0;
  quizzes = [...copy];
  numbers = [...nums];
  name = prompt("Hello, what is your name?");
}

function startOver() {
  quizDOM.classList.add("hidden");
  footer.classList.remove("hidden");

  switch (true) {
    case score <= 100 && score >= 80:
      reward.innerText = "Bravissimo!";
      break;
    case score < 80 && score >= 70:
      reward.innerText = "Bravo";
      break;
    case score < 70 && score >= 50:
      reward.innerText = "Good Work";
      break;
    case score < 50 && score >= 30:
      reward.innerText = "Work Harder";
      break;
    case score < 30:
      reward.innerText = "Oops";
      break;
  }
  scoreDOM.innerText = score + "%";

  homeBtn = document.querySelector(".home");
  homeBtn.addEventListener("click", init);
}

function nextBtn() {
  submitBtn = document.querySelector(".submit");
  submitBtn.addEventListener("click", () => {
    getAnswer();
    hideIntro();
    if (numbers.length == 0) {
      startOver();
    } else {
      removeItem();
    }
  });
}

startBtn.addEventListener("click", () => {
  hideIntro();
  removeItem();
});
