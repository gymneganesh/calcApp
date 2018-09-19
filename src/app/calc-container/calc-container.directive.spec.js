
'use strict';

describe('Directive: calcContainer', function() {
  var $compile;
  var $rootScope;
  var element;

  beforeEach(module('app', 'my.templates'));

  beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    var template = $templateCache.get('app/calc-container/calc-container.html');
    $templateCache.put('app/calc-container/calc-container.html', template);
  }));

  it('Replaces the element with the appropriate content', function() {
    element = $compile('<calc-container></calc-container>')($rootScope);
    $rootScope.$digest();
    expect(1).toBe(1);
  });

  it('Should have all valid operations and labels',function(){
    element = $compile('<calc-container></calc-container>')($rootScope);
    $rootScope.$digest();
    var arrLabels = '';
    var validOperations = ['+','-','%','mod','*',1,2,3,4,5,6,7,8,9,0];
    var buttonElements = element.find('button');
    expect(buttonElements).toBeDefined();
    arrLabels += buttonElements.text().replace(/(\r\n|\n|\r)/gm,"");

    validOperations.forEach(function(operation) {
      expect(arrLabels.indexOf(operation)).not.toBe(-1);
    });



  });
});
