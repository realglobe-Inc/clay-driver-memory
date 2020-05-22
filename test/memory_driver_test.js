/**
 * Test case for memoryDriver.
 * Runs with mocha.
 */
'use strict'

const MemoryDriver = require('../lib/memory_driver.js')
const {ok, equal, deepEqual, strictEqual} = require('assert')

describe('memory-driver', function () {
  this.timeout(30000)

  before(async () => {

  })

  after(async () => {

  })

  it('Memory driver', async () => {
    const driver = new MemoryDriver()
    const created = await driver.create('User', {
      username: 'okunishinishi',
      index: 5
    })

    const created2 = await driver.create('User', {
      username: 'hoge',
      index: 3
    })
    ok(created2.id !== created.id)
    ok(created.id)
    equal(created.username, 'okunishinishi')

    equal(created.$$num, 1)
    equal(created2.$$num, 2)

    const one = await driver.one('User', created.id)

    equal(String(created.id), String(one.id))

    strictEqual(await driver.one('User', '__invalid_id_'), null)

    const updated = await driver.update('User', one.id, {
      password: 'hogehoge'
    })
    equal(String(updated.id), String(one.id))
    equal(updated.password, 'hogehoge')

    const list01 = await driver.list('User', {})
    deepEqual(list01.meta, {offset: 0, limit: 100, length: 2, total: 2})

    const list02 = await driver.list('User', {
      filter: {username: 'okunishinishi'}
    })
    deepEqual(list02.meta, {offset: 0, limit: 100, length: 1, total: 1})

    const list03 = await driver.list('User', {
      page: {size: 1, number: 1}
    })
    deepEqual(list03.meta, {offset: 0, limit: 1, length: 1, total: 2})

    const list04 = await driver.list('User', {
      sort: ['index']
    })
    equal(list04.entities[0].username, 'hoge')

    const list05 = await driver.list('User', {
      sort: ['-index']
    })
    equal(list05.entities[0].username, 'okunishinishi')

    const destroyed = await driver.destroy('User', one.id)
    equal(destroyed, 1)
    const destroyed2 = await driver.destroy('User', one.id)
    equal(destroyed2, 0)

    const resources = await driver.resources()
    deepEqual(resources, [
      {name: 'User', domain: null}
    ])

    equal((await driver.list('User')).meta.total, 1)
    await driver.drop('User')
    equal((await driver.list('User')).meta.total, 0)
  })

  it('Custom id', async () => {
    const driver = new MemoryDriver()
    const org01 = await driver.create('Org', {
      id: '1'
    })
    equal(org01.id, '1')

    const one = await driver.one('Org', org01.id)
    equal(one.id, org01.id)

    await driver.dump(`${__dirname}/../tmp/testing-dump`)
    await driver.close()
  })

})

/* global describe, before, after, it */
