var _ = require(global.underscore_path);

/**
 * @api private
 */
function throw_if_null(obj, argname) {
    if (obj === null || typeof obj === 'undefined') {
        throw "Null argument in " + argname + ".";
    }

    return obj;
}

/**
 * @api private
 */
function throw_ifnot_string(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj === 'string') {
        return obj;
    }
    throw "Non-string argument in " + argname + ".";
}

/**
 * @api private
 */
function throw_ifnot_object(obj, argname, canBeNull) {
    
    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }
    
    if (typeof obj === 'object') {
        return obj;
    }
    throw "Non-object argument in " + argname + ".";
}


/**
 * @api private
 */
function throw_ifnot_array(obj, argname, canBeNull) {
    
    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }
    
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        return obj;
    }
    throw "Non-array of strings argument in " + argname + ".";
}


/**
 * @api private
 */
function throw_ifnot_number(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj === 'number') {
        return obj;
    }
    throw "Non-number argument in " + argname + ".";
}

/**
 * @api private
 */
function throw_ifnot_function(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj === 'function') {
        return obj;
    }
    throw "Non-function argument in " + argname + ".";
}

/**
 * @api private
 */
function throw_ifnot_boolean(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj === 'boolean') {
        return obj;
    }
    throw "Non-boolean argument in " + argname + ".";
}

/**
 * @api private
 */
function throw_ifnot_range(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj !== 'object' || !(obj.hasOwnProperty("length") && obj.hasOwnProperty("location"))) {
        throw "Invalid argument in " + argname + ". Must be an object with location and length properties.";
    }
    return obj;
}

/**
 * @api private
 */
function throw_ifnot_point(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj !== 'object' || !(obj.hasOwnProperty("x") && obj.hasOwnProperty("y"))) {
        throw "Invalid argument in " + argname + ". Must be an object with x and y properties.";
    }
    return obj;
}

/**
 * @api private
 */
function throw_ifnot_size(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj !== 'object' || !(obj.hasOwnProperty("width") && obj.hasOwnProperty("height"))) {
        throw "Invalid argument in " + argname + ". Must be an object with width and height properties.";
    }
    return obj;
}

/**
 * @api private
 */
function throw_ifnot_rect(obj, argname, canBeNull) {

    if (canBeNull === null && obj === null) {
        return obj;
    }
    if (canBeNull !== null && obj === null) {
        throw_if_null(obj, argname);
    }

    if (typeof obj !== 'object' || !(obj.hasOwnProperty("x") && obj.hasOwnProperty("y") && obj.hasOwnProperty("width") && obj.hasOwnProperty("height"))) {
        throw "Invalid argument in " + argname + ". Must be an object with x, y, width and height properties.";
    }
    return obj;
}



var Alert = {};
global.Alert = Alert;

/**
 * @api private
 */
function private_nullifyundef(v) {
    if (v == null)
        return null;
    return v;
}

/**
 * Shows an alert.
 *
 * Example:
 * 
 *     Alert.show("My Title", "My awesome body!", ["Yes", "No"]);
 *
 * @param {String} title the title of your alert.
 * @param {String} message the body of your alert message. Optional.
 * @param {Array} buttons an array of buttons to display. Buttons are displayed from right to left.
 * @return {Number} the index of the button that was clicked. 0 is the right-most button. Optional.
 * @memberOf Alert
 *
 */
Alert.show = function(title, message, buttons) {
    
    throw_ifnot_string(private_nullifyundef(title), "title of Alert.show", null);
    throw_ifnot_string(private_nullifyundef(message), "message of Alert.show", null);
    throw_ifnot_array(private_nullifyundef(buttons), "buttons of Alert.show", null);
    
    if (title == null)
        title = "Some mixin forgot to give their alert a title (it was " + String(private_get_mixin()) + ")";
    
    if (message == null)
        message = "";
    
    if (buttons == null || buttons === [])
        buttons = ["OK"];
    
    return objc_msgSendSync("controller", "showAlert:", {
        "title": title,
        "message": message,
        "buttons": buttons
    });
};


/**
 * Play the system beep sound.
 *
 * @memberOf Alert
 */
Alert.beep = function() {
    global.objc_msgSend("controller", "js_beep");
};

/**
 * Show a user notification on 10.8. Notifications are ignored on 10.7.
 *
 * Example:
 * 
 *     Alert.notify({
 *         title: "Acheivement Unlocked",
 *         subtitle: "Go To Hell",
 *         body: "Use the goto keyword 10 times in the same file",
 *         button: "Revert",
 *         callback: function () {
 *             // Do something when the "Revert" button is clicked
 *         }
 *     });
 *
 * @param {Object} options an object of options to configure the notification. See example.
 * @memberOf Alert
 */
Alert.notify = function(options) {
    throw_ifnot_string(private_nullifyundef(options.title), "options.title of Alert.notify", null);
    throw_ifnot_string(private_nullifyundef(options.subtitle), "options.subtitle of Alert.notify", null);
    throw_ifnot_string(private_nullifyundef(options.body), "options.body of Alert.notify", null);
    
    throw_ifnot_string(private_nullifyundef(options.button), "options.button of Alert.notify", null);
    throw_ifnot_function(private_nullifyundef(options.callback), "options.callback of Alert.notify", null);
    
    objc_msgSend("controller", "js_userNotification:", options);
};




var Clipboard = {};
global.Clipboard = Clipboard;

/**
 * Copy a string into the clipboard so that it can be pasted later.
 * @memberOf Clipboard
 * @param {String} value the value to copy.
 */
Clipboard.copy = function(value) {
    
    throw_ifnot_string(value, "value of Clipboard.copy()");
    
    objc_msgSend("controller", "clipboard_copy:", value);
};


/**
 * Returns the last string that was copied to the clipboard.
 * @memberOf Clipboard
 * @returns {String} the last item from the clipboard.
 */
Clipboard.text = function() {
    return objc_msgSendSync("controller", "clipboard_paste");
};




// Implement the UI class
var Hooks = {};
global.Hooks = Hooks;

/**
 * Add a menu item at the given path.
 * 
 * @param {String} path the path of the new menu item.
 * @param {String} shortcut keyboard shortcut, e.g. "<code>ctrl-alt-cmd-b</code>".
 * @param {Function} callback a callback to be executed when the menu item is clicked.
 * @memberOf Hooks
 */
Hooks.addMenuItem = function(path, shortcut, callback) {
    objc_msgSend(private_get_mixin(), "ui_addMenuItem:", {
        "path": path,
        "shortcut": shortcut,
        "callback": callback
    });
};

/**
 * Add a keyboard shortcut.
 *
 * @param {String} shortcut the keyboard shortcut, e.g. "<code>ctrl-alt-cmd-b</code>"
 * @param {Function} callback the callback function to execute.
 * @memberOf Hooks
 */
Hooks.addKeyboardShortcut = function(shortcut, callback) {
    objc_msgSend(private_get_mixin(), "ui_addKeyboardShortcut:", {
        "shortcut": shortcut,
        "callback": callback
    });
};

/**
 * Add a context menu item.
 * 
 * @param {String} location what kind of context menu to show the item in. Currently the only valid value is `'editor'`.
 * @param {String} title the title of the menu item.
 * @param {Object} options Valid options are `'scope'` (a scope selector), and `'shortcut'`. Optional.
 * @param {Function} callback a callback to be executed when the menu item is clicked.
 * @memberOf Hooks
 */
Hooks.addContextMenuItem = function(location, title, options, callback) {
    
    if (arguments.length === 3) {
        callback = options;
        options = {};
    }
    
    if (options == null)
        options = {};
    
    throw_ifnot_string(location, "location of addContextMenuitem");
    throw_ifnot_string(title, "title of addContextMenuitem");
    throw_ifnot_object(options, "options of addContextMenuitem");
    throw_ifnot_function(callback, "callback of addContextMenuitem");
    
    callback = function(str, editornid) { callback(str, new Editor(editornid)); };
    
    options['title'] = title;
    options['callback'] = callback;
    
    var sel = null;
    if (location === 'editor')
        sel = 'js_addEditorContextMenu:';
    else if (location === 'project')
        sel = 'js_addProjectContextMenu:';
    else
        throw "Invalid `location` argument ('" + location.toString() + "') for Hooks.addContextMenuItem()";
    
    objc_msgSend(private_get_mixin(), sel, options);
};


/*
/ * *
 * Add an item in the bottom status bar.
 * @param {String} name the name of the item to add.
 * @param {Function} valueFunction a function that will return the value to display in the status bar.
 * @param {String} selector a scope selector e.g. "<code>source.objc</code>"
 * @memberOf Hooks
* /
Hooks.addStatusItem = function (name, valueFunction, selector) {
    
};
*/

/**
 * Modify the text as the user types it. Warning: can make typing things slower.
 * 
 * @param {Function(String, Editor) -> String} callback The callback function to be called when the user types. Takes two arguments, the string typed and an instance of Editor in which the change will occur. 
 * @memberOf Hooks
 */
Hooks.onInsertText = function (callback) {
    throw_ifnot_function(callback);
    return objc_msgSendSync(private_get_mixin(), "ui_addEventNamed:info:callback:", "insert-text", null,
                            function(s, nid) {
                                callback(s, new Editor(nid));
                            });
};


/**
 * Remap a menu item to a new keyboard shortcut.
 * 
 * Example:
 * 
 *     Hooks.setShortcutForMenuItem("Go/Go To File...", "cmd-t");
 *
 * @param {String} path the path of the menu item to change.
 * @param {String} shortcut keyboard shortcut, e.g. "<code>ctrl-alt-cmd-b</code>".
 * @memberOf Hooks
 */
Hooks.setShortcutForMenuItem = function(path, shortcut) {
    objc_msgSend("controller", "ui_setShortcutForMenuItem:", {
        "shortcut": shortcut,
        "path": path
    });
};


var Storage = function(nid) {
    this.nid = nid;
};

global.Storage = Storage;

global._persistent_storage = null;

/**
 * Returns the **persistent** global storage object. Data is saved between launches.
 *
 * @return {Object} A storage object.
 * @memberOf Storage
 */
Storage.persistent = function() {
    if (_persistent_storage != null)
        return _persistent_storage;
    
    global._persistent_storage = new Storage(objc_msgSendSync("controller", "js_persistentStorage"));
    return _persistent_storage;
};


global._transient_storage = null;

/**
 * Returns the **transient** global storage object. Data is deleted when the app is quit.
 *
 * @return {Object} A storage object.
 * @memberOf Storage
 */
Storage.transient = function() {
    if (_transient_storage != null)
        return _transient_storage;
    
    global._transient_storage = new Storage(objc_msgSendSync("controller", "js_transientStorage"));
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



/**
 * @api private
 */
function private_get_mixin() {
    return global.CORE_MIXIN_ID;
}

/**
* @api private
*/
function createObject(parent) {
 function TempClass() {}
 TempClass.prototype = parent;
 var child = new TempClass();
 return child;
}

/**
* @api private
*/
function noddyInherit(sub, superObj) {
 var newSubPrototype = createObject(superObj.prototype); 
 newSubPrototype.constructor = sub; 
 sub.prototype = newSubPrototype;
}



// See https://github.com/fileability/chocolat/blob/master/code/multicursor/multicursor.hh#L6
// and https://github.com/fileability/chocolat/blob/master/code/multicursor/multicursor.cc
// for a well proven implementation.

/**
 * Creates a new Range.
 * 
 * Note:
 * 
 * If given one argument, then the location is `0` and the length is the given argument. i.e. `new Range(42)` is the same as `new Range(0, 42);`.
 *
 * @param {Number} loc the starting location (or index) of the range.
 * @param {Number} len the length of the range.
 */
var Range = function(loc, len) {
    if (arguments.length == 1) {
        this.location = 0;
        this.length = loc;
    }
    else {
        this.location = loc;
        this.length = len;
    }
};

function torange(obj) {
    return new Range(obj.location, obj.length);
}

global.Range = Range;

/**
 * Is the range valid?
 * 
 * - To be valid, both the `length` and `location` must be >= 0.
 *
 * - `length`, `location` and `length + location` must all be "small" (less than 2^30).
 *
 * - If `documentLength` is specified, `location + length` must not exceed it.
 * 
 * @param {Number} documentLength (optional) check that the indexes of this range are in <code>[0,&nbsp;documentLength)</code>.
 * @return {Boolean} whether the range is valid.
 * @memberOf Range
 */
Range.prototype.isValid = function(documentLength) {
    if (this.length < 0 || this.location < 0)
        return false;
    if (this.length >= 0x40000000 || this.location >= 0x40000000 || this.length + this.location >= 0x40000000)
        return false;
    if (typeof documentLength !== "undefined" && this.length + this.location > documentLength)
        return false;
    return true;
};

/**
 * Is the range's length 0?
 *
 * @return {Boolean} whether the range is empty.
 * @memberOf Range
 */
Range.prototype.isEmpty = function() {
    return this.length === 0;
};

/**
 * Returns the end of the range (i.e. location + length)
 * 
 * @return {Number} the end of the range.
 * @memberOf Range
 */
Range.prototype.max = function() {
    return this.location + this.length;
};

/**
 * Returns the range's location
 * 
 * @return {Number} the location of the range.
 * @memberOf Range
 */
Range.prototype.min = function() {
    return this.location;
};

/**
 * Returns the last index in the range (`length + location - 1`), or `location` if the range is empty.
 * 
 * @return {Number} the last index in the range.
 * @memberOf Range
 */
Range.prototype.lastIndex = function() {
    if (this.length === 0)
        return this.location;
    return this.location + this.length - 1;
};

/**
 * Test whether the range has a given index. *If the range is empty (`length` is 0), then returns `false`.*
 * 
 * @param {Number} idx the index.
 * @return {Boolean} true if the range contains the given index.
 * @memberOf Range
 */
Range.prototype.hasIndex = function(idx) {
    return this.isValid() && idx >= this.location && this.length > 0 && idx < this.location + this.length;
};

/**
 * Test whether the range has a given index. *If the range is empty (`length` is 0), then it treats it as a range of `length == 1`.*
 * 
 * @param {Number} idx the index.
 * @return {Boolean} true if the range contains the given index.
 * @memberOf Range
 */
Range.prototype.containsIndex = function(idx) {
    return this.isValid() && idx >= this.location && (idx < this.location + this.length || this.length === 0);
};

/**
 * Checks if two ranges's indexes overlap. *If either range is empty, returns `false`.*
 *
 * @param {Range} rng a range.
 * @return {Boolean} whether the given range is overlaps with this range.
 * @memberOf Range
 */
Range.prototype.overlapsWith = function(rng) {
    if (this.length === 0 || rng.length === 0)
        return false;
    return rng.hasIndex(this.lastIndex()) || rng.hasIndex(this.location);
};

/**
 * Checks if two ranges's indexes overlap. *Considers empty ranges as if they were of length `1`.*
 *
 * @param {Range} rng a range.
 * @return {Boolean} whether the given range intersects with this range.
 * @memberOf Range
 */
Range.prototype.intersectsWith = function(rng) {
    if (this.length === 0 && rng.length === 0)
        return this.location === rng.location;
    if (rng.length === 0)
        return this.hasIndex(rng.location);
    if (this.length === 0)
        return rng.hasIndex(this.location);
    
    return rng.hasIndex(this.lastIndex()) || rng.hasIndex(this.location);
};


/**
 * Checks if all indexes of a given range are contained in this range.
 *
 * @param {Range} rng a range.
 * @return {Boolean} whether the given range is contained within this range.
 * @memberOf Range
 */
Range.prototype.containsRange = function(rng) {
    if (!this.isValid() || !rng.isValid())
        return false;
    if (this.isEmpty() && !rng.isEmpty())
        return false;
    return (this.location <= rng.location && rng.lastIndex() <= this.lastIndex());
};

/**
 * Checks if both ranges are equal (treats any two invalid ranges as equal).
 *
 * @param {Range} rng a range.
 * @return {Boolean} whether the given range is equal to this range.
 * @memberOf Range
 */
Range.prototype.equals = function(rng) {
    var thisvalid = this.isValid();
    var rngvalid = rng.isValid();
    if (thisvalid != rngvalid)
        return false;
    if (thisvalid && rngvalid)
        return true;
    return this.location == rng.location && this.length == rng.length;
};

/**
 * Returns a string in the form of `{loc, len}`. For debugging only, do not attempt to parse this string.
 *
 * @return {String} a string representation of the range.
 * @memberOf Range
 */
Range.prototype.toString = function() {
    if (!this.isValid())
        return "{invalid; " + String(this.location) + ", " + String(this.length) + "}";
    else
        return "{" + String(this.location) + ", " + String(this.length) + "}";
};

/**
 * Compare first by `location`, then by `length`. Treats any two invalid ranges as equal.
 *
 * @param {Range} a a range.
 * @param {Range} b another range.
 * @return {Number} <code>-1</code> if <code>a < b</code>, <code>1</code> if <code>a > b</code> or <code>0</code> if <code>a</code> and <code>b</code> are equal.
 * @memberOf Range
 */
Range.compare = function(a, b) {
    if (a.equals(b)) return 0;
    if (!a.isValid()) return 1;
    if (!b.isValid()) return -1;
    else if (a.location < b.location) return -1;
    else if (a.location > b.location) return 1;
    else if (a.length < b.length) return -1;
    else if (a.length > b.length) return 1;
    else return 0;
};




// Implement the Recipe class
var Recipe = function(nid) {
    this.nid = nid;
    this.jumpToShowSelection = false;
    this.showYellowIndicator = false;
};

global.Recipe = Recipe;

/**
 * Run a text recipe on the current editor.
 *
 * Example:
 *     Recipe.run(function(recipe) {
 *         recipe.insertTextAtLocation(recipe.length, "Hello World!");
 *     });
 *
 * @param {Function(Recipe)} callback A callback function in which to make the changes. The function will be given an instance of Recipe as its argument, and may return false at any time in order to cancel the changes.
 * @memberOf Recipe
 */
Recipe.run = function(callback) {
    
    throw_ifnot_function(callback, "callback of run");
    
    Recipe.runOn(Editor.current(), callback);
};

/**
 * Run a text recipe on a specified Editor.
 *
 * Example:
 *     Recipe.runOn(Editor.current(), function(recipe) {
 *         recipe.insertTextAtLocation(recipe.length, "Hello World!");
 *     });
 *
 * @param {Editor} editor An instance of Editor to run the recipe on.
 * @param {Function(Recipe)} callback A callback function in which to make the changes. The function will be given an instance of Recipe as its argument, and may return false at any time in order to cancel the changes.
 * @memberOf Recipe
 */
Recipe.runOn = function(editor, callback) {
    
    throw_if_null(editor, "editor of runOn");
    throw_ifnot_function(callback, "callback of runOn");
    
    objc_msgSend("controller", "runRecipeOn:callback:", editor.nid, function (nid) {
        callback(new Recipe(nid));
    });
};

/**
 * Get or set the editor's selected range.
 *
 * Note:
 * 
 * Text cursors are represented as selections with `length == 0`.
 * 
 * @return {Range} the selected character range.
 * @memberOf Recipe
 * @isproperty
 */
Recipe.prototype.selection = function() {
    return objc_msgSendSync(this.nid, "selection");
};
Recipe.prototype.setSelection = function(newSelection) {
    
    throw_ifnot_range(newSelection, "newSelection of setSelection");
    
    objc_msgSend(this.nid, "setSelection:", newSelection);
};

Recipe.prototype.__defineGetter__("selection", Recipe.prototype.selection);
Recipe.prototype.__defineSetter__("selection", Recipe.prototype.setSelection);


/**
 * Get the length of the document.
 *
 * @return {Number} the length of the document.
 * @memberOf Recipe
 * @isproperty
 */
Recipe.prototype.length = function() {
    
    return objc_msgSendSync(this.nid, "length");
};

Recipe.prototype.__defineGetter__("length", Recipe.prototype.length);


/**
 * Get or set the text of the document.
 *
 * @return {String} the content of the document.
 * @memberOf Recipe
 * @isproperty
 */
Recipe.prototype.text = function() {
    return objc_msgSendSync(this.nid, "text");
};

Recipe.prototype.setText = function(newText) {
    
    throw_ifnot_string(newText, "newText of setText");
    
    objc_msgSend(this.nid, "setText:", String(newText));
};

Recipe.prototype.__defineGetter__("text", Recipe.prototype.text);
Recipe.prototype.__defineSetter__("text", Recipe.prototype.setText);


/**
 * Returns text in range.
 *
 * @param {Range} rng the desired range.
 * @memberOf Recipe
 */
Recipe.prototype.textInRange = function(rng) {
    
    throw_ifnot_range(rng, "rng of textInRange");
    
    return objc_msgSendSync(this.nid, "textInRange:", rng);
};

/**
 * Expands a given range to cover the entire range of each line, *including* ending newlines.
 *
 * @param {Range} rng a range of characters to expand.
 * @memberOf Recipe
 */
Recipe.prototype.rangeOfLinesInRange = function(rng) {
    
    throw_ifnot_range(rng, "rng of rangeOfLinesInRange");
    
    return objc_msgSendSync(this.nid, "rangeOfLineInRange:", rng);
};

/**
* Expands a given range to cover the entire range of each line, *excluding* ending newlines.
*
* @param {Range} rng a range of characters to expand.
* @memberOf Recipe
*/
Recipe.prototype.contentRangeOfLinesInRange = function(rng) {
    
    throw_ifnot_range(rng, "rng of contentRangeOfLinesInRange");
    
    return objc_msgSendSync(this.nid, "contentRangeOfLinesInRange:", rng);
};

/**
* Gives a range of line indexes (line numbers starting from zero) for the given character range.
*
* @param {Range} rng a range of characters.
* @memberOf Recipe
*/
Recipe.prototype.lineIndexesForCharacterRange = function(rng) {
    
    throw_ifnot_range(rng, "rng of lineIndexesForCharacterRange");
    
    return objc_msgSendSync(this.nid, "lineIndexesForCharacterRange:", rng);
};

/**
* Gives a character range for the given range of line indexes (line numbers starting from zero).
*
* @param {Range} rng a range of line indexes.
* @memberOf Recipe
*/
Recipe.prototype.characterRangeForLineIndexes = function(rng) {
    
    throw_ifnot_range(rng, "rng of characterRangeForLineIndexes");
    
    return objc_msgSendSync(this.nid, "characterRangeForLineIndexes:", rng);
};

/**
 * Gives a character range for the nearest word to the given character range.
 *
 * @param {Range} rng a character range.
 * @memberOf Recipe
 */
Recipe.prototype.wordRangeForRange = function(rng) {
    throw_ifnot_range(rng, "rng of wordRangeForRange");
    return objc_msgSendSync(this.nid, "rangeOfNearestWordTo:", rng);
};

/* Not sure we need this
Recipe.prototype.lineMarkersForCharacterRange = function(rng) {
  
};
*/

/**
 * Execute function `f` on lines in character range `rng`. If no range is passed, execute the function
 * on all the lines in the document.
 *
 * Example:
 *     // Wrap each line in brackets
 *     Recipe.run(function(recipe) {
 *             
 *         recipe.eachLine(function(marker) {
 *             return "(" + marker.text + ")";
 *         });
 *     });
 *
 * @param {Function} f a function that is given a <a href="linemarker.html">LineMarker</a>. Return a new string to modify the line, null to delete the line, or undefined to keep the line the same.
 * @param {Range} rng an optional range. Defaults to the whole document if omitted.
 * @return {Number} the total number of characters added or deleted (0 if nothing was changed).
 * @memberOf Recipe
 */
Recipe.prototype.eachLine = function(rng, f) {
    
    if (arguments.length == 1) {
        f = rng;
        rng = new Range(0, this.length);
    }
    
    throw_ifnot_range(rng, "rng of eachLine");
    throw_ifnot_function(f, "f of eachLine");
    
    var callbackf = function () {
        var ret = f.apply(this, arguments);
        if (typeof ret === 'undefined')
            return false;
        return ret;
    };
    
    return objc_msgSendThread(this.nid, "foreachLineInRange:callback:", rng, callbackf);
};

/**
 * Replace text in `rng` with `replacement`, optionally recording the operation for undo.
 *
 * @param {Range} rng the range of text you want to replace.
 * @param {String} replacement the text to replace it with.
 * @param {Bool} recordUndo (optional) whether or not to record the operation for undo. The default is true.
 * @memberOf Recipe
 */
Recipe.prototype.replaceTextInRange = function(rng, replacement, recordUndo) {
    
    if (typeof recordUndo === "undefined")
        recordUndo = true;
    
    throw_ifnot_range(rng, "rng of replaceTextInRange");
    throw_ifnot_string(replacement, "replacement of replaceTextInRange");
    throw_ifnot_boolean(recordUndo, "recordUndo of replaceTextInRange");
    
    objc_msgSend(this.nid, "replaceTextInRange:with:recordUndo:", rng, replacement, recordUndo);
};

/**
 * Delete text in range `rng`, optionally recording the operation for undo.
 *
 * @param {Range} rng the range of text to delete.
 * @param {Bool} recordUndo (optional) whether or not to record the operation for undo. The default is true.
 * @memberOf Recipe
 */
Recipe.prototype.deleteTextInRange = function(rng, recordUndo) {
    if (typeof recordUndo === "undefined")
        recordUndo = true;
    
    throw_ifnot_range(rng, "rng of replaceTextInRange");
    throw_ifnot_boolean(recordUndo, "recordUndo of replaceTextInRange");
    
    objc_msgSend(this.nid, "replaceTextInRange:with:recordUndo:", rng, "", recordUndo);
};

/*
 * Insert text at specified location, optionally recording the operation for undo.
 *
 * @param {Number} location the location at which to insert the new text.
 * @param {String} newText the text to insert at <code>location</code>.
 * @param {Bool} recordUndo (optional) whether or not to record the operation for undo. The default is true.
 * @memberOf Recipe
 */
Recipe.prototype.insertTextAtLocation = function(location, newText, recordUndo) {
    if (typeof recordUndo === "undefined")
        recordUndo = true;
    
    throw_ifnot_number(location, "location of insertTextAtLocation");
    throw_ifnot_string(newText, "newText of insertTextAtLocation");
    throw_ifnot_boolean(recordUndo, "recordUndo of insertTextAtLocation");
    
    objc_msgSend(this.nid, "replaceTextInRange:with:recordUndo:", new Range(location, 0), newText, recordUndo);
};



/**
 * Create a new window.
 * @memberOf Window
 * @isconstructor
 * @section Setup
 */
var Window = function() {
    this.nid = objc_msgSendSync(private_get_mixin() || "controller", "createWindow:", "Window");
};

global.Window = Window;

/**
 * Set up and display the window.
 *
 * Example:
 *     var win = new Window();
 *     win.html = "<!DOCTYPE html><h1>Test</h1>";
 *     win.buttons = ["OK"];
 *     win.onButtonClick = function() { win.close(); }
 *     win.run();
 *     win.maximize();
 *
 * @memberOf Window
 * @section Setup
 */
Window.prototype.run = function() {
    objc_msgSend(this.nid, "run");
};

/**
 * Get or set the title of the window.
 * 
 * Example:
 *     var win = new Window();
 *     win.title = "My window";
 * 
 * @return {String} the title of the window.
 * @isproperty
 * @memberOf Window
 * @section Basics
 */
Window.prototype.title = function() {
    return objc_msgSendSync(this.nid, "title");
};
Window.prototype.setTitle = function(newTitle) {
    
    throw_ifnot_string(newTitle, "newTitle of setTitle");
    
    objc_msgSend(this.nid, "setTitle:", newTitle);
};
Window.prototype.__defineGetter__("title", Window.prototype.title);
Window.prototype.__defineSetter__("title", Window.prototype.setTitle);


/**
 * Get or set the window's frame. Setter is equivalent to `.setFrame(rect, false)`.
 * @return {Rect} the window's frame.
 * @isproperty
 * @memberOf Window
 * @section Basics
 */
Window.prototype.frame = function() {
    return objc_msgSendSync(this.nid, "frame");
};

/**
 * Set the window's frame. The frame should be an object with the x, y, width and
 * height properties. e.g. `{x: 0, y: 0, width: 250, height: 300}`
 * @param {Rect} newFrame the new window's frame.
 * @param {Bool} shouldAnimate optional, whether to animate the resizing or not (default: false)
 * @memberOf Window
 * @section Basics
 */
Window.prototype.setFrame = function(newFrame, shouldAnimate) {
    if (typeof shouldAnimate === 'undefined') {
        shouldAnimate = false;
    }

    throw_ifnot_rect(newFrame, "newFrame of setFrame");
    throw_ifnot_boolean(shouldAnimate, "shouldAnimate of setFrame");
    
    objc_msgSend(this.nid, "setFrame:animate:", newFrame, shouldAnimate);
};
Window.prototype.__defineGetter__("frame", Window.prototype.frame);
Window.prototype.__defineSetter__("frame", Window.prototype.setFrame);

/**
 * Center the window on screen. Must be called after run() has been invoked.
 * @memberOf Window
 * @section Basics
 */
Window.prototype.center = function() {
    objc_msgSend(this.nid, "center");
};

/**
 * Maximize the window so that it takes up the entire size of the screen.
 * @memberOf Window
 * @section Basics
 */
Window.prototype.maximize = function() {
    objc_msgSend(this.nid, "maximize");
};


/**
 * Permanently close the window. After a window is closed all resources are freed. Use `.hide()` to temporarily hide a window.
 * @memberOf Window
 * @section Visibility
 */
Window.prototype.close = function() {
    objc_msgSend(this.nid, "close");
};


/**
 * Show the window if it was previously hidden.
 * @memberOf Window
 * @section Visibility
 */
Window.prototype.show = function() {
    objc_msgSend(this.nid, "show");
};

/**
 * Hide the window offscreen but don't close it.
 * @memberOf Window
 * @section Visibility
 */
Window.prototype.hide = function() {
    objc_msgSend(this.nid, "hide");
};

/**
 * Hides a visible window or show a hidden window.
 * @return {Boolean} whether the window is *now* onscreen.
 * @memberOf Window
 * @section Visibility
 */
Window.prototype.toggleShown = function() {
    return objc_msgSendSync(this.nid, "toggle");
};

/**
 * Is this window onscreen?
 * @return {Boolean} whether the window is onscreen.
 * @memberOf Window
 * @section Visibility
 */
Window.prototype.isVisible = function() {
    return objc_msgSendSync(this.nid, "isVisible");
};

/**
 * Is this the key window? The key window receives key events.
 * @return {Boolean} whether the window is the key window.
 * @memberOf Window
 * @section Visibility
 */
Window.prototype.isKeyWindow = function() {
    return objc_msgSendSync(this.nid, "isKeyWindow");
};

/**
 * Is this the main window?
 * @return {Boolean} whether the window is the main window.
 * @memberOf Window
 * @section Visibility
 */
Window.prototype.isMainWindow = function() {
    return objc_msgSendSync(this.nid, "isMainWindow");
};

/**
 * Minimize the window into the dock.
 * @memberOf Window
 * @section Minimization
 */
Window.prototype.minimize = function() {
    objc_msgSend(this.nid, "minimize");
};

/**
 * Unminimize the window out of the dock.
 * @memberOf Window
 * @section Minimization
 */
Window.prototype.unminimize = function() {
    objc_msgSend(this.nid, "unminimize");
};

/**
 * Return whether the window is minimized.
 * @return {Boolean} whether the window is minimized.
 * @memberOf Window
 * @section Minimization
 */
Window.prototype.isMinimized = function() {
    return objc_msgSendSync(this.nid, "isMinimized");
};

/**
 * Get or set an `Array` of button names to be shown at the bottom of the window. Buttons are shown from right-to-left.
 * 
 * Example:
 *     var win = new Window();
 *     win.buttons = ["OK", "Cancel"];
 * 
 * @return {Array} the names of the buttons. Note that you cannot mutate the return value of this property, you must set it for it to be updated.
 * @isproperty
 * @memberOf Window
 * @section Setup
 */
Window.prototype.buttons = function() {
    return objc_msgSendSync(this.nid, "buttons");
};
Window.prototype.setButtons = function(newButtons) {
    
    throw_ifnot_array(newButtons, "newButtons of setButtons");
    
    objc_msgSend(this.nid, "setButtons:", newButtons);
};
Window.prototype.__defineGetter__("buttons", Window.prototype.buttons);
Window.prototype.__defineSetter__("buttons", Window.prototype.setButtons);

/**
 * Get or set a callback function that will be called when a button is clicked.
 * 
 * Example:
 *     var win = new Window();
 *     win.buttons = ["OK", "Cancel"];
 *     win.onButtonClick = function (buttonName) {
 *         console.log("Clicked " + buttonName);
 *     }
 * 
 * @return {Function(String)} a callback function with one argument: the name of the button that was clicked.
 * @isproperty
 * @memberOf Window
 * @section Events
 */
Window.prototype.onButtonClick = function() {
    return objc_msgSendSync(this.nid, "onButtonClick");
};
Window.prototype.setOnButtonClick = function(callback) {
    
    throw_ifnot_function(callback, "callback of setOnButtonClick");
    
    objc_msgSend(this.nid, "setOnButtonClick:", callback);
};
Window.prototype.__defineGetter__("onButtonClick", Window.prototype.onButtonClick);
Window.prototype.__defineSetter__("onButtonClick", Window.prototype.setOnButtonClick);

/**
 * Get or set a callback function that will be called when the client JS sends a message.
 * 
 * Example:
 *     // Client code
 *     window.sendMessage("hello", [1, 2, 3]);
 *     
 *     // Server code
 *     win.onMessage = function (name, arguments) {
 *         // name == "hello", arguments == [1, 2, 3]
 *     }
 * 
 * @return {Function(String, Array or Object)} a callback function with two arguments: the first is the name of the message, the second is the arguments passed to it
 * @isproperty
 * @memberOf Window
 * @section Events
 */
Window.prototype.onMessage = function() {
    return objc_msgSendSync(this.nid, "onMessage");
};
Window.prototype.setOnMessage = function(callback) {

    throw_ifnot_function(callback, "callback of setOnMessage");
    
    objc_msgSend(this.nid, "setOnMessage:", function (name, args) {
        return callback(name, JSON.parse(args)[0]);
    });
};
Window.prototype.__defineGetter__("onMessage", Window.prototype.onMessage);
Window.prototype.__defineSetter__("onMessage", Window.prototype.setOnMessage);


/**
 * Get or set a function that will be called *in the client context* when the page loads. Equivalent to setting an onload attribute. Useful if using default.html to build up the page exclusively in JS.
 * 
 * Example:
 *     var win = new Window()
 *     win.htmlPath = "default.html";
 *     win.clientOnLoad = function () {
 *         document.body.innerHTML = "<h1>Hello World</h1>";
 *     };
 *     win.run();
 * 
 * @return {Function} a function that will run in the client JS. Referencing anything in the server JS won't work.
 * @isproperty
 * @memberOf Window
 * @section Events
 */
Window.prototype.clientOnLoad = function() {
    return objc_msgSendSync(this.nid, "clientOnLoad");
};
Window.prototype.setClientOnLoad = function(callback) {

    throw_ifnot_function(callback, "callback of setClientOnLoad");
    
    objc_msgSend(this.nid, "setClientOnLoad:", callback.toString());
};
Window.prototype.__defineGetter__("clientOnLoad", Window.prototype.clientOnLoad);
Window.prototype.__defineSetter__("clientOnLoad", Window.prototype.setClientOnLoad);

/**
 * Get or set a function that will be called *in the node context* when the window loads.
 * 
 * Example:
 *     var win = new Window()
 *     win.htmlPath = "default.html";
 *     win.onLoad = function () {
 *         ...
 *     };
 *     win.run();
 * 
 * @return {Function} a function that will be run when the web view loads.
 * @isproperty
 * @memberOf Window
 * @section Events
 */
Window.prototype.onLoad = function() {
    return objc_msgSendSync(this.nid, "onLoad");
};
Window.prototype.setOnLoad = function(callback) {
    
    throw_ifnot_function(callback, "callback of setOnLoad");
    
    objc_msgSend(this.nid, "setOnLoad:", callback);
};
Window.prototype.__defineGetter__("onLoad", Window.prototype.onLoad);
Window.prototype.__defineSetter__("onLoad", Window.prototype.setOnLoad);


/**
 * Get or set a function that will be called *in the node context* when the window unloads.
 * 
 * Example:
 *     var win = new Window()
 *     win.htmlPath = "default.html";
 *     win.onUnload = function () {
 *         ...
 *     };
 *     win.run();
 * 
 * @return {Function} a function that will be run when the web view unloads.
 * @isproperty
 * @memberOf Window
 * @section Events
 */
Window.prototype.onUnload = function() {
    return objc_msgSendSync(this.nid, "onUnload");
};
Window.prototype.setOnUnload = function(callback) {
    
    throw_ifnot_function(callback, "callback of setOnUnload");
    
    objc_msgSend(this.nid, "setOnUnload:", callback);
};
Window.prototype.__defineGetter__("onUnload", Window.prototype.onUnload);
Window.prototype.__defineSetter__("onUnload", Window.prototype.setOnUnload);

/**
 * Get or set a path to the HTML file that will be shown in the window. Can be either absolute or relative. Relative paths are relative to the mixin's directory.
 * 
 * Example:
 *     var win = new Window();
 *     win.htmlPath = "index.html";
 * 
 * @return {String} the path to the HTML file.
 * @isproperty
 * @memberOf Window
 * @section Setup
 */
Window.prototype.htmlPath = function() {
    return objc_msgSendSync(this.nid, "htmlPath");
};
Window.prototype.setHtmlPath = function(newHtmlPath) {
    
    throw_ifnot_string(newHtmlPath, "newHtmlPath of setHtmlPath", null);
    
    objc_msgSend(this.nid, "setHtmlPath:", (newHtmlPath != null ? String(newHtmlPath) : null));
};
Window.prototype.__defineGetter__("htmlPath", Window.prototype.htmlPath);
Window.prototype.__defineSetter__("htmlPath", Window.prototype.setHtmlPath);


/**
 * Set the source of HTML file that will be shown in the window. Mutually exclusive with `.htmlPath`.
 * 
 * Example:
 *     var win = new Window();
 *     win.html = "<!DOCTYPE html><h1>Test</h1>";
 * 
 * @return {String} the path to the HTML file.
 * @isproperty
 * @memberOf Window
 * @section Setup
 */
Window.prototype.html = function() {
    return objc_msgSendSync(this.nid, "html");
};
Window.prototype.setHtml = function(newHtml) {
    
    throw_ifnot_string(newHtml, "newHtml of setHtml", null);
    
    objc_msgSend(this.nid, "setHtml:", (newHtml != null ? String(newHtml) : null));
};

Window.prototype.__defineGetter__("html", Window.prototype.html);
Window.prototype.__defineSetter__("html", Window.prototype.setHtml);


/**
 * Set the URL of the website or file that will be shown in the window. Mutually exclusive with `.htmlPath` and `.html`. Must include a protocol.
 * 
 * Example:
 *     var win = new Window();
 *     win.url = "http://www.google.com";
 * 
 * @return {String} the url
 * @isproperty
 * @memberOf Window
 * @section Setup
 */
Window.prototype.url = function() {
    return objc_msgSendSync(this.nid, "url");
};
Window.prototype.setUrl = function(newURL) {
    
    throw_ifnot_string(newURL, "newURL of setURL", null);
    
    objc_msgSend(this.nid, "setUrl:", (newURL != null ? String(newURL) : null));
};

Window.prototype.__defineGetter__("url", Window.prototype.url);
Window.prototype.__defineSetter__("url", Window.prototype.setUrl);


/**
 * If set to `true`, the window will inject a `<link href="default.css">` element into the head element. Default is `true`.
 * 
 * @return {Boolean} whether <code>default.css</code> will be used.
 * @isproperty
 * @memberOf Window
 * @section Setup
 */
Window.prototype.useDefaultCSS = function() {
    return objc_msgSendSync(this.nid, "useDefaultStylesheet");
};
Window.prototype.setUseDefaultCSS = function(flag) {
    
    throw_ifnot_boolean(flag, "flag of setUseDefaultCSS", null);
    
    objc_msgSend(this.nid, "setUseDefaultStylesheet:", flag);
};
Window.prototype.__defineGetter__("useDefaultCSS", Window.prototype.useDefaultCSS);
Window.prototype.__defineSetter__("useDefaultCSS", Window.prototype.setUseDefaultCSS);

/**
 * Eval some code on the client-side.
 * 
 * Example:
 *     win.evalCode("document.write('Some text')");
 * 
 * @param {String} code some code to evaluate on the client-side.
 * @memberOf Window
 * @section Communication
 */
Window.prototype.evalCode = function(code) {
    
    throw_ifnot_string(code, "code of evalString");
    
    return objc_msgSend(this.nid, "client_eval:", code);
};

/**
 * Eval some code on the client-side, *and return a value*. The `.evalExpr` function must wrap your code in order to extract a value from it. So it is not suitable for defining variables, etc. Use `.evalCode` if you don't need a return value.
 * 
 * Example:
 *     console.log(win.evalExpr("document.body.innerHTML"));
 * 
 * @param {String} code some code to evaluate on the client-side.
 * @return {Value} the return value of the code. Must be a json-able type.
 * @memberOf Window
 * @section Communication
 */
Window.prototype.evalExpr = function(code) {
    
    throw_ifnot_string(code, "code of evalString");
    
    var ret = objc_msgSendSync(this.nid, "client_eval:andReturnValue:", code, true);
    if (ret == null)
        return null;
    return JSON.parse(ret)[0];
};

/**
 * Add a function to the client-side JS.
 * 
 * Example:
 *     win.eval("document.write('Some text')");
 * 
 * @param {String} code some code to evaluate on the client-side.
 * @memberOf Window
 * @section Communication
 */
Window.prototype.addFunction = function(name, f) {
    if (arguments.length == 1) {
        f = name;
        name = f.name;
    }
    
    throw_ifnot_function(f, "f of addFunction");
    throw_ifnot_string(name, "name of addFunction", null);
    
    objc_msgSend(this.nid, "client_addFunction:named:", f.toString(), name);
};

/**
 * Send a message to the window that you can catch with the window.onMessage attribute.
 * 
 * Example:
 *     win.sendMessage("I'm sending a message", [42]);
 * 
 * @param {String} msg the name of the message to send.
 * @param {Value} args an argument to pass to the callback function.
 * @memberOf Window
 * @section Communication
 */
Window.prototype.sendMessage = function (msg, args) {
    if (args == null) {
        args = [];
    }
    
    throw_ifnot_string(msg, "msg of sendMessage");
    
    objc_msgSend(this.nid, "client_sendMessage:arguments:", msg, JSON.stringify([args]));
};

/**
 * Call a named function or a function literal on the client side.
 * 
 * Example:
 *     win.applyFunction("updateData", [42, 3.14, 2.71828]);
 *     
 *     win.applyFunction(function(data) {
 *         document.write(data.join("<br>"));
 *     }, [42, 3.14, 2.71828]);
 * 
 * @param {String|Function} f either the name of a client function, or a function literal to call in the client context.
 * @param {Array} args a list of arguments to pass to the function.
 * @memberOf Window
 * @section Communication
 */
Window.prototype.applyFunction = function(f, args) {
    if (args == null) {
        args = [];
    }
    
    throw_ifnot_array(args, "args of applyFunction");
    
    var ret = null;
    if (typeof f === "string") {
        ret = objc_msgSendSync(this.nid, "client_callFunctionNamed:jsonArguments:", f, JSON.stringify([args]));
    }
    else {
        
        throw_ifnot_function(f, "f of applyFunction");
        
        ret = objc_msgSendSync(this.nid, "client_callFunctionCode:jsonArguments:", f.toString(), JSON.stringify([args]));
    }
    
    if (ret == null)
        return null;
    return JSON.parse(ret)[0];
};

/**
 * Create a new sheet. Sheet is a subclass of Window and inherits most methods.
 * @param {Object} parent the parent editor, window, etc of the sheet.
 * @memberOf Sheet
 */
var Sheet = function(parent) {
    
    throw_ifnot_object(parent, "parent of new Sheet()");
    
    this.nid = objc_msgSendSync(private_get_mixin() || "controller", "createWindow:", "Sheet");
    objc_msgSend(this.nid, "setParent:", parent.nid);
};

noddyInherit(Sheet, Window);

global.Sheet = Sheet;

/*
/ * *
 * Create a new pane. Panes are custom UI elements that are shown inside the editor. Pane is a subclass of Window and inherits most methods.
 * 
 * Places:
 * 
 * Acceptable values for the <em>place</em> parameter are currently:
 *
 * - `"preview-area"` the pane will be placed in the Web Preview / Documentation Viewer area (_parent_ must be a `Tab`)
 * 
 * @param {String} place a string identifying <em>where</em> the pane should be placed.
 * @param {Object} parent an Editor, Tab, MainWindow, etc that the pane will be placed in.
 * @memberOf Pane
 * /
var Pane = function(place, parent) {
    this.nid = objc_msgSendSync(private_get_mixin() || "controller", "createWindow:", "Pane");
    objc_msgSend(this.nid, "setParent:", parent.nid);
    objc_msgSend(this.nid, "setPlace:", place);
};

noddyInherit(Pane, Window);

global.Pane = Pane;
*/

/**
 * Creates a new Popover. Popover is a subclass of Window and inherits most methods.
 * 
 * @param {Object} parent the editor containing the text, or a window, etc.
 * @param {Range} range the range of text over which the popover should appear. Can also be a rect object <code>{x, y, width, height}</code>.
 * @memberOf Popover
 */
function Popover(parent, range) {
    
    throw_ifnot_object(parent, "parent of new Popover()");
    
    this.nid = objc_msgSendSync(private_get_mixin() || "controller", "createWindow:", "Popover");
    objc_msgSend(this.nid, "setParent:", parent.nid);
    if (range != null) {
        if ('length' in range && 'location' in range)
            objc_msgSend(this.nid, "setRange:", range);
        else if ('x' in range && 'y' in range && 'width' in range && 'height' in range)
            objc_msgSend(this.nid, "setRect:", range);
        else
            throw "Unknown second argument to new Popover(); Must be either a Rect or a Range.";
    }
};

noddyInherit(Popover, Window);

/**
 * Get or set the window's size. Setter is equivalent to `.setSize(size, false)`.
 * @return {Size} the window's size.
 * @isproperty
 * @memberOf Popover
 */
Popover.prototype.size = function() {
    var theFrame = objc_msgSendSync(this.nid, "frame");
    if (theFrame != null) {
        if ('x' in theFrame)
            delete theFrame.x;
        if ('y' in theFrame)
            delete theFrame.y;
    }
    return theFrame;
};

/**
 * Set the window's size. The size should be an object with width and height properties. e.g. `{width: 250, height: 300}`
 * @param {Size} newSize the new window's frame.
 * @param {Bool} shouldAnimate optional, whether to animate the resizing or not (default: false)
 * @memberOf Popover
 */
Popover.prototype.setSize = function(newSize, shouldAnimate) {
    if (typeof shouldAnimate === 'undefined') {
        shouldAnimate = false;
    }
    
    throw_ifnot_size(newSize, "newSize of setSize");
    throw_ifnot_boolean(shouldAnimate, "shouldAnimate of setSize");
    
//    var newNewSize = _.clone(newSize);
    var newNewSize = { x: 0, y:0, width:newSize.width, height:newSize.height };
    
    objc_msgSend(this.nid, "setFrame:animate:", newNewSize, shouldAnimate);
};
Popover.prototype.__defineGetter__("size", Popover.prototype.size);
Popover.prototype.__defineSetter__("size", Popover.prototype.setSize);



/**
 * Get or set the popover's behaviour.
 * 
 * Note:
 * 
 * Behaviour must be one of
 * 
 * 1. **strict**: the popover will only be closed if it's closed explicitly, or if the containing window closes.
 * 2. **transient**: the popover will be closed if the user interacts with something outside the popover.
 * 3. **semitransient**: the popover will be closed if the user interacts with something outside the popover or its containing window.
 * 
 * @return {String} the popover's behaviour.
 * @isproperty
 * @memberOf Popover
 */
Popover.prototype.behaviour = function() {
    return objc_msgSendSync(this.nid, "behaviour");
};
Popover.prototype.setBehaviour = function(b) {
    
    throw_ifnot_string(b, "b of setBehaviour");
    
    objc_msgSend(this.nid, "setBehaviour:", b);
};
Popover.prototype.__defineGetter__("behaviour", Popover.prototype.behaviour);
Popover.prototype.__defineSetter__("behaviour", Popover.prototype.setBehaviour);


/**
 * Get or set which edge the popover is attached to: its "direction".
 * 
 * @return {String} the popover's edge/direction. One of "top", "bottom", "left" or "right".
 * @isproperty
 * @memberOf Popover
 */
Popover.prototype.edge = function() {
    return objc_msgSendSync(this.nid, "edge");
};
Popover.prototype.setEdge = function(e) {
    
    throw_ifnot_string(b, "e of setEdge");
    
    objc_msgSend(this.nid, "setEdge:", b);
};
Popover.prototype.__defineGetter__("edge", Popover.prototype.edge);
Popover.prototype.__defineSetter__("edge", Popover.prototype.setEdge);



//_.defaults(Popover.prototype, Window.prototype);
global.Popover = Popover;




// MainWindow, Tab, Document and Editor

/**
 * @api private
 */
var MainWindow = function(nid) {
  this.nid = nid;
};

function private_clean_and_construct(constructor, values) {
    return values.filter(function (x) { return x != null; })
                 .map(function (x) { return new constructor(x); });
}
function private_construct_or_null(constructor, value) {
    if (value == null) {
        return null;
    }
    return new constructor(value);
}

global.MainWindow = MainWindow;

/**
 * Class method that returns the current window.
 *
 * @return {MainWindow} the current MainWindow.
 * @memberOf MainWindow
 */
MainWindow.current = function() {
    return private_construct_or_null(MainWindow, objc_msgSendSync("controller", "mainwindow_current"));
};

/**
 * Returns and array of tabs in the main window.
 *
 * @return {Array} tabs.
 * @memberOf MainWindow
 */
MainWindow.prototype.tabs = function() {
    return private_clean_and_construct(Tab, objc_msgSendSync(this.nid, "tabControllers"));
};

/**
 * Get the current, active tab from the main window.
 *
 * @return {Tab} the active tab in the main window.
 * @memberOf MainWindow
 */
MainWindow.prototype.currentTab = function() {
    return private_construct_or_null(Tab, objc_msgSendSync(this.nid, "activeTab"));
};


///**
// * Send an objective-c message to the MainWindow.
// *
// * @param {String} selector the message selector to send.
// * @param {Array} arguments the arguments to send along with the message.
// * @memberOf MainWindow
// */
//MainWindow.prototype.sendMessage = function(selector, arguments) {
//    objc_msgSend(this.nid, "mainwindow_current", {
//        "selector": selector,
//        "arguments": arguments
//    });
//};

/**
 * Access the storage object of the MainWindow (see Storage class).
 *
 * @return {Storage} the storage.
 * @memberOf MainWindow
 */
MainWindow.prototype.storage = function() {
    return private_construct_or_null(Storage, objc_msgSendSync(this.nid, "jsstorage"));
};

/**
 * @api private
 */
var Tab = function(nid) {
  this.nid = nid;
};

global.Tab = Tab;

/**
 * Class method that returns the current, active tab.
 *
 * @return {Tab} the active tab.
 * @memberOf Tab
 */
Tab.current = function() {
    var win = MainWindow.current();
    if (win == null) return null;
    
    return win.currentTab();
};

/**
 * The window which the tab is part of
 *
 * @return {MainWindow} the parent MainWindow.
 * @memberOf Tab
 */
Tab.prototype.window = function() {
    return private_construct_or_null(MainWindow, objc_msgSendSync(this.nid, "windowController"));
};

/**
* Get a list of all visible editors in the tab.
*
* @return {Array} an array of visible `Editor`s.
* @memberOf Tab
*/
Tab.prototype.editors = function() {
    return private_clean_and_construct(Editor, objc_msgSendSync(this.nid, "visibleSplitControllers"));
};

/**
* Get the active editor in this tab.
*
* @return {Editor} the current editor.
* @memberOf Tab
*/
Tab.prototype.currentEditor = function() {
    return private_construct_or_null(Editor, objc_msgSendSync(this.nid, "lastActiveSplit"));
};

/**
* Get a list of all the documents in the "Active" part of the sidebar.
*
* @return {Array} an array containing the active `Document`s
* @memberOf Tab
*/
Tab.prototype.activeDocuments = function() {
    return private_clean_and_construct(Document, objc_msgSendSync(this.nid, "activeDocumentsArray"));
};

/**
* A list of all the `Document`s currently visible in this tab.
*
* @return {Array} an array containing the visible `Document`s
* @memberOf Tab
*/
Tab.prototype.visibleDocuments = function() {
    return private_clean_and_construct(Document, objc_msgSendSync(this.nid, "visibleDocumentsArray"));
};

/**
 * The tab's root directory path. This is the directory selectable at the bottom of the source list.
 *
 * @return {String} a path string corresponding to the tab's root directory.
 * @memberOf Tab
 */
Tab.prototype.path = function() {
    return objc_msgSendSync(this.nid, "tabProjectPath");
};

/**
 * Access the storage object of the Tab (see Storage class).
 *
 * @return {Storage} the storage.
 * @memberOf Tab
 */
Tab.prototype.storage = function() {
    return private_construct_or_null(Storage, objc_msgSendSync(this.nid, "jsstorage"));
};

/**
 * @api private
 */
var Document = function(nid) {
  this.nid = nid;
};

global.Document = Document;

/**
 * Class method that returns the current Document.
 *
 * @return {Document} the active document.
 * @memberOf Document
 */
Document.current = function() {
    
    var editor = Editor.current();
    if (editor == null) return null;
    
    return editor.document();
//    return private_construct_or_null(Document, objc_msgSendSync(private_get_mixin(), "document_current"));
};

/**
 * Open an existing document or create a new untitled one.
 *
 * @param {String} path the path on disk to open. Pass null to create a new untitled document.
 * @param {Object} parent what to attach the new document to. Currently unused, the only accepted parent is "MainWindow"
 * @param {Function(Document)} callback a function that will be called one the document is initialized, with an instance of Document.
 * @memberOf Document
 */
Document.open = function(path, parent, callback) {
    if (path == null)
        path = null;
    if (parent == null)
        parent = null;
    
    if (callback == null) {
        callback = null;
    }
    else {
        var innerCallback = callback;
        callback = function(nid) {
            innerCallback(new Document(nid));
        };
    }

    objc_msgSend("controller", "documentOpenPath:parent:callback:mixin:", path, parent ? parent.nid : null, callback, private_get_mixin());
};

/**
 * Get the display name of a document.
 *
 * @return {String} the display name of a document.
 * @memberOf Document
 */
Document.prototype.displayName = function() {
    return objc_msgSendSync(this.nid, "displayName");
};

/**
 * Get the file name of a document.
 *
 * @return {String} the filename of a document.
 * @memberOf Document
 */
Document.prototype.filename = function() {
    return objc_msgSendSync(this.nid, "js_filename");
};

/**
 * Get the path of a document.
 *
 * @return {String} the path of the file on disk, null if it's unsaved.
 * @memberOf Document
 */
Document.prototype.path = function() {
    return objc_msgSendSync(this.nid, "js_path");
};

/**
 * Get the root scope of a document, e.g. source.objc or text.html
 *
 * @return {String} the root scope of the document.
 * @memberOf Document
 */
Document.prototype.rootScope = function() {
    return objc_msgSendSync(this.nid, "js_rootScope");
};

/**
 * Get the context (list of scopes) at a particular character index.
 *
 * @param {Number} idx a character index in the string.
 * @return {Array} a list of scopes for the given index.
 * @memberOf Document
 */
Document.prototype.contextAtLocation = function(idx) {
    return objc_msgSendSync(this.nid, "js_contextAtLocation:", idx);
};

/**
 * Get an array of Editor objects for a document.
 *
 * @return {Array} an array of Editor objects.
 * @memberOf Document
 */
Document.prototype.editors = function() {
    return private_clean_and_construct(Editor, objc_msgSendSync(this.nid, "splitControllers"));
};

/**
 * Get the length of the document.
 *
 * @return {Number} the length of the document.
 * @memberOf Document
 * @isproperty
 */
Document.prototype.length = function() {
    return objc_msgSendSync(this.nid, "js_length");
};
Document.prototype.__defineGetter__("length", Document.prototype.length);

/**
 * Get or set the text of the document.
 *
 * @return {String} the content of the document.
 * @memberOf Document
 * @isproperty
 */
Document.prototype.text = function() {
    return objc_msgSendSync(this.nid, "js_text");
};

Document.prototype.setText = function(newText) {
    objc_msgSend(this.nid, "js_setText:", newText);
};
Document.prototype.__defineGetter__("text", Document.prototype.text);
Document.prototype.__defineSetter__("text", Document.prototype.setText);

/**
 * Get the text in a given range
 *
 * @param {Range} rng a range.
 * @return {String} the text at given range.
 * @memberOf Document
 */
Document.prototype.textInRange = function(rng) {
    return objc_msgSendSync(this.nid, "js_textInRange:", rng);
};

/**
 * Replace the text in `rng` with `replacement`.
 *
 * @param {Range} rng a range.
 * @param {String} replacement the replacement string.
 * @memberOf Document
 */
Document.prototype.replaceTextInRange = function(rng, replacement) {
    objc_msgSend(this.nid, "js_replaceTextInRange:with:", rng, replacement);
};

/**
 * Get the document's abstract tab size. If the tab size is set to four, then each hard tab character will show up as the width of four spaces. If using soft tabs, four spaces will act in some way like one tab.
 *
 * @return {Number} the tab size.
 * @memberOf Document
 * @isproperty
 */
Document.prototype.tabSize = function() {
    return objc_msgSendSync(this.nid, "js_tabSize");
};

//Document.prototype.setTabSize = function(newTabSize) {
//    objc_msgSend(this.nid, "js_setTabSize:", newTabSize);
//};
Document.prototype.__defineGetter__("tabSize", Document.prototype.tabSize);
//Document.prototype.__defineSetter__("tabSize", Document.prototype.setTabSize);


/**
 * Get whether the document uses spaces for indentation.
 *
 * @return {Boolean} whether the document uses soft tabs.
 * @memberOf Document
 * @isproperty
 */
Document.prototype.usesSoftTabs = function() {
    return objc_msgSendSync(this.nid, "js_usesSoftTabs");
};

//Document.prototype.setUsesSoftTabs = function(newUsesSoftTabs) {
//    objc_msgSend(this.nid, "js_setUsesSoftTabs:", newUsesSoftTabs);
//};
Document.prototype.__defineGetter__("usesSoftTabs", Document.prototype.usesSoftTabs);
//Document.prototype.__defineSetter__("usesSoftTabs", Document.prototype.setUsesSoftTabs);

/**
 * Get a string representing the *ideal* indentation. Remember: text files do not always use a consistent indentation format! (then again, text files aren't limited to the BMP either yet you're using JavaScript).
 *
 * @return {String} A tab character if hard tabs are enabled. A sequence of spaces if soft tabs are enabled..
 * @memberOf Document
 * @isproperty
 */
Document.prototype.tabString = function() {
    return objc_msgSendSync(this.nid, "js_tabString");
};

//Document.prototype.setTabString = function(newTabString) {
//    objc_msgSend(this.nid, "js_setTabString:", newTabString);
//};
Document.prototype.__defineGetter__("tabString", Document.prototype.tabString);
//Document.prototype.__defineSetter__("tabString", Document.prototype.setTabString);



/**
 * Access the storage object of the Document (see Storage class).
 *
 * @return {Storage} the storage.
 * @memberOf Document
 */
Document.prototype.storage = function() {
    return new Storage(objc_msgSendSync(this.nid, "jsstorage"));
};

/**
 * Save the document. If unsaved, presents a save sheet.
 *
 * @memberOf Document
 */
Document.prototype.performSave = function() {
    objc_msgSend(this.nid, "saveDocument:");
}

/**
 * Determine whether the document is untitled. Untitled documents don't exist on disk.
 * 
 * @return {Boolean} whether the document is untitled.
 * @memberOf Document
 */
Document.prototype.isUntitled = function() {
    return objc_msgSendSync(this.nid, "js_isUntitled");
}

/**
 * Determine whether the document has unsaved changes.
 * 
 * @return {Boolean} whether the document is edited.
 * @memberOf Document
 */
Document.prototype.isEdited = function() {
    return objc_msgSendSync(this.nid, "js_isUnsaved");
}



/**
 * @api private
 */
var Editor = function(nid) {
  this.nid = nid;
};

global.Editor = Editor;

/**
 * Class method that returns the current Editor.
 *
 * @return {Editor} the active editor.
 * @memberOf Editor
 */
Editor.current = function() {
    var win = MainWindow.current();
    if (win == null) return null;
    
    var tab = win.currentTab();
    if (tab == null) return null;
    
    var editor = tab.currentEditor();
    return editor;
//    return new Editor(objc_msgSendSync(private_get_mixin(), "editor_current"));
};

/**
 * The document edited by this editor.
 *
 * @return {Document} the document being edited.
 * @memberOf Editor
 */
Editor.prototype.document = function() {
    return private_construct_or_null(Document, objc_msgSendSync(this.nid, "viewDocument"));
};

/**
 * The containing tab.
 *
 * @return {Tab} The containing tab.
 * @memberOf Editor
 */
Editor.prototype.tab = function() {
    return private_construct_or_null(Tab, objc_msgSendSync(this.nid, "tabController"));
};

/**
 * The containing window.
 *
 * @return {MainWindow} The containing window.
 * @memberOf Editor
 */
Editor.prototype.window = function() {
    return private_construct_or_null(MainWindow, objc_msgSendSync(this.nid, "windowController"));
};

/**
 * Get or set the selected text in this editor.
 * 
 * @return {Range} the range of the selected text.
 * @memberOf Editor
 * @isproperty
 */
Editor.prototype.selection = function() {
    return objc_msgSendSync(this.nid, "js_selection");
};

Editor.prototype.setSelection = function(rng) {
    objc_msgSend(this.nid, "js_setSelection:", rng);
};

Editor.prototype.__defineGetter__("selection", Editor.prototype.selection);
Editor.prototype.__defineSetter__("selection", Editor.prototype.setSelection);


/**
 * Get the range of text that is visible in this editor.
 *
 * @return {Range} the range of visible text.
 * @memberOf Editor
 */
Editor.prototype.visibleRange = function() {
  return objc_msgSendSync(this.nid, "js_visibleRange");
};

/**
 * Get the context (list of scopes) at the editor's selection.
 *
 * @return {Array} a list of scopes for the selection.
 * @memberOf Editor
 */
Editor.prototype.selectionContext = function() {
    var loc = this.selection.location;
    return this.document().contextAtLocation(loc);
//  return objc_msgSendSync(this.nid, "editor_selectionContext");
};

/**
 * Insert a snippet where the cursor is located.
 *
 * @param {String} snippet a snippet.
 * @memberOf Editor
 */
Editor.prototype.insertSnippet = function(snippet, rng) {
    
    if (typeof rng === 'undefined' || rng === null) {
        rng = this.selection;
    }
    objc_msgSend(this.nid, "js_insertSnippet:insertRange:", snippet, rng);
};

/**
 * Access the storage object of the Editor (see Storage class).
 *
 * @return {Storage} the storage.
 * @memberOf Editor
 */
Editor.prototype.storage = function() {
    return private_construct_or_null(Storage, objc_msgSendSync(this.nid, "jsstorage"));
};




