'use strict'

const _ = require('lodash')
const util = require('util')
const events = require('events')
const Promise = require('bluebird')

const internals = {}

internals.identity = () => {}

function Item (attrs, table) {
  events.EventEmitter.call(this)

  this.table = table

  this.set(attrs || {})
}

util.inherits(Item, events.EventEmitter)

Item.prototype.get = function (key) {
  if (key) {
    return this.attrs[key]
  } else {
    return this.attrs
  }
}

Item.prototype.set = function (params) {
  this.attrs = _.merge({}, this.attrs, params)

  return this
}

Item.prototype.save = function (callback) {
  const self = this
  return new Promise((resolve, reject) => {
    callback = callback || internals.identity

    self.table.create(this.attrs, (err, item) => {
      if (err) {
        callback(err)
        return reject(err)
      }

      self.set(item.attrs)

      callback(null, item)
      return resolve(item)
    })
  })
}

Item.prototype.update = function (options, callback) {
  const self = this

  return Promise((resolve, reject) => {
    if (typeof options === 'function' && !callback) {
      callback = options
      options = {}
    }

    options = options || {}
    callback = callback || internals.identity

    self.table.update(this.attrs, options, (err, item) => {
      if (err) {
        callback(err)
        return reject(err)
      }

      if (item) {
        self.set(item.attrs)
      }

      callback(null, item)
      resolve(item)
    })
  })
}

Item.prototype.destroy = function (options, callback) {
  const self = this

  return new Promise((resolve, reject) => {
    if (typeof options === 'function' && !callback) {
      callback = options
      options = {}
    }

    options = options || {}
    callback = callback || internals.identity

    const promisifiedCallback = (err, data) => {
      if (err) {
        callback(err)
        return reject(err)
      }

      callback(null, data)
      resolve(data)
    }

    self.table.destroy(this.attrs, options, promisifiedCallback)
  })
}

Item.prototype.toJSON = function () {
  return _.cloneDeep(this.attrs)
}

Item.prototype.toPlainObject = function () {
  return _.cloneDeep(this.attrs)
}

module.exports = Item
