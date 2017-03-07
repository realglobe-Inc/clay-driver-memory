/**
 * Test case for memoryDriver.
 * Runs with mocha.
 */
'use strict'

const MemoryDriver = require('../lib/memory_driver.js')
const { ok, equal, deepEqual, strictEqual } = require('assert')
const co = require('co')

describe('memory-driver', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Memory driver', () => co(function * () {
    let driver = new MemoryDriver()
    let created = yield driver.create('users', {
      username: 'okunishinishi'
    })
    let created2 = yield driver.create('users', {
      username: 'hoge'
    })
    ok(created2.id !== created.id)
    ok(created.id)
    equal(created.username, 'okunishinishi')

    let one = yield driver.one('users', created.id)

    equal(String(created.id), String(one.id))

    strictEqual(yield driver.one('users', '__invalid_id_'), null)

    let updated = yield driver.update('users', one.id, {
      password: 'hogehoge'
    })
    equal(String(updated.id), String(one.id))
    equal(updated.password, 'hogehoge')

    let list01 = yield driver.list('users', {})
    deepEqual(list01.meta, { offset: 0, limit: 100, length: 2, total: 2 })

    let list02 = yield driver.list('users', {
      filter: { username: 'okunishinishi' }
    })
    deepEqual(list02.meta, { offset: 0, limit: 100, length: 1, total: 1 })

    let list03 = yield driver.list('users', {
      page: { size: 1, number: 1 }
    })
    deepEqual(list03.meta, { offset: 0, limit: 1, length: 1, total: 2 })

    let destroyed = yield driver.destroy('users', one.id)
    equal(destroyed, 1)
    let destroyed2 = yield driver.destroy('users', one.id)
    equal(destroyed2, 0)

    let resources = yield driver.resources()
    deepEqual(resources, [
      { name: 'users', domain: null }
    ])

    equal((yield driver.list('users')).meta.total, 1)
    yield driver.drop('users')
    equal((yield driver.list('users')).meta.total, 0)
  }))
})

/* global describe, before, after, it */
