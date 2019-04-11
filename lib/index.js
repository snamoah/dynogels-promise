const Promise = require('bluebird')
const dynogels = require('./dynamodb')

Promise.promisifyAll(dynogels)

module.exports = dynogels
