/**
 * Mixin functions
 * @module mixins
 */

'use strict'


const namingMix = require('./naming_mix')
const storageMix = require('./storage_mix')

exports.namingMix = namingMix
exports.storageMix = storageMix

module.exports = {
  namingMix,
  storageMix
}
