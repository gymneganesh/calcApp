
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


        //set an array of buttons to be processed
        //in object array format for extensibility
        function buttonSet() {
          return [
            [{'exec': 'allClear', 'value': '','label':'AC'},
              {'exec': 'clearOne', 'value': '','label':'C'},
              {'exec': 'operate','value':'mod', 'label': 'mod'},
              {'exec': 'operate', 'value':'divide','label': '÷'}
            ],
            [{'exec': 'enterInput','value':7, 'label': 7},
              {'exec': 'enterInput','value':8, 'label': 8},
              {'exec': 'enterInput', 'value':9,'label': 9},
              {'exec': 'operate','value':'multiply', 'label': '×'}],
            [{'exec': 'enterInput', 'value':4,'label': 4},
              {'exec': 'enterInput','value':5, 'label': 5},
              {'exec': 'enterInput','value':6, 'label': 6},
              {'exec': 'operate','value':'subtract', 'label': '-'}],
            [{'exec': 'enterInput', 'value':1,'label': 1},
              {'exec': 'enterInput', 'value':2,'label': 2},
              {'exec': 'enterInput','value':3, 'label': 3},
              {'exec': 'operate', 'value':'add','label': '+'}],
            [{'exec': 'enterInput', 'value':0,'label': 0},
              {'exec': 'enterInput', 'value':'.','label': '.'},
              {'exec': 'getResult', 'value':'','label': '='}]
          ];
        }

        //generic buttonClick function executed when any button is clicked
        //the button object passed as parameter for purposes of calculation
        function buttonClick(button){
          self[button.exec](button.value);
        }


      }
    };
  }
})();
