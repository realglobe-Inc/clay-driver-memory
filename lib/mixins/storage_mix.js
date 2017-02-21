/**
 * Mix storage support
 * @function storageMix
 * @param {function} BaseClass - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

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
     * Get storage for a namespace
     * @param {string} namespace
     * @returns {*}
     */
    getStorage (namespace) {
      const s = this
      let storage = s._storages[ namespace ]
      if (!storage) {
        storage = s._storages[ namespace ] = {}
      }
      return storage
    }
  }

  return StorageMixed
}

module.exports = storageMix
