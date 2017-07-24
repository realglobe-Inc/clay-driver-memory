/**
 * Driver to store data on memory
 * @augments Driver
 * @class MemoryDriver
 * @inheritdoc
 */
'use strict'

const clayId = require('clay-id')
const {Driver} = require('clay-driver-base')
const clayEntity = require('clay-entity')
const clayCollection = require('clay-collection')
const {LogPrefixes} = require('clay-constants')
const {filterArray} = require('clay-list-filter')
const {sortArray} = require('clay-list-sorter')
const {paginateArray, pageToOffsetLimit} = require('clay-list-pager')
const {storageMix, namingMix} = require('./mixins')
const {DRIVER_PREFIX} = LogPrefixes
const clayResourceName = require('clay-resource-name')

const MemoryDriverBase = [
  storageMix,
  namingMix
].reduce((Driver, mix) => mix(Driver), Driver)

/** @lends MemoryDriver */
class MemoryDriver extends MemoryDriverBase {

  async one (resourceName, id) {
    const s = this
    const storageKey = s.storageKeyToResourceName(resourceName)
    let storage = await s.getStorage(storageKey)
    let found = storage[String(id)]
    if (!found) {
      return null
    }
    return clayEntity(found)
  }

  async list (resourceName, condition = {}) {
    const s = this
    let {filter = {}, page = {}, sort = []} = condition
    const storageKey = s.storageKeyToResourceName(resourceName)
    let storage = await s.getStorage(storageKey)
    let all = Object.keys(storage).map((id) => storage[id])
    let filtered = filterArray(all, filter)
    let sorted = sortArray(filtered, sort)
    let paginated = paginateArray(sorted, page)
    let {offset, limit} = pageToOffsetLimit(page)
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
  }

  async create (resourceName, attributes) {
    const s = this
    const storageKey = s.storageKeyToResourceName(resourceName)
    const storage = await s.getStorage(storageKey)
    const num = Math.max(
      ...Object.keys(storage).map((id) => Number(storage[id].$$num || 0)),
      0
    ) + 1
    const {id = clayId()} = attributes
    const created = Object.assign({}, {id, $$num: num}, attributes)
    storage[String(id)] = clayEntity(created)
    return created
  }

  async update (resourceName, id, attributes) {
    const s = this
    const storageKey = s.storageKeyToResourceName(resourceName)
    let storage = await s.getStorage(storageKey)
    let entity = await s.one(resourceName, id)
    id = entity.id
    storage[String(id)] = Object.assign(entity, attributes, {id})
    return clayEntity(entity)
  }

  async destroy (resourceName, id) {
    const s = this
    const storageKey = s.storageKeyToResourceName(resourceName)
    const storage = await s.getStorage(storageKey)
    const found = storage[String(id)]
    delete storage[String(id)]
    return found ? 1 : 0
  }

  async drop (resourceName) {
    const s = this
    const storageKey = s.storageKeyToResourceName(resourceName)
    return s.delStorage(storageKey)
  }

  async resources () {
    const s = this
    const storageKeys = await s.storageKeys()
    return storageKeys.map((storageKey) => {
      let resourceName = s.resourceNameToStorageKey(storageKey)
      let {name, domain} = clayResourceName(resourceName)
      return {name, domain}
    })
  }

}

module.exports = MemoryDriver
