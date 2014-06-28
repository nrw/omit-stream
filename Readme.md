# omit-stream [![build status](https://secure.travis-ci.org/nrw/omit-stream.png)](http://travis-ci.org/nrw/omit-stream)

Object stream that omits specified keys from output.

[![testling badge](https://ci.testling.com/nrw/omit-stream.png)](https://ci.testling.com/nrw/omit-stream)

## Example

``` js
var stream = omit('not', 'for', 'output')
var concat = require('concat-stream')
var omit = require('omit-stream')
var assert = require('assert')

stream.pipe(concat(function (body) {
  assert.deepEqual(body, [
    {'a': 'b'},
    {'c': 'd'},
    {'e': 'f'}
  ])
}))

var input = [
  {
    'a': 'b',
    'not': true,
    'for': 100
  },
  {
    'c': 'd',
    'output': 'string'
  },
  {
    'e': 'f',
    'not': 200,
    'output': {type: 'object'}
  }
]

for (var i = 0; i < input.length; i++) {
  stream.write(input[i])
}
stream.end()
```

## Methods

### var stream = omit(keys, to, omit, ...)

Any key passed as an argument will be removed from the object before it is
passed to the next stream.

## License

MIT
