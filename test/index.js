var test = require('tape')
var concat = require('concat-stream')

var omit = require('../')

test('omits keys', function (t) {

  var stream = omit('not', 'for', 'output')

  stream.pipe(concat(function (body) {
    t.same(body, [
      {'a': 'b'},
      {'c': 'd'},
      {'e': 'f'}
    ])
    t.end()
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
})

test('works empty', function (t) {

  var stream = omit()

  stream.pipe(concat(function (body) {
    t.same(body, [
      {'a': 'b'},
      {'c': 'd'},
      {'e': 'f'}
    ])
    t.end()
  }))

  var input = [
    {'a': 'b'},
    {'c': 'd'},
    {'e': 'f'}
  ]

  for (var i = 0; i < input.length; i++) {
    stream.write(input[i])
  }
  stream.end()
})
