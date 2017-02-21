/**
 * Abstract driver
 * @augments Driver
 * @class MemoryDriver
 */
'use strict'

const co = require('co')
const clayId = require('clay-id')
const { Driver } = require('clay-driver-base')
const clayEntity = require('clay-entity')
const clayCollection = require('clay-collection')
const { storageMix } = require('./mixins')
const { LogPrefixes } = require('clay-constants')
const { filterArray } = require('clay-list-filter')
const { paginateArray, pageToOffsetLimit } = require('clay-list-pager')
const { DRIVER_PREFIX } = LogPrefixes

/** @lends MemoryDriver */
class MemoryDriver extends storageMix(Driver) {

  /** @inheritDoc */
  one (namespace, id) {
    const s = this
    return co(function * () {
      let storage = s.getStorage(namespace)
      return clayEntity(storage[ String(id) ])
    })
  }

  /** @inheritDoc */
  list (namespace, condition = {}) {
    const s = this
    let { filter = {}, page = {} } = condition
    return co(function * () {
      let storage = s.getStorage(namespace)
      let all = Object.keys(storage).map((id) => storage[ id ])
      let filtered = filterArray(all, filter)
      let paginated = paginateArray(filtered, page)
      let { offset, limit } = pageToOffsetLimit(page)
      let entities = paginated.map(clayEntity)
      return clayCollection({
        entities: entities,
        meta: {
          offset,
          limit,
          length: entities.length,
          total: all.length
        }
      })
    })
  }

  /** @inheritDoc */
  create (namespace, attributes) {
    const s = this
    return co(function * () {
      let storage = s.getStorage(namespace)
      let id = clayId()
      let created = Object.assign({ id }, attributes)
      storage[ String(id) ] = clayEntity(created)
      return created
    })
  }

  /** @inheritDoc */
  update (namespace, id, attributes) {
    const s = this
    return co(function * () {
      let storage = s.getStorage(namespace)
      let entity = yield s.one(namespace, id)
      id = entity.id
      storage[ String(id) ] = Object.assign(entity, attributes, { id })
      return clayEntity(entity)
    })
  }

  /** @inheritDoc */
  destroy (namespace, id) {
    const s = this
    let storage = s.getStorage(namespace)
    return co(function * () {
      let found = storage[ String(id) ]
      delete storage[ String(id) ]
      return found ? 1 : 0
    })
  }

}

module.exports = MemoryDriver
