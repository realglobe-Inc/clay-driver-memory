/**
 * Abstract driver
 * @augments Driver
 * @class MemoryDriver
 */
'use strict'

const { Driver } = require('clay-driver-base')
const co = require('co')
const { has, get, set, remove } = require('json-pointer')
const { LogPrefixes } = require('clay-constants')

const { DRIVER_PREFIX } = LogPrefixes

/** @lends MemoryDriver */
class MemoryDriver extends Driver {
  // ---------------------
  // Basic Interfaces
  // ---------------------
  /**
   * Connect driver
   * @param {Object} config
   * @returns {Promise}
   */
  connect (config = {}) {
    const s = this
    s._connected = true
    s._pool = {}
    return Promise.resolve(s)
  }

  /**
   * Disconnect driver
   * @param {Object} config
   * @returns {Promise}
   */
  disconnect (config = {}) {
    const s = this
    s._connected = false
    s._pool = {}
    return Promise.resolve(s)
  }

  // ---------------------
  // CRUD Interfaces
  // ---------------------

  /**
   * Create data with namepath
   * @param {string} namepath - Namepath string
   * @param {Object} data - Resource data to create
   * @returns {Promise}
   */
  create (namepath, data) {
    const s = this
    return co(function * () {
      s.assertConnected()
      let found = yield s.read(namepath)
      if (found) {
        throw new Error(`${DRIVER_PREFIX} Already used: ${namepath}`)
      }
      let { _pool: pool } = s
      set(pool, namepath, data)
      return s.read(namepath)
    })
  }

  /**
   * Read data with namepath
   * @param {string} namepath - Namepath string
   * @returns {Promise}
   */
  read (namepath) {
    const s = this
    return co(function * () {
      s.assertConnected()
      let { _pool: pool } = s
      return has(pool, namepath) ? get(pool, namepath) : undefined
    })
  }

  /**
   * Update data with namepath
   * @param {string} namepath - Namepath string
   * @param {Object} data - Resource data to create
   * @returns {Promise}
   */
  update (namepath, data) {
    const s = this
    return co(function * () {
      s.assertConnected()
      let found = yield s.read(namepath)
      if (!found) {
        throw new Error(`[clay:memory-driver] Not found: ${namepath}`)
      }
      let { _pool: pool } = s
      set(pool, namepath, data)
      return s.read(namepath)
    })
  }

  /**
   * Delete data with namepath
   * @param {string} namepath - Namepath string
   * @returns {Promise}
   */
  delete (namepath) {
    const s = this
    return co(function * () {
      s.assertConnected()
      let { _pool: pool } = s
      remove(pool, namepath)
    })
  }

  // ---------------------
  // Other Interfaces
  // ---------------------

  /**
   * Get cursor to iterate
   * @param {string} namepath - Namepath string
   * @param {Object} options - Optional settings
   * @returns {Promise.<Driver.Cursor>}
   */
  cursor (namepath, options = {}) {
    const s = this
    let { where = {} } = options
    return co(function * () {
      s.assertConnected()
      let found = yield s.read(namepath)
      let keys = Object.keys(found || {}).filter((key) => {
        let condition = where[ key ]
        if (!condition) {
          return true
        }
        let value = found[ key ]
        let operator = Object.keys(condition)
          .filter((key) => Driver.supportedOperator[ key ])
          .shift()
        if (operator) {
          switch (operator) {
            case '$gte':
              return value >= condition
            case '$gt':
              return value >= condition
            case '$lte':
              return value <= condition
            case '$lt':
              return value <= condition
            case '$not':
              return value !== condition
            case '$is':
              return value === condition
            default: {
              throw new Error(`${DRIVER_PREFIX} Operator not supported: "${operator}"`)
            }
          }
        }
        return value === condition
      })
      return new Driver.Cursor({
        hasNext () {
          return Promise.resolve(
            keys.length > 0
          )
        },
        next () {
          return Promise.resolve(
            found[ keys.shift() ]
          )
        }
      })
    })
  }

  // ---------------------
  // Custom methods
  // ---------------------
  /**
   * Assert that driver connected
   */
  assertConnected () {
    const s = this
    if (!s._connected) {
      throw new Error(`${DRIVER_PREFIX} Driver not open`)
    }
  }
}

module.exports = MemoryDriver
