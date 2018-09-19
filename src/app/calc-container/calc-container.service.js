(function() {
  'use strict';

  angular
    .module('calc.services')
    .service('CalcService', CalcService);

  function CalcService() {
    var CalcService = {
      add: add,
      divide: divide,
      multiply: multiply,
      subtract: subtract,
      mod: mod
    };

    return CalcService;

    function add(accum, value) {
      return accum + value;
    }

    function mod(accum, value) {
      return accum % value;
    }

    function divide(accum, value) {
      return accum / value;
    }

    function multiply(accum, value) {
      return accum * value;
    }

    function subtract(accum, value) {
      return accum - value;
    }
  }

})();
