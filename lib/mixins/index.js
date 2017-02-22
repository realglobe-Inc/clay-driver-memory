/**
 * Mixin functions
 * @module mixins
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get storageMix () { return d(require('./storage_mix')) }
}
