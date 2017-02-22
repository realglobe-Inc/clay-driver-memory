/**
 * Test case for memoryDriver.
 * Runs with mocha.
 */
'use strict'

const MemoryDriver = require('../lib/memory_driver.js')
const assert = require('assert')
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
    assert.ok(created2.id !== created.id)
    assert.ok(created.id)
    assert.equal(created.username, 'okunishinishi')

    let one = yield driver.one('users', created.id)

    assert.equal(String(created.id), String(one.id))

    let updated = yield driver.update('users', one.id, {
      password: 'hogehoge'
    })
    assert.equal(String(updated.id), String(one.id))
    assert.equal(updated.password, 'hogehoge')

    let list = yield driver.list('users', {
      filter: { username: 'okunishinishi' }
    })
    assert.deepEqual(list.meta, { offset: 0, limit: 100, length: 1, total: 2 })

    let destroyed = yield driver.destroy('users', one.id)
    assert.equal(destroyed, 1)
    let destroyed2 = yield driver.destroy('users', one.id)
    assert.equal(destroyed2, 0)
  }))
})

/* global describe, before, after, it */
