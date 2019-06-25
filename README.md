# define-args [<img src="https://jonneal.dev/js-logo.svg" alt="define-args" width="90" height="90" align="right">][define-args]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[define-args] lets you bind arguments to a function to create another function
of smaller arity.

It is similar to [`bind`], with the exception that `args` will not bind context.

## Browser Usage

Add **define-args** to your document:

```js
<script src="https://unpkg.com/define-args"></script><!-- 312 bytes -->
```

Alternatively, import the browser module script:

```js
import defineArgs from 'https://unpkg.com/define-args/browser.mjs' // 315 bytes
```

Use **define-args** to enable `args()` on any function:

```html
<script>
// creates a function that adds two numbers and supports args()
var addTwoNumbers = defineArgs(function (a, b) { return a + b })

// returns 5, because the arguments are 2 and 3
addTwoNumbers(2, 3) 

// creates an argument-bound function with args(1)
var addOneNumber = defineArgs(addTwoNumbers).args(1)

// returns 3, because the arguments are 1, 2, and 3
addOneNumber(2, 3)
</script>
```

Use **define-args** to extend classes:

```html
<script>
// creates a class that stores a number and supports args()
var StoredNumber = defineArgs(function (number) { this.number = number })

// creates a new StoredNumber, where its "number" is 5
var someStoredNumber = new StoredNumber(5)

// creates an argument-bound class with args(1)
var StoredOne = StoredNumber.args(1)

// creates a new StoredOne, where its "number" is already 1 (and 5 is ignored)
var anotherStoredNumber = new SomeOneNumber(5)

// extends StoredNumber (and StoredOne) with "and"
SomeNumber.prototype.and = function (number) { return this.number + number }

// returns 10, because its "number" is 5 and the argument is 5
someStoredNumber.and(5)

// returns 6, because its "number" is 1 and the argument is 5
anotherStoredNumber.and(5)
</script>
```

The browser script works in all modern browsers, including Internet Explorer 9+.

---

## Node Usage

Add [define-args] to your project:

```bash
npm install define-args
```

Use **define-args** to extend functions:

```js
const defineArgs = require('define-args') // 403 bytes
```

Alternatively, import the module script:

```js
import defineArgs from 'define-args' // 401 bytes
```

Both Node scripts work in Node 8+.

---

## Example Usage: React Component

```jsx
import defineArgs from 'https://unpkg.com/define-args/browser.mjs'

function BoundComponent () {
  const { constructor } = this

  // bind all prototype functions and allow them to predefine arguments
  Object.getOwnPropertyNames(constructor.prototype).forEach(
    name => this[name] !== constructor && typeof this[name] === 'function'
      ? this[name] = defineArgs(this[name].bind(this))
    : null
  )
} BoundComponent.prototype.isReactComponent = {}

class MyComponent extends BoundComponent {
  constructor () {
    super()

    this.state.items = [
      'Defeat Bowser',
      'Save the Princess'
    ]
  }

  remove (index) {
    const prevItems = this.state.items
    const nextItems = prevItems.slice().splice(index, 1)

    this.setState({ items: nextItems })
  }

  render () {
    return (
      <ul>
        this.state.items.map(
          (item, index) => (
            <li key={index}>
              <span>{item}</span>
              <button onClick={this.remove.args(index)}>remove</button>
            </li>
          )
        )
      </ul>
    )
  }
}
```

[cli-img]: https://img.shields.io/travis/jonathantneal/define-args/master.svg
[cli-url]: https://travis-ci.org/jonathantneal/define-args
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/define-args.svg
[npm-url]: https://www.npmjs.com/package/define-args

[`bind`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
[define-args]: https://github.com/jonathantneal/define-args
