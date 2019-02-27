// Function Constructor *******

// var john = {
//   name: 'John',
//   yearOfBirth: 1990,
//   job: 'teacher'
// };

// var Person = function(name, yearOfBirth, job) {
//   this.name = name;
//   this.yearOfBirth = yearOfBirth;
//   this.job = job;
// };

// // instantiation: instances of Person object
// // new opertaor creates new empty object, then a function is called
// // new operator makes it so that the this keyword does not point to global object, but to the function constructor
// var john = new Person('John', 1990, 'teacher');
// var jane = new Person('Jane', 1969, 'designer');
// var mark = new Person('Mark', 1948, 'retired');

// // new Person objects will inherit the functions, thus we do not have copies of the same function in each instance of the object, rather reference the function
// Person.prototype.calculateAge = function() {
//   console.log(2016 - this.yearOfBirth);
// };

// john.calculateAge();
// jane.calculateAge();
// mark.calculateAge();

// Object.create ******* different way to prototype
// builds an object that inherits dircetly from the one that passed into the first arg
// versus function constructor: newly created object inherits from constrtutor's protoype property
// Object.create benefit: allows us to implement complex inheritance structures; allows us to direclty specify which object should be a protoype
// MOST POPULAR: function constructors************
// var personProto = {
//   calculateAge: function() {
//     console.log(2016 - this.yearOfBirth);
//   }
// };

// var john = Object.create(personProto);
// john.name = 'John';
// john.yearOfBirth = 1950;
// john.job = 'teacher';

// var jane = Object.create(personProto, {
//   name: { value: 'Jane' },
//   yearOfBirth: { value: 1969 },
//   job: { value: 'designer' }
// });

// Primitives vs Objects ***************************

// Primitives - actually hold data in variable itself
// var a = 23;
// var b = a;
// a = 46;
// console.log(a, b); //a = 46, b = 23

// var obj1 = {
//   name: 'John',
//   age: 26
// };

// // Objects - contains reference in memory, points to object
// var obj2 = obj1;
// obj1.age = 30;
// console.log(obj1.age, obj2.age); //both = 30

// // Functions
// var age = 27;
// var obj = {
//   name: 'Jonas',
//   city: 'Lisbon'
// };

// function change(a, b) {
//   a = 30;
//   b.city = 'San Francisco';
// }

// change(age, obj);
// //when primitive is passed in function a simple copy is created, so when can change a but it will never effect var on outside
// // but when we pass obj, we pass reference of obj, so when we change obj inside of function, it is still reflected on the outside
// console.log(age, obj.city); //age = 27, city = San Francisco

// LECTURE: PASSING FUNCTIONS AS ARGUMENTS
// var years = [1990, 1965, 1937, 2005, 1995];

// function arrayCalc(arr, fn) {
//   var arrRes = [];
//   for (var i = 0; i < arr.length; i++) {
//     arrRes.push(fn(arr[i]));
//   }
//   return arrRes;
// }

// function calcAge(el) {
//   return 2016 - el;
// }

// // calc age is an argument and not immediately invoked thus it is a callback function being eexecuted by arrayCalc
// var allAges = arrayCalc(years, calcAge);
// console.log(allAges);

// function isFullAge(el) {
//   return el >= 18;
// }

// var fullAges = arrayCalc(allAges, isFullAge);
// console.log(fullAges);

// function maxHeartRate(el) {
//   if (el >= 18 && el <= 81) {
//     return Math.round(206.9 - 0.67 * el);
//   } else {
//     return -1;
//   }
// }

// var heartRates = arrayCalc(allAges, maxHeartRate);
// console.log(heartRates);

// // FUNCTIONS RETURNING FUNCTIONS ******************************
// // FIRST CLASS FUNCTIONS
// function interviewQuestion(job) {
//   if (job === 'designer') {
//     return function(name) {
//       console.log(name + ', can you please explain what UX design is?');
//     };
//   } else if (job === 'teacher') {
//     return function(name) {
//       console.log(name + ' what subject do you teach?');
//     };
//   } else {
//     return function(name) {
//       console.log(name + ' hello what do you do');
//     };
//   }
// }

// var teacherQuestion = interviewQuestion('teacher');
// var designerQuestion = interviewQuestion('designer');

// teacherQuestion('John');
// designerQuestion('Jane');

// interviewQuestion('teacher')('Mark');

// //IIFE (IMMEDIATELY INVOKED FUNCTION EXPRESSIONS) ************************
// // function game() {
// //   var score = Math.random() * 10;
// //   console.log(score >= 5);
// // }

// // game();
// // code below is the same as above but written as an IFFE
// (function() {
//   var score = Math.random() * 10;
//   console.log(score >= 5);
// });
// // for data privacy as score is hidden from global scope

// //CLOSURES *************************************************
// //an inner function alays has access to variables and parameters of its outer function even after the outer function has returned

// function interviewQuestionClosures(job) {
//   return function(name) {
//     if (job === 'designer') {
//       console.log(name + ' what is UX design');
//     }
//   };
// }

// interviewQuestionClosures('designer')('Johnny');

// LECTURE BIND CALL AND APPLY **********************************************************
// var john = {
//   name: 'John',
//   age: 26,
//   job: 'teacher',
//   presentation: function(style, timeOfDay) {
//     if (style === 'formal') {
//       console.log(
//         `Good ${timeOfDay}, ladies and gentlemen. My name is ${this.name} and I am ${this.age}`
//       );
//     } else {
//       console.log(
//         `Sup I'm ${this.name} and I'm ${this.age}. I'm a ${this.job}. Have a good ${timeOfDay}`
//       );
//     }
//   }
// };

// var emily = {
//   name: 'Emily',
//   age: 35,
//   job: 'designer'
// };

// john.presentation('formal', 'morning');
// john.presentation.call(emily, 'friendly', 'night');

// var emilyFormal = john.presentation.bind(emily, 'formal');
// emilyFormal('afternoon');
// // example of apply below but we do not enter args as an array so will not actually work
// // john.presentation.apply(emily, ['friendly', 'afternoon]);

// // MORE "REAL" EXAMPLE OF BIND
// var years = [1990, 1965, 1937, 2005, 1995];

// function arrayCalc(arr, fn) {
//   var arrRes = [];
//   for (var i = 0; i < arr.length; i++) {
//     arrRes.push(fn(arr[i]));
//   }
//   return arrRes;
// }

// function calcAge(el) {
//   return 2016 - el;
// }

// // calc age is an argument and not immediately invoked thus it is a callback function being eexecuted by arrayCalc
// var allAges = arrayCalc(years, calcAge);
// console.log(allAges);

// function isFullAge(limit, el) {
//   return el >= limit;
// }

// var fullJapan = arrayCalc(allAges, isFullAge.bind(this, 20));
// console.log(fullJapan);

// CODING CHALLENGE NUMBER SEVEN *********************
(function() {
  function Question(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
  }

  var questionOne = new Question('Is javascript the best?', ['Yes', 'No'], 0);
  var questionTwo = new Question('What day is it?', ['Monday', 'Tuesday'], 0);
  var questionThree = new Question('What day is tomorrow?', ['Monday', 'Tuesday'], 1);

  var questionArray = [questionOne, questionTwo, questionThree];
  var score = 0;

  Question.prototype.displayQuestion = function() {
    console.log(this.question);

    for (var i = 0; i < this.choices.length; i++) {
      console.log(i + ': ' + this.choices[i]);
    }
  };

  Question.prototype.checkAnswer = function(ans) {
    if (ans === this.answer) {
      score++;
      console.log('Correct! Your score is: ' + score + '/n ---------- /n');
    } else {
      score--;
      console.log('Incorrect!/n Your score is: ' + score + '/n ---------- /n');
    }
  };

  function initGame() {
    var n = Math.floor(Math.random() * questionArray.length);
    questionArray[n].displayQuestion();

    var userChoice = parseInt(prompt('Please choose the correct answer'));
    questionArray[n].checkAnswer(userChoice);

    initGame();
  }

  initGame();
})();
