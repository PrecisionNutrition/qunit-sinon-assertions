import { pluralize, format, formatItems } from './utils';

/**
 * SinonAssertions
 */
export default class SinonAssertions {
  constructor(spy, testContext) {
    this.spy = spy;
    this.testContext = testContext;
  }

  /**
   * @private
   */
  pushResult({ message: msg, result, expected, actual, error }) {
    const message = result
      ? msg || expected
      : `${msg ? `${msg}\n` : ''}${error}`;

    this.testContext.pushResult({ result, expected, actual, message });
  }

  /**
   * Assert `spy` was called at least once.
   *
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).called();
   *
   */
  called(message) {
    const { spy } = this;

    this.pushResult({
      message,
      result: spy.callCount > 0,
      expected: `${spy} was called at least once`,
      actual: `${spy} was not called`,
      error: `Expected ${spy} to be called at least once, but it was not called.`,
    });

    return this;
  }

  /**
   * Assert `spy` was called exactly `count` times.
   *
   * @param {number} count
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).calledTimes();
   *
   */
  calledTimes(count, message) {
    const { spy } = this;
    const expectedTimes = `${count} ${pluralize('time', count)}`;
    const actualTimes = `${spy.callCount} ${pluralize('time', spy.callCount)}`;

    this.pushResult({
      message,
      result: spy.callCount === count,
      expected: `${spy} was called ${expectedTimes}`,
      actual: `${spy} was called ${actualTimes}`,
      error: `Expected ${spy} to be called ${expectedTimes}, but it was called ${actualTimes}.`,
    });

    return this;
  }

  /**
   * Assert `spy` was called exactly once.
   *
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).calledOnce();
   *
   */
  calledOnce(message) {
    return this.calledTimes(1, message);
  }

  /**
   * Assert `spy` was called exactly twice.
   *
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).calledTwice();
   *
   */
  calledTwice(message) {
    return this.calledTimes(2, message);
  }

  /**
   * Assert `spy` was not called.
   *
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).notCalled();
   *
   */
  notCalled(message) {
    return this.calledTimes(0, message);
  }

  /**
   * Assert `spy` was called at least once with `args` (and possibly others).
   *
   * It uses non-strict match. For example `calledWith([5])`
   * will match both `fn(5)` and `fn(5, 5)`.
   *
   * @param {array} args
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).calledWith([arg1, arg2)]);
   * assert.spy(fn).calledWith([sinon.match({ id: 1 })]);
   *
   */
  calledWith(args, message) {
    const { spy } = this;

    const actualState = spy.callCount
      ? `called with: ${formatItems(spy.args).join('\n')}`
      : `not called at all`;

    this.pushResult({
      message,
      result: spy.calledWith(...args),
      expected: `${spy} was called with: ${format(args)}`,
      actual: `${spy} was ${actualState}`,
      error: `Expected ${spy} to be called with: ${format(args)}, but it was ${actualState}.`,
    });

    return this;
  }

  /**
   * Assert `spy` was called at least once with exactly `args`.
   *
   * @param {array} args
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).calledWithExactly([arg1, arg2)]);
   * assert.spy(fn).calledWithExactly([sinon.match({ id: 1 })]);
   *
   */
  calledWithExactly(args, message) {
    const { spy } = this;

    const actualState = spy.callCount
      ? `called with: ${formatItems(spy.args).join('\n')}`
      : `not called at all`;

    this.pushResult({
      message,
      result: spy.calledWithExactly(...args),
      expected: `${spy} was called with: ${format(args)}`,
      actual: `${spy} was ${actualState}`,
      error: `Expected ${spy} to be called with exactly: ${format(args)}, but it was ${actualState}.`,
    });

    return this;
  }

  /**
   * Assert `spy` was never called with `args`.
   *
   * @param {array} args
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).notCalledWith([arg1, arg2)]);
   * assert.spy(fn).notCalledWith([sinon.match({ id: 1 })]);
   *
   */
  notCalledWith(args, message) {
    const { spy } = this;

    this.pushResult({
      message,
      result: !spy.calledWith(...args),
      expected: `${spy} was never called with: ${format(args)}`,
      actual: `${spy} was called with: ${format(args)}`,
      error: `Expected ${spy} to never be called with: ${format(args)}, but it was.`,
    });

    return this;
  }

  /**
   * Assert `spy` was never called with exactly `args`.
   *
   * @param {array} args
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).notCalledWithExactly([arg1, arg2)]);
   * assert.spy(fn).notCalledWithExactly([sinon.match({ id: 1 })]);
   *
   */
  notCalledWithExactly(args, message) {
    const { spy } = this;

    this.pushResult({
      message,
      result: !spy.calledWithExactly(...args),
      expected: `${spy} was never called with: ${format(args)}`,
      actual: `${spy} was called with: ${format(args)}`,
      error: `Expected ${spy} to never be called with exactly: ${format(args)}, but it was.`,
    });

    return this;
  }

  /**
   * Assert `spy` returned `value` at least once.
   *
   * @param {any} value
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).returnedWith(value);
   * assert.spy(fn).returnedWith(sinon.match({ id: 1 }));
   *
   */
  returnedWith(value, message) {
    const { spy } = this;

    this.pushResult({
      message,
      result: spy.returned(value),
      expected: `${spy} returned ${format(value)}`,
      actual: `${spy} returned ${formatItems(spy.returnValues).join('\n')}`,
      error: `Expected ${spy} to return ${format(value)} at least once, but it did not.`,
    });

    return this;
  }

  /**
   * Assert `spy` never returned `value`.
   *
   * @param {any} value
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).didNotReturnWith(value);
   * assert.spy(fn).didNotReturnWith(sinon.match({ id: 1 }));
   *
   */
  didNotReturnWith(value, message) {
    const { spy } = this;

    this.pushResult({
      message,
      result: !spy.returned(value),
      expected: `${spy} did not return ${format(value)}`,
      actual: `${spy} returned ${format(value)}`,
      error: `Expected ${spy} to never return ${format(value)}, but it did.`,
    });

    return this;
  }

  /**
   * Assert `spy` threw at least once.
   *
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).threw();
   *
   */
  threw(message) {
    const { spy } = this;

    this.pushResult({
      message,
      result: spy.threw(),
      expected: `${spy} threw`,
      actual: `${spy} did not throw`,
      error: `Expected ${spy} to throw at least once, but it did not.`,
    });

    return this;
  }

  /**
   * Assert `spy` threw with `exception`.
   *
   * @param {object|string} exception
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).threwWith(exception);
   *
   */
  threwWith(exception, message) {
    const { spy } = this;

    this.pushResult({
      message,
      result: spy.threw(exception),
      expected: `${spy} threw with ${format(exception)}`,
      actual: `${spy} did not throw with ${format(exception)}`,
      error: `Expected ${spy} to throw with ${format(exception)}, but it did not.`,
    });

    return this;
  }

  /**
   * Assert `spy` was last called with `args`.
   *
   * It uses non-strict match. For example `lastCalledWith([5])`
   * will match both `fn(5)` and `fn(5, 5)`.
   *
   * @param {array} args
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).lastCalledWith([arg1, arg2)]);
   * assert.spy(fn).lastCalledWith([sinon.match({ id: 1 })]);
   *
   */
  lastCalledWith(args, message) {
    const { spy } = this;
    const lastCall = spy.getCall(-1);

    const actualState = lastCall
      ? `last called with: ${format(lastCall.args)}`
      : `not called at all`;

    this.pushResult({
      message,
      result: !!lastCall && lastCall.calledWith(...args),
      expected: `${spy} was last called with: ${format(args)}`,
      actual: `${spy} was ${actualState}`,
      error: `Expected ${spy} to be last called with: ${format(args)}, but it was ${actualState}.`,
    });

    return this;
  }

  /**
   * Assert `spy` was last called at least once with exactly `args`.
   *
   * @param {array} args
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).lastCalledWithExactly([arg1, arg2)]);
   * assert.spy(fn).lastCalledWithExactly([sinon.match({ id: 1 })]);
   *
   */
  lastCalledWithExactly(args, message) {
    const { spy } = this;
    const lastCall = spy.getCall(-1);

    const actualState = lastCall
      ? `last called with: ${format(lastCall.args)}`
      : `not called at all`;

    this.pushResult({
      message,
      result: !!lastCall && lastCall.calledWithExactly(...args),
      expected: `${spy} was last called with: ${format(args)}`,
      actual: `${spy} was ${actualState}`,
      error: `Expected ${spy} to be last called with exactly: ${format(args)}, but it was ${actualState}.`,
    });

    return this;
  }

  /**
   * Assert `spy` last returned `value`.
   *
   * @param {any} value
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).lastReturnedWith(value);
   * assert.spy(fn).lastReturnedWith(sinon.match({ id: 1 }));
   *
   */
  lastReturnedWith(value, message) {
    const { spy } = this;
    const lastCall = spy.getCall(-1);

    const actualState = lastCall
      ? `${spy} last call returned ${format(lastCall.returnValue)}`
      : `${spy} was not called at all`;

    this.pushResult({
      message,
      result: !!lastCall && lastCall.returned(value),
      expected: `${spy} last call returned ${format(value)}`,
      actual: actualState,
      error: `Expected ${spy} last call to return ${format(value)}, but ${actualState}.`,
    });

    return this;
  }

  /**
   * Assert `spy` was not last called with `args`.
   *
   * @param {array} args
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).lastNotCalledWith([arg1, arg2)]);
   * assert.spy(fn).lastNotCalledWith([sinon.match({ id: 1 })]);
   *
   */
  lastNotCalledWith(args, message) {
    const { spy } = this;
    const lastCall = spy.getCall(-1);

    const actualState = lastCall
      ? `last called with: ${format(lastCall.args)}`
      : `not called at all`;

    this.pushResult({
      message,
      result: !!lastCall && !lastCall.calledWith(...args),
      expected: `${spy} was not last called with: ${format(args)}`,
      actual: `${spy} was ${actualState}`,
      error: `Expected ${spy} to not be last called with: ${format(args)}, but it was ${actualState}.`,
    });

    return this;
  }

  /**
   * Assert `spy` was not last called with exactly `args`.
   *
   * @param {array} args
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).lastNotCalledWithExactly([arg1, arg2)]);
   * assert.spy(fn).lastNotCalledWithExactly([sinon.match({ id: 1 })]);
   *
   */
  lastNotCalledWithExactly(args, message) {
    const { spy } = this;
    const lastCall = spy.getCall(-1);

    const actualState = lastCall
      ? `last called with: ${format(lastCall.args)}`
      : `not called at all`;

    this.pushResult({
      message,
      result: !!lastCall && !lastCall.calledWithExactly(...args),
      expected: `${spy} was not last called with: ${format(args)}`,
      actual: `${spy} was ${actualState}`,
      error: `Expected ${spy} to not be last called with exactly: ${format(args)}, but it was.`,
    });

    return this;
  }

  /**
   * Assert `spy` last call did not return `value`.
   *
   * @param {any} value
   * @param {string?} message
   *
   * @example
   * assert.spy(fn).lastDidNotReturnWith(value);
   * assert.spy(fn).lastDidNotReturnWith(sinon.match({ id: 1 }));
   *
   */
  lastDidNotReturnWith(value, message) {
    const { spy } = this;
    const lastCall = spy.getCall(-1);

    const actualState = lastCall
      ? `${spy} last call returned ${format(lastCall.returnValue)}`
      : `${spy} was not called at all`;

    this.pushResult({
      message,
      result: !!lastCall && !lastCall.returned(value),
      expected: `${spy} last call did not return ${format(value)}`,
      actual: actualState,
      error: `Expected ${spy} last call not to return ${format(value)}, but it did.`,
    });

    return this;
  }
}
