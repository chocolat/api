// Implement the UI class
var Hooks = {};
global.Hooks = Hooks;

/**
 * Add a menu item at the given path.
 * 
 * @param {String} path the path of the new menu item.
 * @param {String} shortcut keyboard shortcut, e.g. "<code>ctrl-alt-cmd-b</code>".
 * @param {Function} callback a callback to be executed when the menu item is selected.
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