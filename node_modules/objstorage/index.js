//
// Default storage lookups, and clean object to prevent override of build-in
// properties.
//
var has = Object.prototype.hasOwnProperty;
var storage = {};
var clean = {};

/**
 * Calculate the lenght of the storage object.
 *
 * @returns {Number} Lenght
 * @private
 */
function length() {
  var result = 0;

  for (var key in storage) result++;

  return result;
}

/**
 * objStorage is sessionStorage/localStorage backed by an plain Object.
 *
 * @type {Object}
 * @public
 */
var objStorage = module.exports = {
  /**
   * The total number items stored in the storage.
   *
   * @type {Number}
   * @public
   */
  length: length(),

  /**
   * Find an item in the storage.
   *
   * @param {String} key Name of the value we lookup.
   * @returns {String|Null} Found item or null.
   * @public
   */
  getItem: function getItem(key) {
    if (has.call(storage, key)) return storage[key];
    return null;
  },

  /**
   * Add a new item in the storage.
   *
   * @param {String} key Name under which we store the value.
   * @param {String} value Value for the key.
   * @returns {Undefined}
   * @public
   */
  setItem: function setItem(key, value) {
    if (!(key in clean)) {
      storage[key] = value;
    }

    objStorage.length = length();
  },

  /**
   * Remove a single item from the storage.
   *
   * @param {String} key Name of the value we need to remove.
   * @returns {Undefined} Stuff.
   * @pubilc
   */
  removeItem: function removeItem(key) {
    delete storage[key];

    objStorage.length = length();
  },

  /**
   * Completely remove all items from the store.
   *
   * @returns {Undefined}
   * @public
   */
  clear: function clear() {
    storage = {};
    objStorage.length = 0;
  },

  /**
   * Is this storage system supported in the current environment.
   *
   * @type {Boolean}
   * @public
   */
   supported: true
};
