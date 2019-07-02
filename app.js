/*
Declare score
Grab necessary DOM items
when btn clicked, display first question
when btn is clicked, disolay next question

Grab questions from JSON files - async? YES|
(Display questions randomly
when a question is displayed delete from list
when you get to last question display score)


*/
const startBtn = document.querySelector(".start");
const quizDOM = document.querySelector(".quiz-container");
let submitBtn;
const intro = document.querySelector(".intro");

let score = 0;
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Questions {
  static async getquestion() {
    let result = await fetch("quiz.json");
    let data = await result.json();
    let quizzes = data.questions;
    quizzes = quizzes.map(quiz => {
      let { id, question, answer } = quiz;
      let { a, b, c, d } = quiz.options;

      return { id, question, answer, a, b, c, d };
    });
    return quizzes;
  }
}

// async function questions() {
//   let result = await fetch("quiz.json");
//   let data = await result.json();
//   console.log(data);
// }

class DisplayQuestions {
  hideIntro() {
    intro.classList.add("hidden");
    quizDOM.classList.remove("hidden");
    //submitBtn = document.querySelector(".submit");
  }

  async formQuestion() {
    let quizzes = await Questions.getquestion();

    //let num = numbers[Math.floor(Math.random() * (numbers.length - 1))];
    let num = Math.floor(Math.random() * (quizzes.length - 1));
    let quizNo = quizzes[num];
    let html = `<div class="question">
            <div class="labels">
              <label for="quiz">${quizNo.question}</label>
            </div>
            <ul style="list-style-type: none">
              <li>
                <input type="radio" name="quiz" value="${quizNo.a}" id="${
      quizNo.a
    }" />
                <label for="${quizNo.a}">${quizNo.a}</label>
              </li>
              <li>
                <input type="radio" name="quiz" value="${quizNo.b}" id="${
      quizNo.b
    }"/>
                <label for="${quizNo.b}">${quizNo.b}</label>
              </li>
              <li>
                <input type="radio" name="quiz" value="${quizNo.c}" id="${
      quizNo.c
    }"/>
                <label for="${quizNo.c}">${quizNo.c}</label>
              </li>
              <li>
                <input type="radio" name="quiz" value="${quizNo.d}" id="${
      quizNo.d
    }" />
                <label for="${quizNo.d}">${quizNo.d}</label>
              </li>
            </ul>
            <div class="button"><button class="btn submit">NEXT</button></div>
          </div>`;

    quizDOM.innerHTML = html;
    //quizzes.splice(num, 1);
    quizzes = this.delObj(quizNo, quizzes);
    numbers.splice(num, 1);

    console.log(num);
    console.log(numbers);
    console.log(quizzes);
  }

  isEqual(objA, objB) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(objA);
    var bProps = Object.getOwnPropertyNames(objB);
    // If count of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }
    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      // If values of same property are not equal,
      // objects are not equivalent
      if (objA[propName] !== objB[propName]) {
        return false;
      }
    }
    // If we made it this far, objects
    // are considered equivalent
    return true;
  }

  delObj(obj, arr) {
    for (let item = 0; item < arr.length; item++) {
      if (this.isEqual(arr[item], obj) === true) {
        console.log(true);
        arr.splice(arr.indexOf(obj), 1);
      }
    }
    return arr;
  }

  async addQuiz() {
    await this.formQuestion();

    submitBtn = document.querySelector(".submit");
    submitBtn.addEventListener("click", () => {
      this.addQuiz();
    });

    // console.log(num);
    // console.log(quizzes);
  }
  nextQuestion() {
    //this.hideIntro();
    this.addQuiz();

    //this.addQuiz();

    // submitBtn.addEventListener("click", () => {
    //   console.log(submitBtn);
    // });
  }
}

startBtn.addEventListener("click", () => {
  let display = new DisplayQuestions();
  display.hideIntro();
  display.addQuiz();
  //display.nextQuestion();
});

// if (submitBtn !== null) {
//   submitBtn.addEventListener("click", () => {
//     let display = new DisplayQuestions();
//     display.nextQuestion();
//   });
// }
