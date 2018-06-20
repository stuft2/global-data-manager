let global_data = {}

class Manager {
  constructor (id) {
    if (!id) throw new Error('Missing Manager ID parameter')
    if (!isStr(id) && !isNum(id)) throw new Error('Manager ID parameter must be string or number')
    this.id = id
    global_data[this.id] = {}
  }
}

/**
 * Checks if the value is a string
 * @param val
 * @returns {boolean}
 */
const isStr = (val) => typeof val === 'string'

/**
 * Checks if the value is a number
 * @param val
 * @returns {boolean}
 */
const isNum = (val) => typeof val === 'number'

/**
 * Initializes multiple variables by calling the set method for each array element.
 * @param options is an array of arrays, each with two strings, e.g. [[key, value], [key2, value2]]. It may also be an object.
 */
Manager.prototype.init = function (options) {
  if (Object.keys(global_data[this.id]).length !== 0) throw new Error('The silo already has been initialized')

  if (options && typeof options === 'object') Object.assign(global_data[this.id], options)
  else if (options && !Array.isArray(options)) {
    options.forEach((option, index) => {
      // option[0] is key
      // option[1] is value

      // Verifying the integrity of the configuration option structure
      if (!Array.isArray(option)) throw new Error(`Element at index ${index} must be an array`)
      if (option.length < 2) throw new Error(`Element at index ${index} has too few elements. Should contain 2 elements`)
      if (!isStr(option[0])) throw new Error(`Element key at index ${index} must be a string.`)
      // Save the key-value pair in the store
      set(option[0], option[1])
    })
  }
  else throw new Error(`The options passed in must either be an array or an object. Please check the specifications.`)
}

/**
 * Retrieves all the store properties and values
 * @returns the store
 */
Manager.prototype.all = function () {
  return global_data[this.id]
}

/**
 * Retrieves the key-value pair
 * @param key
 * @returns the value of the key in the store
 */
Manager.prototype.fetch = function (key) {
  if (!isStr(key)) throw new Error('Parameter must be a string.')
  return global_data[this.id][key]
}

/**
 * Stores the key-value pair, over-writes the key if it already exists
 * @param key is the store property (must be a string)
 * @param val is the value of this store property
 * @returns the key
 */
Manager.prototype.put = function (key, val) {
  if (!isStr(key)) throw new Error('Parameter must be a string.')
  global_data[this.id][key] = val
  return key
}

/**
 * Creates the key-value pair, will not over-write the key if it already exists
 * @param key is the store property (must be a string)
 * @param val is the value of this store property
 * @returns the key or null
 */
Manager.prototype.create = function (key, val) {
  if (!isStr(key)) throw new Error('Parameter must be a string.')
  if (global_data[this.id][key] === undefined) {
    global_data[this.id][key] = val
    return key
  }
  return null
}

/**
 * Removes the property from the store
 * @param key is the store property (must be a string)
 */
Manager.prototype.erase = function (key) {
  if (!isStr(key)) throw new Error('Parameter must be a string.')
  delete global_data[this.id][key]
}

/**
 * Copy the value from one property to another
 * @param src is the property of the value that you want to copy (must be a string)
 * @param dest is the destination to which the value will be copied (must be a string)
 * @returns the dest
 */
Manager.prototype.copy = function (src, dest) {
  if (!isStr(src) || !isStr(dest)) throw new Error('Parameters must be strings.')
  global_data[this.id][dest] = global_data[this.id][src]
  return dest
}

/**
 * Move the value from one property to another
 * @param src is the property of the value that you want to move (must be a string)
 * @param dest is the destination to which the value will be moved (must be a string)
 * @returns the dest
 */
Manager.prototype.rename = function (src, dest) {
  if (!isStr(src) || !isStr(dest)) throw new Error('Parameters must be strings.')
  if (src !== dest) {
    global_data[this.id][dest] = global_data[this.id][src]
    delete global_data[this.id][src]
  }
  return dest
}

module.exports = Manager