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
    if (callback == null)
        callback = null;
    
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
    objc_msgSend(this.nid, "js_isUntitled");
}

/**
 * Determine whether the document has unsaved changes.
 * 
 * @return {Boolean} whether the document is edited.
 * @memberOf Document
 */
Document.prototype.isEdited = function() {
    objc_msgSend(this.nid, "js_isUnsaved");
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

