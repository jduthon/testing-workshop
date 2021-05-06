# Testing cheatsheet

Summary quick jump

## Jest

### Test setup

`describe` blocks to explain what is going to be tested or set context.

`it` to describe what a test case focuses on.

`beforeEach/beforeAll` for test setup.

`afterEach/afterAll` for test cleanup.

Example:

```javascript
describe('log', () => {
  describe('on staging environment', () => {
    let originalEnv;
    let originalConsoleLog;

    beforeEach(() => {
      originalEnv = process.env;
      process.env = 'staging';

      originalConsoleLog = console.log;
      console.log = jest.fn();
    });

    afterEach(() => {
      console.log = originalConsoleLog;
      process.env = originalEnv;
    });

    it('logs to the browser console', () => {
      log('test');
      expect(console.log).toHaveBeenCalledWith('test');
    });
  });
});
```

## Assertions

`expect(someVariable).assertionMethod` to make assertion on `someVariable`.

Assertion methods:

`toEqual` for loose equality.

`toBe` for strict equality.

`toBeDefined` for verifying a variable is defined.

Inverting assertion with `not`: `expect(someVariable).not.assertionMethod`

[Full documentation](https://jestjs.io/docs/expect)

## Mocks

Mock functions are replacement for functions you have in your code which you don't want to actually invoke in your unit tests.
They allow you to fake specific behavior and make assertions about their history.

You generally create mocks in two ways:

### Mocking modules

To mock modules, you use

```javascript
jest.mock(MODULE_NAME, () => ({
  /* mocked exports */
}));`
```

### Mock functions

To mock functions locally, you use:

`const mockFunction = jest.fn();` to create a mock function in your test file.

You can combine those two ideas, for example to mock a function `foo` from a module `bar`:

```javascript
jest.mock('./bar', () => ({
  foo: jest.fn()
}));`
```

You can change the behavior of the mocks in several ways, the most common being:

Mocking implementation:
`jest.fn().mockImplementation(() => { /* your mocked behavior logic */});`

Mocking implementation in constructor:
`jest.fn(() => { /* your mocked behavior logic */ })`

Mocking return values:
`jest.fn().mockReturnValue('test');`

You can find the full documentation [here](https://jestjs.io/docs/mock-function-api).

### Mock assertions

Mock functions also come with some special abilities when it comes to assertions, especially to verify functions where called, e.g.:

`expect(mockedFunction).hasBeenCalled();`

`expect(mockedFunction).hasBeenCalledWith(arguments);`

`expect(mockedFunction).toHaveBeenCalledTimes(2);`

[Full documentation](https://jestjs.io/docs/expect)

## react-testing-library

React testing library embraces the model of integration testing, where you try to test similarly to how your user use your app, as opposed to testing separate units in isolation.

The main library comes with two main ideas:

1. First we need to render our components
2. We can then access the rendered components to assert or test behavior

### Rendering:

Rendering a component is very simple, here is an example:

```javascript
import { render } from '@testing-library/react';

render(<Converter />);
```

### Accessing the rendered components children

Then, you can access the rendered components children to start testing, for example:

```javascript
import { render } from '@testing-library/react';

const { getByLabelText } = render(<Converter />);
const myInput = getByLabelText('My input:');
expect(myInput).toBeDefined();
```

There are several accessors, for more details full documentation can be found [here](https://testing-library.com/docs/react-testing-library/cheatsheet#queries).

The most useful ones for a quick reference:
`getByLabelText` to match input from their labels.
`getByText` to match any text element.
`getByDisplayValue` to match input elements by their currently displayed value.

### Behavior testing

The recommended way to do behavior testing in react-testing-library is to use `@testing-library/user-event` to simulate user events as close as possible to the browser environment, here examples are probably more useful than a documentation:

```javascript
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

const { getByLabelText } = render(<Converter />);
const myInput = getByLabelText('My input:');
expect(myInput).toBeDefined();
userEvent.type(myInput, '451');
expect(getByText(`Yout typed 451`)).toBeDefined();
```

The most useful events in our case would be:
`userEvent.type` to simulate typing in an input field.
`userEvent.selectOptions` to simulate selecting an option.

[Full documentation here](https://testing-library.com/docs/ecosystem-user-event/)
