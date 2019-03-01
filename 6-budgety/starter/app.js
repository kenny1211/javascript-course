// BUDGET CONTROLLER **************************************************************************************
// only publicTest avaiable to the public, so budget controller only reveals what is returned
// only publicTest can access add and var x because of closures
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;

    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });

    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      // create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new itme based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // push into our data structure
      data.allItems[type].push(newItem);

      // return the new element
      return newItem;
    },
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },
    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      // calculate budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      // calculate percentage of income we spent
      // before calculation add validation so we don't divide percentage by zero
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },
    testing: function() {
      console.log(data);
    }
  };
})();

// USER INTERFACE CONTROLLER ******************************************************************************
// another module: dooes not know about budgetController bc it is encapsulated by an IFFE (separation of concerns)
var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container'
  };
  return {
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    addListItem: function(obj, type) {
      var html, newHTML, element;

      // Create HTML string w placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expenseContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace placeholder text w some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%value%', obj.value);
      newHtml = newHtml.replace('$description$', obj.description);
      // insert html into DOM as last child
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    clearFields: function() {
      var fields, fieldsArr;

      // returns a list, so we must turn it into an array
      fields = document.querySelectorAll(
        `${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current) {
        current.value = '';
      });

      fieldsArr[0].focus();
    },
    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

      // make sure we did not dislpay a negative or zero percentage next to expenses
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

// GOBAL APP CONTROLLER ***************************************************************************************
// the controller bridges the other two modules (budget/UI controllers)
var controller = (function(budgetCtrl, UICtrl) {
  // localize all event listeners into a function
  var setupEventListeners = function() {
    // get DOMstrings
    var DOM = UICtrl.getDOMstrings();
    // set up event listener for click of input value button
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    // set up event listener for return keypress
    document.addEventListener('keypress', function(event) {
      // key code 13 relates to return key and event.which is used in older browsers
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  };

  var updateBudget = function() {
    // 1. Calculate budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    var budget = budgetCtrl.getBudget();
    // 3. Display to UI
    UICtrl.displayBudget(budget);
  };

  // functions for adding items
  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get filled input data
    input = UICtrl.getinput();

    // validation to make sure empty/invalid inputs are not submitted
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add item to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. Add item to UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear Fields
      UICtrl.clearFields();
      // 5. Calculate and update budget
      updateBudget();
    }
  };

  // function to delete items
  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log(itemID);

    if (itemID) {
      //inc-1
      splitID = itemID.split('-');
      type = splitID[0];
      ID = splitID[1];
    }
  };
  return {
    init: function() {
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
