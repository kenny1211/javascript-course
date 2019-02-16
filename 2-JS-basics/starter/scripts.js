// VARIABLE TYPES, DECLARATION, AND RULES************************
// var firstName = 'John';
// console.log(firstName);

// var lastName = 'Smith';
// var age = 28;
// var fullAge = true;
// console.log(fullAge);
// var job;
// console.log(job);
// job = techer;
// console.log(job);

// VARIABLE MUTATION AND TYPE COERCION*************************

// var firstName = 'John';
// var age = 28;
// // coercion: will consoloe log everything as a string like age, even though age is an integer
// console.log(`${firstName} ${age}`);

// var job, isMarried;
// job = 'teacher';
// isMarried = false;

// // Variable mutation
// age = 'twenty eight';

// var lastName = prompt('What is his last name');
// console.log(`${firstName} ${lastName}`);

//BASIC OPERATORS **********************************************
// var yearJohn = 2018 - 28;
// var yearMark = 2018 - 33;

// LECTURES PRETTY EASY JUST SKIPPED TO FIRST CODING CHALLENGE: **************
// CODING CHALLENGE 1: ==================
// mass in kg, height in meters
// var johnHeight, markHeight, johnMass, markMass, johnBMI, markBMI;
// johnHeight = 1.6764;
// johnMass = 68.03;
// markMass = 77.11;
// markHeight = 1.79832;
// // calculae BMIs
// bmiCalculator = (height, mass) => mass / (height * height);
// johnBMI = bmiCalculator(johnHeight, johnMass);
// markBMI = bmiCalculator(markHeight, markMass);
// console.log(`Is Mark's BMI higher than John's? ${markBMI > johnBMI}`);

// CODING CHALLENGE 2: ===================
// johnAVG = (89 + 120 + 103) / 3;
// mikeAVG = (119 + 94 + 123) / 3;
// maryAVG = (97 + 134 + 105) / 3;

// console.log(johnAVG, mikeAVG, maryAVG);

// switch (true) {
//   case johnAVG > maryAVG && johnAVG > mikeAVG:
//     console.log('JOHN WINS');
//     break;
//   case maryAVG > johnAVG && maryAVG > mikeAVG:
//     console.log('MARY WINS');
//     break;
//   case mikeAVG > johnAVG && mikeAVG > maryAVG:
//     console.log('MIKE WINS');
//     break;
//   default:
//     console.log('THERE IS A DRAW');
// }

// CODING CHALLENGE 3: ====================
// const foodBills = [124, 48, 268];
// const tipBills = [];
// const totalBills = [];

// tipCalc = bill => {
//   let tip = 0;

//   switch (true) {
//     case bill < 50:
//       return (tip = bill * 0.2);
//     case bill >= 50 && bill < 200:
//       return (tip = bill * 0.15);
//     default:
//       return (tip = bill * 0.1);
//   }
// };

// foodBills.forEach(bill => {
//   tipBills.push(tipCalc(bill));
// });

// for (let i = 0; i < foodBills.length; i++) {
//   totalBills.push(foodBills[i] + tipBills[i]);
// }

// console.log(tipBills);
// console.log(totalBills);

//CODING CHALLENGE 4: ===================

// let john = {
//   mass: 68.03,
//   height: 1.6764,
//   fullName: 'John Smith',
//   bmiCalc: function() {
//     this.bmi = this.mass / Math.pow(this.height, 2);
//     return this.bmi;
//   }
// };

// let mark = {
//   mass: 77.11,
//   height: 1.79832,
//   bmiCalc: function() {
//     this.bmi = this.mass / Math.pow(this.height, 2);
//     return this.bmi;
//   }
// };

// john.bmiCalc();
// mark.bmiCalc();

// CODING CHALLENGE 5: ======================

let john = {
  bills: [124, 48, 268, 180, 42],
  totalTips: [],
  totalBills: [],
  calcTip: function() {
    for (let i = 0; i < this.bills.length; i++) {
      let bill = this.bills[i];

      if (bill < 50) {
        this.totalTips[i] = bill * 0.2;
      } else if (bill >= 50 && bill < 200) {
        this.totalTips[i] = bill * 0.15;
      } else {
        this.totalTips[i] = bill * 0.1;
      }

      this.totalBills[i] = this.totalTips[i] + bill;
    }
  }
};

let mark = {
  bills: [77, 375, 110, 45],
  totalTips: [],
  totalBills: [],
  calcTip: function() {
    for (let i = 0; i < this.bills.length; i++) {
      let bill = this.bills[i];

      if (bill < 100) {
        this.totalTips[i] = bill * 0.2;
      } else if (bill >= 100 && bill < 300) {
        this.totalTips[i] = bill * 0.1;
      } else {
        this.totalTips[i] = bill * 0.25;
      }

      this.totalBills[i] = this.totalTips[i] + bill;
    }
  }
};

calcAvgTip = (tips, person) => {
  let sum = 0;

  for (let i = 0; i < tips.length; i++) {
    sum += tips[i];
  }

  person.averageTip = sum / tips.length;
};

john.calcTip();
mark.calcTip();
calcAvgTip(john.totalTips, john);
calcAvgTip(mark.totalTips, mark);
console.log(john);
console.log(mark);
