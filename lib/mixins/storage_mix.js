/**
 * Mix storage support
 * @function storageMix
 * @param {function} BaseClass - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const co = require('co')

/** @lends storageMix */
function storageMix (BaseClass) {
  class StorageMixed extends BaseClass {
    get $$storageMixed () {
      return true
    }

    constructor () {
      super(...arguments)
      const s = this
      s._storages = {}
    }

    /**
     * Get storage for a storageKey
     * @param {string} storageKey
     * @returns {Promise.<Object>}
     */
    getStorage (storageKey) {
      const s = this
      return co(function * () {
        let storage = s._storages[ storageKey ]
        if (!storage) {
          storage = s._storages[ storageKey ] = {}
        }
        return storage
      })
    }

    /**
     * Delete a storage
     * @param {string} storageKey
     * @returns {Promise.<boolean>}
     */
    delStorage (storageKey) {
      const s = this
      return co(function * () {
        let exists = s._storages.hasOwnProperty(storageKey)
        if (exists) {
          delete s._storages[ storageKey ]
          return true
        } else {
          return false
        }
      })
    }

    /**
     * Get storage keys
     * @returns {Promise.<string>} key of storage
     */
    storageKeys () {
      const s = this
      return co(function * () {
        return Object.keys(s._storages)
      })
    }
  }

  return StorageMixed
}

module.exports = storageMix
