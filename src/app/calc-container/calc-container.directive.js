
(function() {
  'use strict';

  angular
    .module('calc.directives')
    .directive('calcContainer', calcContainer);

  function calcContainer() {
    return {
      restrict: 'E',
      replace: 'true',
      scope: {},
      templateUrl: 'app/calc-container/calc-container.html',
      controllerAs: 'calc',
      bindToController: true,
      controller: function(CalcService) {

        var self = this;
        self.input ='';
        self.add = add;
        self.accum = 0;
        self.buttonClick = buttonClick;
        self.buttonSet = buttonSet();
        self.clear = clear;
        self.decimal = decimal;
        self.divide = divide;
        self.equals = equals;
        self.equalsOnly = false;
        self.equalsOnlyOperand = null;
        self.multiply = multiply;
        self.number = number;
        self.operand = null;
        self.percent = percent;
        self.prevOperator = null;
        self.resetAllowed = false;
        self.sign = sign;
        self.subtract = subtract;


        //add function
        function add() {
          self.prevOperator = 'add';
          self.equalsOnly = false;
          self.resetAllowed = true;
          self.operand = self.accum;
        }

        //set an array of buttons to be processed
        //in object array format for extensibility
        function buttonSet() {
          return [
            [{'type': 'clear', 'value': 'C', 'flex': 1},
              {'type': 'sign', 'value': '±', 'flex': 1},
              {'type': 'percent', 'value': '%', 'flex': 1},
              {'type': 'divide', 'value': '÷', 'flex': 1}],
            [{'type': 'number', 'value': 7, 'flex': 1},
              {'type': 'number', 'value': 8, 'flex': 1},
              {'type': 'number', 'value': 9, 'flex': 1},
              {'type': 'multiply', 'value': '×', 'flex': 1}],
            [{'type': 'number', 'value': 4, 'flex': 1},
              {'type': 'number', 'value': 5, 'flex': 1},
              {'type': 'number', 'value': 6, 'flex': 1},
              {'type': 'subtract', 'value': '-', 'flex': 1}],
            [{'type': 'number', 'value': 1, 'flex': 1},
              {'type': 'number', 'value': 2, 'flex': 1},
              {'type': 'number', 'value': 3, 'flex': 1},
              {'type': 'add', 'value': '+', 'flex': 1}],
            [{'type': 'number', 'value': 0, 'flex': 2},
              {'type': 'decimal', 'value': '.', 'flex': 1},
              {'type': 'equals', 'value': '=', 'flex': 1}]
          ];
        }

        //generic buttonClick function executed when any button is clicked
        //the button object passed as parameter for purposes of calculation
        function buttonClick(button){

          //check to see if object is of type number
          //else, call associated CalcService function

          if(button.type === 'number') {
            if(angular.isDefined(self[button.type])){
              self.input += button.value.toString();
              self[button.type](button.value);
            } else {
              console.log('No associated function for button type:', button.type);
            }
          } else {
            if(angular.isDefined(self[button.type])){
              self[button.type]();
            } else {
              console.log('No associated function for button type:', button.type);
            }
          }
        }

        //clear screen and current accumulator
        function clear() {
          self.accum = CalcService.clear();
          self.equalsOnly = false;
          self.resetAllowed = false;
          self.prevOperator = null;
          self.operand = CalcService.clear();
          self.equalsOnlyOperand = CalcService.clear();
        }

        //setting the previous Operator to decimal incase a user hits a number key
        function decimal(value) {

          self.decimalMode = true;

        }

        //setting the previous Operator to divide and storing the current accumulator as the operand to divide
        function divide() {
          self.prevOperator = 'divide';
          self.equalsOnly = false;
          self.resetAllowed = true;
          self.operand = self.accum;
        }

        //the main computation function that checks to make sure there is a previous Operator before doing anything
        function equals() {

          if(self.prevOperator && self.operand) {

            if(self.equalsOnly && self.resetAllowed) {
              var equalsOnlyReset = CalcService[self.prevOperator](self.operand, self.equalsOnlyOperand);
              self.accum = equalsOnlyReset.toString().length > 11 ? equalsOnlyReset.toExponential(2) : equalsOnlyReset;
            } else if(self.equalsOnly && !self.resetAllowed) {
              var equalsOnlyNoReset = CalcService[self.prevOperator](self.accum, self.equalsOnlyOperand);
              self.accum = equalsOnlyNoReset.toString().length > 11 ? equalsOnlyNoReset.toExponential(2) : equalsOnlyNoReset;
            } else {
              self.equalsOnlyOperand = self.accum;
              self.equalsOnly = true;
              self.resetAllowed = true;
              var firstPress = CalcService[self.prevOperator](self.operand, self.accum);
              self.accum = firstPress.toString().length > 11 ? firstPress.toExponential(2) : firstPress;
            }
            self.operand = self.accum;
          }
        }

        function multiply() {
          self.prevOperator = 'multiply';
          self.equalsOnly = false;
          self.resetAllowed = true;
          self.operand = self.accum;
        }

        //manipulate the value of the accumulator
        function number(value) {
          console.log(value,self.accum);
          if(self.accum === 0 || self.resetAllowed) {
            if(self.decimalMode) {
              if(self.accum%1 === 0 && !self.prevOperator) {
                self.accum = Number(self.accum.toString() + '.' + value.toString());
              } else {
                self.accum = Number( 0 + '.' + value.toString());
              }
              self.decimalMode = false;
              self.resetAllowed = false;
            } else {
              self.accum = value;
            }
          } else {
            if(self.decimalMode) {
              if(self.accum%1 === 0 && !self.prevOperator) {
                self.accum = Number(self.accum.toString() + '.' + value.toString());
              } else {
                self.accum = Number( 0 + '.' + value.toString());
              }
              self.decimalMode = false;
            }else{
              if(((self.accum < 0 && self.accum%1 !== 0) && self.accum.toString().length < 11) ||
                ((self.accum < 0 || self.accum%1 !== 0) && self.accum.toString().length < 10) ||
                ((self.accum > 0 || self.accum%1 === 0) && self.accum.toString().length < 9)) {
                self.accum = Number(self.accum.toString() + value.toString());
              }
            }
          }
        }

        //convert current accumulator to a percentage of 100
        function percent() {
          var value = CalcService.percent(self.accum);
          self.accum = value.toString().length > 11 ? value.toExponential(2) : value;
        }

        //change the sign of the value
        function sign() {
          self.accum = CalcService.sign(self.accum);
        }

        //subtract function
        function subtract() {
          self.prevOperator = 'subtract';
          self.equalsOnly = false;
          self.resetAllowed = true;
          self.operand = self.accum;
        }
      }
    };
  }
})();
