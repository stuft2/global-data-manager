/* global describe it beforeEach afterEach */
const {Manager} = require('../dist/index')
const { expect } = require('chai')

describe('Global Data Manager Module', function () {
  let store;
  beforeEach(function () {
    store = Manager();
  })
  describe('Creating a new Manager instance', function () {
    it('should access key-value pairs independently of other Manager instances', function () {
      const store1 = Manager('a')
      const store2 = Manager('b')
      const store2copy = Manager('b')

      store1.put('id', 1)
      store2.put('id', 2)

      expect(store.getId()).to.equal(0);
      expect(store1.getId()).to.equal('a')
      expect(store2.getId()).to.equal('b')

      expect(store.all()).to.deep.equal({})
      expect(store1.all()).to.deep.equal({ id: 1 })
      expect(store2.all()).to.deep.equal({ id: 2 })
      expect(store2copy.all()).to.deep.equal({ id: 2 })
    })
  })

  describe('put and putMany', function () {
    it('should put all the items in the data store', function () {
      const toStore = {
        id: 1,
        name: 'Jose',
        birth: new Date(),
        attributes: {
          hairColor: 'brn',
          ethnicity: 'latin-american'
        }
      }

      const local = store.putMany(toStore)
      expect(local).to.deep.equal(toStore)
      expect(store.all()).to.deep.equal(toStore)

      const item = store.put('id', 2)
      expect(item).to.deep.equal({id: 2})
      expect(store.fetch('id')).to.equal(2)
    })
  })

  describe('create and createMany', function () {
    it('should create all unique items in the data store', function () {
      const toStore = {
        id: 1,
        name: 'Jose',
        birth: new Date(),
        attributes: {
          hairColor: 'brn',
          ethnicity: 'latin-american'
        }
      }

      const result1 = store.createMany(toStore)
      const result2 = store.createMany(toStore)

      expect(result1).to.deep.equal(toStore)
      expect(store.all()).to.deep.equal(toStore)

      const keys = Object.keys(result2)
      expect(keys.length).to.equal(4)
      keys.map(key => {
        expect(result2[key]).to.equal(null)
      })
    })
  })

  describe('erase and eraseMany', function () {
    it('should erase all specified items', function () {
      const toStore = {
        id: 1,
        name: 'Jose',
        birth: new Date(),
        attributes: {
          hairColor: 'brn',
          ethnicity: 'latin-american'
        }
      }

      expect(store.getId()).to.equal(3)

      store.createMany(toStore)
      store.erase('id')
      expect(store.fetch('id')).to.equal(undefined)
      store.eraseMany('birth', 'attributes');
      expect(store.all()).to.deep.equal({name: 'Jose'})
    })
  })

  describe('copy', function () {
    it('should copy the value of source key to the destination key', function () {
      store.put('id', 1)
      const res = store.copy('id', 'count')

      expect(res).to.deep.equal({count: 1})
      expect(store.fetch('count')).to.equal(1)
      expect(store.fetch('id')).to.equal(1)
    })
  })

  describe('rename', function () {
    it('should rename the source key as the destination key', function () {
      store.put('id', 1)
      const res = store.rename('id', 'count')

      expect(res).to.deep.equal({count: 1})
      expect(store.fetch('count')).to.equal(1)
      expect(store.fetch('id')).to.equal(undefined)
    })
  })

  describe('reset', function () {
    it('should copy the value of source key to the destination key', function () {
      store.put('id', 1)
      store.reset()
      expect(store.all()).to.deep.equal({})
    })
  })

  describe('getId', function () {
    it('should return the correct id for the manager', function () {
      const id = 'The Greatest Storage Ever'
      const myStorage = Manager(id)
      expect(myStorage.getId()).to.equal(id)
    })
  })
})