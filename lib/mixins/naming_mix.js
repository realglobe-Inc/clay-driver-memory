/**
 * Mix naming support
 * @function namingMix
 * @param {function} BaseClass - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

/** @lends namingMix */
function namingMix (BaseClass) {
  class NamingMixed extends BaseClass {
    get $$namingMixed () {
      return true
    }
    // TODO Support versioning
    storageKeyToResourceName (resourceName) {
      return String(resourceName)
    }

    resourceNameToStorageKey (storageKey) {
      return String(storageKey)
    }
  }

  return NamingMixed
}

module.exports = namingMix
