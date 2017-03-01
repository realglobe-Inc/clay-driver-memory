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

    /**
     * Get storage key from resource name
     * @param {string} resourceName - Name of resource
     * @returns {string}
     */
    storageKeyToResourceName (resourceName) {
      return String(resourceName)
    }

    /**
     * Get resource name from storage key
     * @param {string} storageKey
     * @returns {string}
     */
    resourceNameToStorageKey (storageKey) {
      return String(storageKey)
    }
  }

  return NamingMixed
}

module.exports = namingMix
