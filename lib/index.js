/**
 * Clay driver to store data on memory.
 * @module clay-driver-memory
 * @version 1.0.2
 */

'use strict'

const create = require('./create')
const MemoryDriver = require('./memory_driver')

let lib = create.bind(this)

Object.assign(lib, MemoryDriver, {
  create,
  MemoryDriver
})

module.exports = lib
