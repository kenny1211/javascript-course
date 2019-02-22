// Function Constructor

var john = {
  name: 'John',
  yearOfBirth: 1990,
  job: 'teacher'
};

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
};

// instantiation: instances of Person object
// new opertaor creates new empty object, then a function is called
// new operator makes it so that the this keyword does not point to global object, but to the function constructor
var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

// new Person objects will inherit the functions, thus we do not have copies of the same function in each instance of the object, rather reference the function
Person.prototype.calculateAge = function() {
  console.log(2016 - this.yearOfBirth);
};

john.calculateAge();
jane.calculateAge();
mark.calculateAge();
