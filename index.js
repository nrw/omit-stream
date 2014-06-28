var through2 = require('through2')
var omit = require('lodash.omit')

module.exports = function () {
  var args = [].slice.call(arguments)

  return through2.obj(function (row, enc, cb) {
    this.push(omit(row, args))
    cb()
  })
}
