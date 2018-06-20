/* global describe it beforeEach afterEach */
const Manager = require('../index')
const { expect } = require('chai')

describe('Global Data Manager Module', function () {
  describe('Creating a new Silo', function () {
    it('should put and fetch key-value pairs independently of other Silo instances', function () {
      const store1 = new Manager()
      const store2 = new Manager()

      store1.put('id', 1)
      store2.put('id', 2)

      expect(store1.fetch('id')).to.equal(1)
      expect(store2.fetch('id')).to.equal(2)
    })
  })
})