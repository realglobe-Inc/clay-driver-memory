/**
 * Driver to store data on memory
 * @augments Driver
 * @class MemoryDriver
 * @inheritdoc
 */
'use strict'

const co = require('co')
const clayId = require('clay-id')
const { Driver } = require('clay-driver-base')
const clayEntity = require('clay-entity')
const clayCollection = require('clay-collection')
const { LogPrefixes } = require('clay-constants')
const { filterArray } = require('clay-list-filter')
const { sortArray } = require('clay-list-sorter')
const { paginateArray, pageToOffsetLimit } = require('clay-list-pager')
const { storageMix, namingMix } = require('./mixins')
const { DRIVER_PREFIX } = LogPrefixes
const clayResourceName = require('clay-resource-name')

const MemoryDriverBase = [
  storageMix,
  namingMix
].reduce((Driver, mix) => mix(Driver), Driver)

/** @lends MemoryDriver */
class MemoryDriver extends MemoryDriverBase {

  one (resourceName, id) {
    const s = this
    let storageKey = s.storageKeyToResourceName(resourceName)
    return co(function * () {
      let storage = yield s.getStorage(storageKey)
      let found = storage[ String(id) ]
      if (!found) {
        return null
      }
      return clayEntity(found)
    })
  }

  list (resourceName, condition = {}) {
    const s = this
    let { filter = {}, page = {}, sort = [] } = condition
    let storageKey = s.storageKeyToResourceName(resourceName)
    return co(function * () {
      let storage = yield s.getStorage(storageKey)
      let all = Object.keys(storage).map((id) => storage[ id ])
      let filtered = filterArray(all, filter)
      let sorted = sortArray(filtered, sort)
      let paginated = paginateArray(sorted, page)
      let { offset, limit } = pageToOffsetLimit(page)
      let entities = paginated.map(clayEntity)
      return clayCollection({
        entities: entities,
        meta: {
          offset,
          limit,
          length: entities.length,
          total: filtered.length
        }
      })
    })
  }

  create (resourceName, attributes) {
    const s = this
    let storageKey = s.storageKeyToResourceName(resourceName)
    return co(function * () {
      let storage = yield s.getStorage(storageKey)
      let id = clayId()
      let created = Object.assign({}, { id }, attributes)
      storage[ String(id) ] = clayEntity(created)
      return created
    })
  }

  update (resourceName, id, attributes) {
    const s = this
    let storageKey = s.storageKeyToResourceName(resourceName)
    return co(function * () {
      let storage = yield s.getStorage(storageKey)
      let entity = yield s.one(resourceName, id)
      id = entity.id
      storage[ String(id) ] = Object.assign(entity, attributes, { id })
      return clayEntity(entity)
    })
  }

  destroy (resourceName, id) {
    const s = this
    let storageKey = s.storageKeyToResourceName(resourceName)
    return co(function * () {
      let storage = yield s.getStorage(storageKey)
      let found = storage[ String(id) ]
      delete storage[ String(id) ]
      return found ? 1 : 0
    })
  }

  drop (resourceName) {
    const s = this
    let storageKey = s.storageKeyToResourceName(resourceName)
    return co(function * () {
      return yield s.delStorage(storageKey)
    })
  }

  resources () {
    const s = this
    return co(function * () {
      let storageKeys = yield s.storageKeys()
      return storageKeys.map((storageKey) => {
        let resourceName = s.resourceNameToStorageKey(storageKey)
        let { name, domain } = clayResourceName(resourceName)
        return { name, domain }
      })
    })
  }

}

module.exports = MemoryDriver
