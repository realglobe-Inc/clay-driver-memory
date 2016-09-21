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
    yield driver.open({})
    yield driver.create('/foo/0', { msg: 'This is foo' })
    assert.deepEqual(yield driver.read('/foo/0'), { msg: 'This is foo' })
    yield driver.update('/foo/0', { msg: 'This is foo 2' })
    let cursor = yield driver.cursor('/foo')
    while (yield cursor.hasNext()) {
      let record = yield cursor.next()
      assert.deepEqual(record, { msg: 'This is foo 2' })
    }
    yield driver.delete('/foo/0')
    yield driver.close({})
  }))
})

/* global describe, before, after, it */
