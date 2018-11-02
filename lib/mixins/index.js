/**
 * Mixin functions
 * @module mixins
 */

'use strict'

const _d = (module) => module && module.default || module

const namingMix = _d(require('./naming_mix'))
const storageMix = _d(require('./storage_mix'))

module.exports = {
  namingMix,
  storageMix
}
