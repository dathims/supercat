'use strict';

describe('Controller: CreateRoomCtrl', function () {

  // load the controller's module
  beforeEach(module('supercatApp'));

  var CreateRoomCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateRoomCtrl = $controller('CreateRoomCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
