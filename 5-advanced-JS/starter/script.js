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
var personProto = {
  calculateAge: function() {
    console.log(2016 - this.yearOfBirth);
  }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1950;
john.job = 'teacher';

var jane = Object.create(personProto, {
  name: { value: 'Jane' },
  yearOfBirth: { value: 1969 },
  job: { value: 'designer' }
});

// Primitives vs Objects ***************************

// Primitives - actually hold data in variable itself
var a = 23;
var b = a;
a = 46;
console.log(a, b); //a = 46, b = 23

var obj1 = {
  name: 'John',
  age: 26
};

// Objects - contains reference in memory, points to object
var obj2 = obj1;
obj.age = 30;
console.log(obj1.age, obj2.age); //both = 30

// Functions
var age = 27;
var obj = {
  name: 'Jonas',
  city: 'Lisbon'
};

function change(a, b) {
  a = 30;
  b.city = 'San Francisco';
}

change(age, obj);
//when primitive is passed in function a simple copy is created, so when can change a but it will never effect var on outside
// but when we pass obj, we pass reference of obj, so when we change obj inside of function, it is still reflected on the outside
console.log(age, obj.city); //age = 27, city = San Francisco
