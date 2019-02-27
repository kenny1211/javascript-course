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

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
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
    expenseContainer: '.expenses__list'
  };
  return {
    getinput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    addListItem: function(obj, type) {
      var html, newHTML, element;

      // Create HTML string w placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expenseContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace placeholder text w some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = html.replace('%description%', obj.description);
      newHtml = html.replace('%value%', obj.value);
      // insert html into DOM as last child
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
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
  };

  // functions for items
  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get filled input data
    input = UICtrl.getinput();
    // 2. Add item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. Add item to UI
    UICtrl.addListItem(newItem, input.type);
    // 4. Calculate budget
    // 5. Display to UI
  };

  return {
    init: function() {
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
