'use strict';

describe('Service: signup', function () {

  // load the service's module
  beforeEach(module('supercatApp'));

  // instantiate service
  var signup;
  beforeEach(inject(function (_signup_) {
    signup = _signup_;
  }));

  it('should do something', function () {
    expect(!!signup).toBe(true);
  });

});
