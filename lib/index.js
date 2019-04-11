const Promise = require('bluebird')
const dynogels = require('./dynamodb')

const dynogelsModel = dyngoels.model

dynogels.model = function (name, model) {
  if (model) {
    Promsie.promisifyAll(model)
  }
  return dynogelsModel.apply(dynogels, arguments)
}

Promise.promisifyAll(dynogels)

module.exports = dynogels
