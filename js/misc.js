var Storage = function(nid) {
    this.nid = nid;
};

global.Storage = Storage;

/**
 * Returns the **persistent** global storage object. Data is saved between launches.
 *
 * @return {Object} A storage object.
 * @memberOf Storage
 */

global._persistent_storage = null;
Storage.persistent = function() {
    if (_persistent_storage != null)
        return _persistent_storage;
    
    _persistent_storage = new Storage(objc_msgSendSync("controller", "js_persistentStorage"));
    return _persistent_storage;
};


/**
 * Returns the **transient** global storage object. Data is deleted when the app is quit.
 *
 * @return {Object} A storage object.
 * @memberOf Storage
 */
global._transient_storage = null;
Storage.transient = function() {
    if (_transient_storage != null)
        return _transient_storage;
    
    _transient_storage = new Storage(objc_msgSendSync("controller", "js_transientStorage"));
    return _transient_storage;
};


/**
 * Retrieves a value in the storage.
 *
 * @param {String} k the key to retrieve.
 * @return {Object} the value for the given key.
 * @memberOf Storage
 */
Storage.prototype.get = function(k) {
    return objc_msgSendSync(this.nid, "valueForKey:", k);
};

/**
 * Sets a value in the storage.
 *
 * @param {String} k the key to set.
 * @param {Object} v the value to set it to (can be anything).
 * @memberOf Storage
 */
Storage.prototype.set = function(k, v) {
    objc_msgSend(this.nid, "setValue:forKey:", v, k);
};

/**
 * Returns the number of keys in the storage.
 *s
 * @return {Number} number of keys in storage.
 * @memberOf Storage
 */
Storage.prototype.count = function() {
    return objc_msgSendSync(this.nid, "count");
};

/**
 * Applies function `f` to every items in the storage. The function should
 * have the following signature: `f(k, v)` where k is the key for the item
 * and v is its value.
 *
 * @param {Function} f the function to apply to each items `f(k,v)`.
 * @memberOf Storage
 */
Storage.prototype.each = function(f) {
    var storage = objc_msgSendSync(this.nid, "dictionary");
    for (var k in storage) {
        f(k, storage[k]);
    }
};


var Util = function() {
    
};

Util.indentation = function(str) {
  
};

Util.spliceSubstring = function(str, part, loc, len) {
  
};

Util.slugifyString = function(str) {
    
};
