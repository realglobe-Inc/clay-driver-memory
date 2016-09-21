'use strict'

const { MemoryDriver } = require('clay-driver-memory')

{
  const clayLump = require('clay-lump')
  let lump01 = clayLump({
    driver: new MemoryDriver({})
  })
  /* ... */
}
