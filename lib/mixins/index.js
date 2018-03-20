/**
 * Mixin functions
 * @module mixins
 */

'use strict'

const d = (module) => module && module.default || module

const namingMix = d(require('./naming_mix'))
const storageMix = d(require('./storage_mix'))

module.exports = {
  namingMix,
  storageMix
}
