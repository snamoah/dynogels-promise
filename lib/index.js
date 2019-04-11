const Promise = require('bluebird')
const dynogels = require('./dynamodb')

Promise.promisifyAll(require('./item').prototype)
Promise.promisifyAll(require('./scan').prototype)
Promise.promisifyAll(require('./table').prototype)
Promise.promisifyAll(require('./query').prototype)
Promise.promisifyAll(require('./parallelScan').prototype)

const dynogelsModel = dynogels.model

dynogels.model = function (name, model) {
  if (model) {
    Promise.promisifyAll(model)
  }

  return dynogelsModel.apply(dynogels, arguments)
}

Promise.promisifyAll(dynogels)

module.exports = dynogels
