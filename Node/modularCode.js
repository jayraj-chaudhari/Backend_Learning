//Example of how to create any functionality in Node.js using modular code.

//object.create(null) - creates an object with no prototype, which means it doesn't inherit any properties or methods from Object.prototype.
//This can be useful when you want to create a "clean" object that doesn't have any inherited properties or methods, and you want to avoid potential naming conflicts with inherited properties or methods.

var hashClear = require("./_hashClear"),
  hashDelete = require("./_hashDelete"),
  hashGet = require("./_hashGet"),
  hashHas = require("./_hashHas"),
  hashSet = require("./_hashSet");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
    length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

//here , we are creating a Hash object that can be used to store key-value pairs.
// The Hash object has methods for clearing the hash, deleting a key-value pair,
// getting the value for a key, checking if a key exists, and setting a key-value pair.
// The methods are defined in separate files and are added to the Hash prototype.
//prototype is used to add methods to the Hash object, so that all instances of Hash can use these methods.
//Each method is defined in a separate file and is imported using require().
