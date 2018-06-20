/* global describe it beforeEach afterEach */
const Manager = require('../index')
const { expect } = require('chai')

describe('Global Data Manager Module', function () {
  describe('Creating a new Manager instance', function () {
    it('should access key-value pairs independently of other Manager instances', function () {
      const store1 = new Manager(1)
      const store2 = new Manager('2')
      const store2copy = new Manager('2')

      store1.put('id', 1)
      store2.put('id', 2)

      expect(store1.all()).to.deep.equal({ id: 1 })
      expect(store2.all()).to.deep.equal({ id: 2 })
      expect(store2copy.all()).to.deep.equal({ id: 2 })
    })
  })
})