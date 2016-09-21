/**
 * Create driver instance
 * @function create
 * @returns {MemoryDriver}
 */
'use strict'

const MemoryDriver = require('./memory_driver')

/** @lends create */
function create (args) {
  return new MemoryDriver(...args)
}

module.exports = create
