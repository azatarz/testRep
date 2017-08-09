const signin = require('../../lib/controllers/users/signin.js');
const assert = require('chai').assert;



describe('Unit Testing Ready object ...', () => {
  it('Should check the status of ready', (done) => {    
    const mock = {
      status(code) {
        assert.equal(code, 200, 'this should return a 200');
      },
      end() {
        done();
      },
      send() {},
    };
    assert.isFunction(signin.signinHandler);
    const r = signin.signinHandler(mock,200)({});
  });
  it('Should check the status of fail if no data found', (done) => {    
    const mock = {
      status(code) {
        assert.equal(code, 404, 'no data found');
      },
      end() {
        done();
      },
      send() {},
    };
    assert.isFunction(signin.signinHandler);
    const r = signin.signinHandler(mock,200)();
  });
});
