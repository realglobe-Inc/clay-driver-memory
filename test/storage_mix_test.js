/**
 * Test case for storageMix.
 * Runs with mocha.
 */
'use strict'

const storageMix = require('../lib/mixins/storage_mix.js')
const assert = require('assert')
const co = require('co')

describe('storage-mix', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Storage mix', () => co(function * () {
    class Base {

    }
    const StorageMixed = storageMix(Base)
    let instance = new StorageMixed()

    assert.ok(instance.getStorage('foo'))
    assert.ok(instance.getStorage('foo') === instance.getStorage('foo'))
  }))
})

/* global describe, before, after, it */
