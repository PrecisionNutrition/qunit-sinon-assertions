# qunit-sinon-assertions

`Sinon` assertions for `QUnit` with custom messages support and friendly default ones.

**Why not just use `assert.ok(spy.calledOnce, 'spy was called')`?**

- the addon provides a lot more context in case of a failing test
- it has user-friendly default messages, so you don't have to write your own in simple cases

Let's say we have this test code:

```js
const emitStub = sinon.stub().named('emit');
emitStub('model-loaded-worng');

assert.ok(
  emitStub.calledWithExactly('model-loaded'),
  'emit was called with "loaded"'
);

assert.spy(emitStub).calledWithExactly(['model-loaded']);
```

The `assert.ok` approach doesn't give you any context:

![before](https://user-images.githubusercontent.com/1476221/84959583-d09dcf00-b129-11ea-8352-6016e65ede3a.png)

The `assert.spy` provides more context:

![after](https://user-images.githubusercontent.com/1476221/84959688-0ba00280-b12a-11ea-9410-067bc5e92455.png)

Let's say we were lazy and didn't write custom messages:

```js
const emitStub = sinon.stub().named('emit').returns('no way');
emitStub('model-loaded-worng');

assert.ok(emitStub.calledWithExactly('model-loaded'));
assert.ok(emitStub.returned('job is done!'));

assert
  .spy(emitStub)
  .calledWithExactly(['model-loaded'])
  .returnedWith('job is done!');
```

The `assert.ok` one will look like this:

![before](https://user-images.githubusercontent.com/1476221/84959905-8ec15880-b12a-11ea-9e09-24b71b3c626c.png)

The `assert.spy` will be:

![after](https://user-images.githubusercontent.com/1476221/84959916-97b22a00-b12a-11ea-83f7-482e53b52194.png)

## Installation

First, install the addon:

```
yarn add -D qunit-sinon-assertions
```

Next, import `qunit-sinon-assertions` module anywhere in your `tests/test-helper.js` file:

```js
// This will make `assert.spy()` API available in your tests.
import setupSinonAssert from 'qunit-sinon-assertions';
setupSinonAssert(QUnit.assert);
```

It's also recommended to install [`ember-sinon-qunit`](https://github.com/elwayman02/ember-sinon-qunit) to get automatic sinon cleanup after each test. With both addons your config can look like this:

```js
import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import setupSinon from 'ember-sinon-qunit';
import setupSinonAssert from 'qunit-sinon-assertions';

setApplication(Application.create(config.APP));

setupSinon();
setupSinonAssert(QUnit.assert);

start();
```

## Usage

It's possible to chain assertions:

```js
assert.spy(fn)
  .calledTwice('should be called twice')
  .calledWith([arg1, arg2], 'with these args')
  .returnedWith(value);
```

You can use [Sinon matchers](https://sinonjs.org/releases/latest/matchers/) with most assertions like this:

```js
assert.spy(fn).didNotReturnWith(sinon.match({ id: 1 }));
```

Here is an example of using the assertions in a real project: [ember-on-resize-modifier tests](https://github.com/PrecisionNutrition/ember-on-resize-modifier/blob/master/tests/integration/modifiers/on-resize-test.js)

Name your stand alone `spies` for better error messages:

```js
this.onResize = sinon.spy().named('onResize');
assert.spy(this.onResize).calledOnce();

// For methods it's not needed:
let obj = { method() {} };
let methodSpy = sinon.spy(obj, 'method');
```

Here are all available assertions (feel free to add more):

```js
assert.spy(fn).called(message);
assert.spy(fn).notCalled(message);

assert.spy(fn).calledTimes(count, message);
assert.spy(fn).calledOnce(message);
assert.spy(fn).calledTwice(message);

assert.spy(fn).calledWith([arg1, arg2], message);
assert.spy(fn).notCalledWith([arg1, arg2], message);

assert.spy(fn).calledWithExactly([arg1, arg2], message);
assert.spy(fn).notCalledWithExactly([arg1, arg2], message);

assert.spy(fn).returnedWith(value, message);
assert.spy(fn).didNotReturnWith(value, message);

assert.spy(fn).threw(message);
assert.spy(fn).threwWith(exception, message);

assert.spy(fn).lastCalledWith([arg1, arg2], message);
assert.spy(fn).lastNotCalledWith([arg1, arg2], message);

assert.spy(fn).lastCalledWithExactly([arg1, arg2], message);
assert.spy(fn).lastNotCalledWithExactly([arg1, arg2], message);

assert.spy(fn).lastReturnedWith(value, message);
assert.spy(fn).lastDidNotReturnWith(value, message);
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
