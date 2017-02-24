/**
 * Mixin functions
 * @module mixins
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get namingMix () { return d(require('./naming_mix')) },
  get storageMix () { return d(require('./storage_mix')) }
}
