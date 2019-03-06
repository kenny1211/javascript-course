// CODING CHALLENGE NUMBER 8
class Town {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Park extends Town {
  constructor(name, buildYear, treeNumber, parkArea) {
    super(name, buildYear);
    this.treeNumber = treeNumber;
    this.parkArea = parkArea;
  }

  treeDensity() {
    let td = this.treeNumber / this.parkArea;
    console.log(`${this.name} has a tree density of ${td} trees per square km`);
  }
}

class Street extends Town {
  constructor(name, buildYear, streetLength = 'undefined') {
    super(name, buildYear);
    this.streetLength = streetLength;
  }

  defineMe() {
    if (this.streetLength === 'undefined') {
      this.streetSize = 'normal';
    } else if (this.streetLength > 10) {
      this.streetSize = 'big';
    } else {
      this.streetSize = 'small';
    }

    console.log(`${this.name}, built in ${this.buildYear}, is a ${this.streetSize} street`);
  }
}

const parkOne = new Park('Ocean Park', 1990, 1000, 50000);
const parkTwo = new Park('Land Park', 1969, 50, 5);
const streetOne = new Street('Land Street', 1957);
const streetTwo = new Street('Ocean Street', 1550, 5);

let allParks = [parkOne, parkTwo];
let allStreets = [streetOne, streetTwo];

let totalParkAges = [];
let avgParkAge, ageOfPark;

allParks.forEach(park => {
  ageOfPark = 2019 - park.buildYear;
  totalParkAges.push(ageOfPark);
});

let sum = 0;
console.log(totalParkAges);
totalParkAges.map(el => (sum += el));
console.log(sum);
avgParkAge = sum / allParks.length;

console.log(`Our ${allParks.length} parks have an average age of ${avgParkAge} years`);
