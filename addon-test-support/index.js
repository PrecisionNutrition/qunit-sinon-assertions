import QUnit from 'qunit';
import SinonAssertions from './assertions';

QUnit.assert.spy = function (spy) {
  validateSpy(spy);
  return new SinonAssertions(spy, this);
};

function failValidation(spy) {
  throw new Error(`qunit-sinon-assertions: ${spy} is not a spy`);
}

function validateSpy(spy) {
  if (!spy) {
    failValidation(spy);
  }

  if (spy.proxy && spy.proxy.isSinonProxy) {
    validateSpy(spy.proxy);
    return;
  }

  if (typeof spy !== 'function' || typeof spy.getCall !== 'function') {
    failValidation(spy);
  }
}
