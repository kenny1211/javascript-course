///////////////////////////////////////
// Lecture: Hoisting
// calcAge(1990);

// function calcAge(year) {
//   console.log(2016 - year);
// }
// // calcAge function declaration is already available bc of hoisting

// retirement(1990);
// var retirement = function(year) {
//   console.log(65 - (2016 - year));
// };
// // however retirement will not work bc it is a function expression

// // variables
// console.log(age);
// var age = 23; // global execution context
// // in creation phase of variable object, code is scanned for variable declarations and variables are set to undefined

// function foo() {
//   var age = 65;
//   // different execution context
//   console.log(age);
// }

// foo();
// console.log(age);
///////////////////////////////////////

// Lecture: Scoping

// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/

// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/

///////////////////////////////////////
// Lecture: The this keyword

console.log(this); // points to window object

function calcAge(year) {
  console.log(2016 - year);
  console.log(this); // points to window object bc function is attached to global object
}

var john = {
  name: 'John',
  yearOfBirth: 1990,
  calcAge: function() {
    console.log(this); // points to john object
    console.log(2016 - this.yearOfBirth);

    function innerFunction() {
      console.log(this); // points to window object bc it is a regular function not a method of an object
    }
    innerFunction();
  }
};

john.calcAge();

var mike = {
  name: 'Mike',
  yearOfBirth: 1984
};

mike.calcAge = john.calcAge;
mike.calcAge();
