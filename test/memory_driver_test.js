/**
 * Test case for memoryDriver.
 * Runs with mocha.
 */
'use strict'

const MemoryDriver = require('../lib/memory_driver.js')
const {ok, equal, deepEqual, strictEqual} = require('assert')
const co = require('co')

describe('memory-driver', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Memory driver', () => co(function * () {
    const driver = new MemoryDriver()
    const created = yield driver.create('User', {
      username: 'okunishinishi',
      index: 5
    })

    const created2 = yield driver.create('User', {
      username: 'hoge',
      index: 3
    })
    ok(created2.id !== created.id)
    ok(created.id)
    equal(created.username, 'okunishinishi')

    equal(created.$$num, 1)
    equal(created2.$$num, 2)

    const one = yield driver.one('User', created.id)

    equal(String(created.id), String(one.id))

    strictEqual(yield driver.one('User', '__invalid_id_'), null)

    let updated = yield driver.update('User', one.id, {
      password: 'hogehoge'
    })
    equal(String(updated.id), String(one.id))
    equal(updated.password, 'hogehoge')

    let list01 = yield driver.list('User', {})
    deepEqual(list01.meta, {offset: 0, limit: 100, length: 2, total: 2})

    let list02 = yield driver.list('User', {
      filter: {username: 'okunishinishi'}
    })
    deepEqual(list02.meta, {offset: 0, limit: 100, length: 1, total: 1})

    let list03 = yield driver.list('User', {
      page: {size: 1, number: 1}
    })
    deepEqual(list03.meta, {offset: 0, limit: 1, length: 1, total: 2})

    let list04 = yield driver.list('User', {
      sort: ['index']
    })
    equal(list04.entities[0].username, 'hoge')

    let list05 = yield driver.list('User', {
      sort: ['-index']
    })
    equal(list05.entities[0].username, 'okunishinishi')

    let destroyed = yield driver.destroy('User', one.id)
    equal(destroyed, 1)
    let destroyed2 = yield driver.destroy('User', one.id)
    equal(destroyed2, 0)

    let resources = yield driver.resources()
    deepEqual(resources, [
      {name: 'User', domain: null}
    ])

    equal((yield driver.list('User')).meta.total, 1)
    yield driver.drop('User')
    equal((yield driver.list('User')).meta.total, 0)
  }))

  it('Custom id', () => co(function * () {
    let driver = new MemoryDriver()
    let org01 = yield driver.create('Org', {
      id: '1'
    })
    equal(org01.id, '1')

    let one = yield driver.one('Org', org01.id)
    equal(one.id, org01.id)
  }))
})

/* global describe, before, after, it */
