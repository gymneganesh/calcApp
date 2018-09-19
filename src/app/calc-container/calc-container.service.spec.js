'use strict';

describe('test calc container directive', function() {
  beforeEach(module("app"));

  var service;

  beforeEach(inject(function(CalcService) {
    service = CalcService;
  }));

  describe("Add:", function() {
    it("Adding 2 + 2 should equal 4", function() {
      expect(service.add(2, 2)).toEqual(4);
    });
  });

  describe("Divide:", function() {
    it("Dividing 4 by 2 should equal 2", function() {
      expect(service.divide(4, 2)).toEqual(2);
    });
  });

  describe("Multiply:", function() {
    it("Multiplying 2 by 2 should equal 4", function() {
      expect(service.multiply(2, 2)).toEqual(4);
    });
  });

  describe("Subtract:", function() {
    it("Subtracting 2 from 4 should equal 2", function() {
      expect(service.subtract(4, 2)).toEqual(2);
    });
  });

  describe("Modulo:", function() {
    it("Modulo of 4 with 2 shoudl equal 0", function() {
      expect(service.mod(4, 2)).toEqual(0);
    });
  });

});
