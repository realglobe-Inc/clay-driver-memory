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
      this._storages = {}
    }

    /**
     * Get storage for a storageKey
     * @param {string} storageKey
     * @returns {Promise.<Object>}
     */
    async getStorage (storageKey) {
      let storage = this._storages[storageKey]
      if (!storage) {
        storage = this._storages[storageKey] = {}
      }
      return storage
    }

    /**
     * Delete a storage
     * @param {string} storageKey
     * @returns {Promise.<boolean>}
     */
    async delStorage (storageKey) {
      const s = this
      let exists = this._storages.hasOwnProperty(storageKey)
      if (exists) {
        delete this._storages[storageKey]
        return true
      }
      return false
    }

    /**
     * Get storage keys
     * @returns {Promise.<string>} key of storage
     */
    async storageKeys () {
      return Object.keys(this._storages)
    }
  }

  return StorageMixed
}

module.exports = storageMix
