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
        self.buttonClick = buttonClick;
        self.buttonSet = buttonSet();
        // set initial display
        self.ledDisplay = 0;

        // set to true for concatenation purpose
        self.nextNumber = true;

        self.pendingOperation = null;

        // hold the running total
        self.currentTotal = 0;

        self.pointerExists = 0;

        self.operationIcon = null;

        // set an array of buttons to be processed
        // in object array format for extensibility
        function buttonSet() {
          return [
            [{exec: 'allClear', value: '', label: 'AC'},
              {exec: 'clearOne', value: '', label: 'C'},
              {exec: 'operate', value: 'mod', label: 'mod'},
              {exec: 'operate', value: 'divide', label: '%'}
            ],
            [{exec: 'enterInput', value: 7, label: 7},
              {exec: 'enterInput', value: 8, label: 8},
              {exec: 'enterInput', value: 9, label: 9},
              {exec: 'operate', value: 'multiply', label: '*'}],
            [{exec: 'enterInput', value: 4, label: 4},
              {exec: 'enterInput', value: 5, label: 5},
              {exec: 'enterInput', value: 6, label: 6},
              {exec: 'operate', value: 'subtract', label: '-'}],
            [{exec: 'enterInput', value: 1, label: 1},
              {exec: 'enterInput', value: 2, label: 2},
              {exec: 'enterInput', value: 3, label: 3},
              {exec: 'operate', value: 'add', label: '+'}],
            [{exec: 'enterInput', value: 0, label: 0},
              {exec: 'enterInput', value: '.', label: '.'},
              {exec: 'getResult', value: 'eq', label: '='}]
          ];
        }

        //button click handler
        function buttonClick(button) {
          self[button.exec](button.value);
        }

        self.enterInput = function(value) {
          if (value === "." && self.pointerExists) {
            return false;
          }
          if (value === ".") {
            self.pointerExists = 1;
          }

          if (self.ledDisplay === 0 || self.nextNumber) {
            self.ledDisplay = value;
            self.nextNumber = false;
            self.operationIcon = null;
          } else {
            // Build input Stream on LED.
            self.ledDisplay += String(value);
          }

          // Set Pending value for Calculations
          self.pendingValue = parseFloat(self.ledDisplay);
        };

        //handler when clicking the operations
        self.operate = function(method) {
          if (self.pendingValue) {
            self.currentTotal = self.getCurrentTotal();
            // Once caculated. Do not calcualte again.
            self.pendingValue = null;
            // Set pending operation to passed method
            self.pendingOperation = method;
            self.pointerExists = 0;
            this.setOperationIcon(method);
          } else {
            // No previously entered Number
          }
          // Show current total to led display
          self.ledDisplay = self.currentTotal;
          // Let user enter next number/pending value.
          self.nextNumber = true;
        };

        self.getResult = function() {
          self.currentTotal = self.getCurrentTotal();
          self.ledDisplay = self.currentTotal;
          self.pendingValue = self.currentTotal;
          self.nextNumber = true;
          this.resetPendingOperation();
        };

        self.getCurrentTotal = function() {
          return (self.pendingOperation) ? CalcService[self.pendingOperation](self.currentTotal,self.pendingValue) : self.pendingValue;
        };

        self.allClear = function() {
          self.currentTotal = null;
          self.pendingValue = null;
          self.ledDisplay = 0;
          this.resetPendingOperation();
        };

        self.clearOne = function() {
          if (self.ledDisplay.length > 1) {
            self.ledDisplay = self.ledDisplay.slice(0, -1);
          }
          else {
            self.ledDisplay = 0;
            self.pointerExists = 0;
          }
          self.pendingValue = parseFloat(self.ledDisplay);
        };

        self.resetPendingOperation = function() {
          // set pending oerartion to null
          self.pendingOperation = null;
          // Reset pointer flag. Allow user to add pointer.
          self.pointerExists = 0;
          self.operationIcon = null;
        };

        /**
         * displays the operations Icon on LEd
         */

        self.setOperationIcon = function(method) {
          if (method === "add") {
            self.operationIcon = "+";
          }
          if (method === "subtract") {
            self.operationIcon = "-";
          }
          if (method === "multiply") {
            self.operationIcon = "*";
          }
          if (method === "divide") {
            self.operationIcon = "/";
          }
          if (method === "mod") {
            self.operationIcon = "%";
          }
        };
      }
    };
  }
})();
