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
    
    throw_ifnot_array(newTitle, "newButtons of setButtons");
    
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
Window.prototype.onLoad = function() {
    return objc_msgSendSync(this.nid, "clientOnLoad");
};
Window.prototype.setOnLoad = function(callback) {

    throw_ifnot_function(callback, "callback of setOnLoad");
    
    objc_msgSend(this.nid, "setClientOnLoad:", callback.toString());
};
Window.prototype.__defineGetter__("clientOnLoad", Window.prototype.onLoad);
Window.prototype.__defineSetter__("clientOnLoad", Window.prototype.setOnLoad);

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
 * @param {Editor} parent the editor containing the text.
 * @param {Range} range the range of text over which the popover should appear.
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

