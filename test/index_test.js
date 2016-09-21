/**
 * Test case for index.
 * Runs with mocha.
 */
'use strict'

const index = require('../lib/index.js')
const assert = require('assert')
const co = require('co')

describe('index', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Assert index', () => co(function * () {
    assert.ok(index)
    assert.ok(index.create)
    assert.ok(index.MemoryDriver)
  }))
})

/* global describe, before, after, it */
